import { useRef, useEffect } from "react";
import Plyr from "plyr";

const VideoPlayer = ({ videoURL }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new Plyr(videoRef.current);

    const handleSeeked = () => {
      console.log(player.currentTime);
    };

    player.on("seeked", handleSeeked);

    // You can adjust the interval based on your needs
    const interval = setInterval(() => {
      player.currentTime; // This should now give you the current time
    }, 1000);

    return () => {
      if (player) {
        player.destroy();
      }
      player.off("seeked", handleSeeked);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls>
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
