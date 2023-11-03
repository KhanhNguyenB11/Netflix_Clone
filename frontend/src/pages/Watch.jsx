import React from "react";
import { useParams,useNavigate } from "react-router-dom";
function Watch({ embedId }) {
  let { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  function handleGoBack(){
    navigate(-1);
  }
  return (
    <>
    <div className="h-0 overflow-hidden pb-[49.5%] relative">
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
    </>
  );
}

export default Watch;
