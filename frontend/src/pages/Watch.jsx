
import  { useRef, useEffect } from "react";
import videojs from "video.js";
import { useLocation } from "react-router-dom";
function Watch(){
  const videoPlayerRef = useRef(null); // Instead of ID
  const location = useLocation();
  const movieURL = location.state;
  // const videoSrc = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  let videoSource;
  if(!movieURL || movieURL === "false"){
    videoSource = "https://firebasestorage.googleapis.com/v0/b/netflixclone-1c807.appspot.com/o/movies%2FShalom%20Margaret%20-%20Viva%20La%20Vida%20(Lofi%20Remix).mp4?alt=media&token=d109b577-b3fc-4cb9-bf63-c6b2ec48423f"
  }
  else{
    videoSource = movieURL;
  }
  const videoJSOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,  
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2]
  };

  useEffect(() => {
    let intervalId;
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(videoSource);
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          console.log(player.currentTime());
        });
        console.log("Player Ready");

      });
      intervalId = setInterval(() => {
        updateCurrentTime();
      },10000)
      player.on("dispose", () => {
        player.dispose();
        clearInterval(intervalId);
      })
    }
    return () => {
      

    };
  }, []);


  function updateCurrentTime() {
    console.log("Calling API ...");
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
