import { useRef, useEffect, useContext } from "react";
import videojs from "video.js";
import { useLocation } from "react-router-dom";
import { API_URL } from "../Request";
import axios from "axios";
import { AuthContext } from "../context/authcontext/AuthContext";
function Watch() {
  const { user } = useContext(AuthContext);
  const videoPlayerRef = useRef(null); // Instead of ID
  const location = useLocation();
  const movie = location.state;
  const movieURL = movie.video;
  // const videoSrc = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  let videoSource;
  if (!movieURL || movieURL === "false") {
    videoSource =
      "https://firebasestorage.googleapis.com/v0/b/netflixclone-1c807.appspot.com/o/movies%2FShalom%20Margaret%20-%20Viva%20La%20Vida%20(Lofi%20Remix).mp4?alt=media&token=d109b577-b3fc-4cb9-bf63-c6b2ec48423f";
  } else {
    videoSource = movieURL;
  }
  const videoJSOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2],
  };
  let ignore = false;
  useEffect(() => {
    function addMovieToHistory() {
      const movieInHistory = {
        movie: movie._id,
        playbackProgress: 0,
      };
      if(!user){
        window.location.href = "/login";
      }
      axios
        .patch(
          `${API_URL}users/${user._id}/history/updateHistory`,
          movieInHistory
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (ignore) {
      addMovieToHistory();
    }
    return () => {
      ignore = true;
    };
  }, []);
  useEffect(() => {
    async function getPlaybackProgress() {
      try {
        const response = await axios.get(`${API_URL}users/${user._id}/history/${movie._id}`);
        console.log(response.data.playbackProgress);
        return response.data.playbackProgress;
      } catch (error) {
        console.error(error);
        return 0; // Default to 0 if there is an error fetching the playback progress
      }
    }
  
    const initializePlayer = async () => {
      const progress = await getPlaybackProgress();
      console.log("Playback progress:", progress);
  
      let intervalId;
  
      if (videoPlayerRef) {
        const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
          player.src(videoSource);
          player.on("ended", () => {
            console.log("ended");
          });
          player.on("timeupdate", () => {
            // You can add logic here if needed
          });
          player.currentTime(progress);
        });
  
        player.on("playing", () => {
          // Start updating current time when the video starts playing.
          intervalId = setInterval(() => {
            updateCurrentTime(player.currentTime());
          }, 10000);
        });
  
        player.on("pause", () => {
          console.log("pause");
          // Stop updating current time when the video is paused.
          clearInterval(intervalId);
        });
  
        player.on("dispose", () => {
          player.dispose();
          clearInterval(intervalId);
        });
      }
    };
  
    initializePlayer();
  
    // Clean up resources if needed
    return () => {};
  }, []);
  

  function updateCurrentTime(progress) {
    const movieInHistory = {
      playbackProgress: progress,
    };
    axios
      .patch(
        `${API_URL}users/${user._id}/history/${movie._id}`,
        movieInHistory
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div style={{ width: "100%" }}>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js"
      />
      {/* <GlobalStyle /> */}
    </div>
  );
}
export default Watch;
