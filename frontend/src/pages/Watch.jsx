
import {useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";
function Watch() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieURL = location.state;
  function handleGoBack(){
    navigate(-1);
  }
  let videoSource;
  if(!movieURL || movieURL === "false"){
    videoSource = "https://firebasestorage.googleapis.com/v0/b/netflixclone-1c807.appspot.com/o/movies%2FShalom%20Margaret%20-%20Viva%20La%20Vida%20(Lofi%20Remix).mp4?alt=media&token=d109b577-b3fc-4cb9-bf63-c6b2ec48423f"
  }
  else{
    videoSource = movieURL;
  }
  //  const videoSource = movieURL ? movieURL : "https://firebasestorage.googleapis.com/v0/b/netflixclone-1c807.appspot.com/o/movies%2FShalom%20Margaret%20-%20Viva%20La%20Vida%20(Lofi%20Remix).mp4?alt=media&token=d109b577-b3fc-4cb9-bf63-c6b2ec48423f";
  console.log(location);
  return (
    <>
    <div className="flex justify-center align-top">
      <VideoPlayer className="h-full w-full" videoURL={videoSource} />
    </div>
    </>
  );
}

export default Watch;
