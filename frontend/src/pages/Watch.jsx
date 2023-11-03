import React from "react";
import { useParams } from "react-router-dom";
function Watch({ embedId }) {
  let { id } = useParams();
  console.log(id);
  return (
    <div className="h-0 overflow-hidden pb-[56%] relative">
      <iframe
        className="h-full w-full left-0 top-0 absolute"
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
     

    </div>
  );
}

export default Watch;
