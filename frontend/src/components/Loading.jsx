import ReactLoading from "react-loading";
function Loading({small}) {
  return <ReactLoading type="spin" color="#fff" height={small ? 40 : 400} width={small ? 40 : 200 } />;
}

export default Loading;
