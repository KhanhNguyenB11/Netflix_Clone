import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext/AuthContext";
function ListCard({ list }) {
  const { user } = useContext(AuthContext);
  function formatLastUpdatedTime(date) {
    const givenTime = new Date(date);
    const currentTime = new Date();
    const timeDifference = currentTime - givenTime;
    //Year > 1
    if (Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)) > 0)
      return [
        Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)),
        "years",
      ];
    //Month > 1
    else if (Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)) > 0)
      return [
        Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30)),
        "months",
      ];
    // day > 1
    else if (Math.floor(timeDifference / (1000 * 60 * 60 * 24)) > 0)
      return [Math.floor(timeDifference / (1000 * 60 * 60 * 24)), "days"];
    // Hour > 1
    else if (Math.floor(timeDifference / (1000 * 60 * 60)) > 0)
      return [Math.floor(timeDifference / (1000 * 60 * 60)), "hours"];
    // Minute > 1
    else if (Math.floor(timeDifference / (1000 * 60)) > 0)
      return [Math.floor(timeDifference / (1000 * 60)), "minutes"];
    return [timeDifference, "seconds"];
  }
  const [time, unit] = formatLastUpdatedTime(list.updatedAt);
  return (
    <div
      className={`border rounded bg-slate-500 flex justify-center items-center h-[400px] flex-col bg-gradient-to-r from-cyan-500 to-blue-500`}
    >
      <Link to={`/${user.username}/list/${list.name}`} state={list}>
        <h2 className=" font-bold text-3xl">{list.name}</h2>{" "}
      </Link>
      <p>{list.movies.length} items</p>
      <p>{list.description}</p>
      <p>Last update: {`${time} ${unit} ago`}</p>
    </div>
  );
}

export default ListCard;
