import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../Request";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
import { BsPlus } from "react-icons/bs";
import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "relative",
  },
  overlay: {
    background: "rgba(0, 0, 0, .5)",
  },
};
function Movie({ movie, displayType = "default", list }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [showComponent, setShowComponent] = useState(true);
  const [mylist, setMyList] = useState([]);
  const [selectedlist, setSelectedList] = useState("");

  //Modal methods:
  const openModal = () => {
    const config = {
      headers: {
        token: "bearer " + user.accessToken,
      },
    };
    console.log("Open Modal with movie: " + movie.id);
    axios
      .get(`${API_URL}users/${user?._id}/lists`, config)
      .then((res) => {
        setMyList(res.data);
        setSelectedList(res.data[0]);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const defaultType =
    "w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2";

  //API CALLS
  //remove movie from list
  function handleRemove() {
    if(displayType === "History"){
      const movieToRemoved  = {
        "movie": movie._id,
      };
      axios.delete(`${API_URL}users/${user._id}/history/deleteHistory`,movieToRemoved)
      .then((res) => {
        console.log(res);
        setShowComponent(false);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else{
    const newMovieArr = list.movies.filter((item) => item != movie.id);
    axios
      .put(
        `${API_URL}users/${user._id}/lists/${list._id}`,
        {
          ...list,
          movies: newMovieArr,
        },
        {
          headers: { token: "bearer " + user.accessToken },
        }
      )
      .then(() => {
        setShowComponent(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }
  function handleAddToList() {
    selectedlist.movies.push(movie.id);
    axios
      .put(
        `${API_URL}users/${user._id}/lists/${selectedlist._id}`,
        {
          ...selectedlist,
        },
        {
          headers: { token: "bearer " + user.accessToken },
        }
      )
      .then((res) => {
        console.log(res);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    showComponent && (
      <div className={defaultType}>
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          {/* modal add movies to list */}
          {displayType == "default" ? (
            <div>
              <h2 className="text-2xl font-bold p-3">
                Add <span className=" text-red-600">{movie?.title}</span> to
                list
              </h2>
              <div>
                <h2 className="p-2">Your list: </h2>
                <div className="flex justify-evenly gap-4">
                  <select
                    name=""
                    id=""
                    className="p-4 flex-grow-1"
                    onChange={(e) =>
                      setSelectedList(JSON.parse(e.target.value))
                    }
                    value={selectedlist ? JSON.stringify(selectedlist) : ""}
                  >
                    {mylist
                      ? mylist.map((item) => {
                          if (!item.movies.includes(movie.id) && item.name !== "History") {
                            return (
                              <option
                                key={item._id}
                                value={JSON.stringify(item)}
                              >
                                {item.name}
                              </option>
                            );
                          }
                        })
                      : ""}
                  </select>
                  <button
                    className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-red-700"
                    onClick={handleAddToList}
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-0 right-3 py-2 font-bold text-red-600"
              >
                X
              </button>
            </div>
          ) : (
            <div>
              <h2 className="py-2">
                Delete <span className="text-red-600">{movie.title}</span> from
                your list ?
              </h2>
              <div className="flex justify-between">
                <button
                  className="bg-red-600 rounded font-bold p-3 hover:bg-red-700 text-white w-[70px]"
                  onClick={handleRemove}
                >
                  Yes
                </button>
                <button
                  className="bg-blue-600 rounded font-bold p-3 hover:bg-blue-700 text-white w-[70px]"
                  onClick={closeModal}
                >
                  NO
                </button>
              </div>
            </div>
          )}
        </Modal>
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100">
          <Link to={`/watch/${movie.title}`} state={movie}>
            <p className="text-white flex justify-center items-center font-bold h-full text-center">
              {movie?.title}
            </p>
          </Link>
          <p>
            <FaRegHeart className="absolute top-4 left-4 text-gray-300"></FaRegHeart>
          </p>
          <p>
            {displayType !== "default" ? (
              <AiOutlineDelete
                className="absolute top-4 right-4 text-gray-300"
                onClick={openModal}
              ></AiOutlineDelete>
            ) : (
              <BsPlus
                className="absolute top-4 right-4 text-gray-300"
                onClick={openModal}
              ></BsPlus>
            )}
          </p>
        </div>
      </div>
    )
  );
}

export default Movie;
