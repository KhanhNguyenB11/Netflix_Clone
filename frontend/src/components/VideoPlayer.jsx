import { useRef, useEffect } from 'react';
import Plyr from 'plyr';

const VideoPlayer = ({ videoURL }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize Plyr when the component mounts
    const player = new Plyr(videoRef.current, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });

    // Destroy Plyr when the component unmounts to avoid memory leaks
    return () => {
      if (player) {
        player.destroy();
      }
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
