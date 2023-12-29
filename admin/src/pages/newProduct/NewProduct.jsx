import "./newProduct.css";
import { useState, useEffect } from "react";
import axios, { all } from "axios";
import { API_URL } from "../../Request";
import storage from "../../../../frontend/src/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
export default function NewProduct() {
  //URL of videoFile
  const [movie, setMovie] = useState();
  const [selectRemoveGenres, setSelectRemoveGenres] = useState();
  const [selectAddGenres, setSelectAddGenres] = useState();
  const [genres, setGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  //state to manage file
  const [video, setVideo] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [title, setTitle] = useState();
  const [overview, setOverview] = useState();
  const [release_date, setRelease_date] = useState();
  let ignore = false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allGenresResponse = await axios.get(`${API_URL}genres/`, {
          headers: {
            token:
              "bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setAllGenres(allGenresResponse.data);
        setSelectAddGenres(allGenresResponse.data[0].id);
      } catch (error) {
        console.error(error);
      }
    };
    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);
  const handleAddGenre = () => {
    const findgenre = allGenres.find(
      (genre) => genre.id === Number(selectAddGenres)
    );
    setGenres([...genres, findgenre]);
    //Remove genre from allGenre
    setAllGenres((prevAllGenres) => {
      const updatedGenres = prevAllGenres.filter(
        (genre) => genre.id !== Number(selectAddGenres)
      );
      setSelectAddGenres(updatedGenres.length > 0 ? updatedGenres[0].id : null);
      return updatedGenres;
    });
  };
  //function to validate state data
  function validateData() {
    if (!title.trim() || !overview.trim() || !release_date.trim()) {
      // Validation failed
      alert("Please fill in all fields");
      return false;
    }

    // Validation passed
    return true;
  }
  function handleCreate(e) {
    e.preventDefault();
    //check if data is valid
    if (validateData()) {
      const newMovie = {
        title,
        overview,
        release_date,
        genres,
        video: movie,
      };
      axios
        .post(`${API_URL}movies/`, newMovie, {
          headers: {
            token:
              "bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleRemoveGenre = () => {
    //Remove genre from current genres
    setGenres(
      genres.filter((genre) => genre.id !== Number(selectRemoveGenres))
    );
    //  setAllGenres([...allGenres, genres.find(genre=>genre.id === Number(selectRemoveGenres))])
    setGenres((prevAllGenres) => {
      const updatedGenres = prevAllGenres.filter(
        (genre) => genre.id !== Number(selectRemoveGenres)
      );
      setSelectRemoveGenres(
        updatedGenres.length > 0 ? updatedGenres[0].id : null
      );
      return updatedGenres;
    });
  };
  function handleUpload(e) {
    e.preventDefault();
    const storageRef = ref(storage, `movies/${video.name}`);
    uploadBytes(storageRef, video).then((snapshot) => {
      setUploaded(true);
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setMovie(url);  
      })
      console.log(snapshot.metadata.fullPath);
    });
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>OverView</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          ></textarea>
        </div>
        <div className="addProductItem">
          <label>Released_Date</label>
          <input
            type="text"
            placeholder="1/1/2022"
            value={release_date}
            onChange={(e) => setRelease_date(e.target.value)}
          />
        </div>
        <label>Genre</label>
        <select
          name=""
          id=""
          value={selectRemoveGenres}
          onChange={(e) => setSelectRemoveGenres(e.target.value)}
          className="addProductItem"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleRemoveGenre}>
          Remove
        </button>
        <br />
        <label>Add New Genre</label>
        <select
          name=""
          id=""
          value={selectAddGenres}
          onChange={(e) => setSelectAddGenres(e.target.value)}
          className="addProductItem"
        >
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddGenre}>
          Add Genre
        </button>
        <br />
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
        {!uploaded ? (
          <button
            className="addProductButton"
            value={video}
            onClick={handleUpload}
          >
            Upload
          </button>
        ) : (
          <button className="addProductButton" onClick={handleCreate}>Create</button>
        )}
      </form>
    </div>
  );
}
