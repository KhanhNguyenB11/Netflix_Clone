import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext/AuthContext";
import { API_URL } from "../Request";
import Modal from "react-modal";
import Loading from "../components/Loading.jsx";
import { Link } from "react-router-dom";
import CreateList from "../components/CreateList.jsx";
import Row from "../components/Row.jsx";
Modal.setAppElement("#root");
function MovieList() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    const config = {
      headers: {
        token: "bearer " + user.accessToken,
      },
    };
    axios
      .get(API_URL + `users/${user._id}/lists`, config)
      .then((res) => {
        setList(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className=" bg-black h-screen">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div className="bg-white rounded p-8">
            <h2 className="text-2xl font-bold mb-4">Create New List</h2>
            <div>
              <CreateList />
            </div>
            <button
              className="absolute top-0 py-2 right-3 font-bold text-red-600"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </Modal>
        <div className="flex justify-between items-center p-3">
          <Link to="/" className="link">
            <img
              src="../N_logo.svg"
              alt="Netflix_logo"
              className=" w-[200px] h-[100px] z-[100] hover:cursor-pointer"
            />
          </Link>
          <button
            className="bg-red-600 rounded font-bold p-3 hover:bg-red-700 text-white"
            onClick={openModal}
          >
            Create New List
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : (
          <div className="">
              {list.map((item) => <Row title={item.name} key={item._id} list={item}  fetchURL={`${API_URL}users/${user._id}/lists`} rowID={item._id}/>)}
              <Row title="History" key="History" fetchURL={`${API_URL}users/${user._id}/history`}></Row>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieList;
