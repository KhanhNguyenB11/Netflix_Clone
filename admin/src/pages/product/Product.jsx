import { Link } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../frontend/src/Request";
import axios from "axios";
import storage from "../../../../frontend/src/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function Product() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  let movie = location.state;
  const [genres, setGenres] = useState([]);
  const [videoFile, setVideoFile] = useState("");
  const [allGenres, setAllGenres] = useState([]);
  const [selectRemoveGenres, setSelectRemoveGenres] = useState();
  const [selectAddGenres, setSelectAddGenres] = useState();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  let ignore = false;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResponse = await axios.post(
          `${API_URL}genres/find`,
          movie.genre_ids,
          {
            headers: {
              token:
                "bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setGenres(genreResponse.data);
        console.log(genreResponse.data);
        const allGenresResponse = await axios.get(`${API_URL}genres/`, {
          headers: {
            token:
              "bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const filteredGenres = filterUniqueObjects([
          ...allGenresResponse.data,
          ...genreResponse.data,
        ]);
        setAllGenres(filteredGenres);
        setSelectAddGenres(filteredGenres[0].id);
        setSelectRemoveGenres(genreResponse.data[0].id);
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
  async function onSubmit(d) {
    try {
      let updatedMovie = {
        ...movie,
        ...d,
        genre_ids: movie.genre_ids,
      };

      console.log(updatedMovie);

      if (videoFile.name != movie.video) {
        await handleUpload();
        //update video URL after upload
        updatedMovie.video = movie.video;
        console.log(videoFile);
        setUploading(false);
      }

      // Move the axios request inside the try block to make sure it runs after handleUpload
      const res = await axios.put(
        `${API_URL}movies/${movie._id}`,
        updatedMovie,
        {
          headers: {
            token:
              "bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );

      console.log(res.data);

      // navigate("/admin/movie");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpload() {
    const storageRef = ref(storage, `movies/${videoFile.name}`);
    console.log("file name" + videoFile.name);
    try {
      const snapshot = await uploadBytes(storageRef, videoFile);
      setUploading(true);
      const url = await getDownloadURL(snapshot.ref);
      console.log("URL Video: " + url);
      movie.video = url;
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle the error accordingly
    }
  }

  //  async function onSubmit(d){
  //     let updatedMovie = {
  //       ...movie,
  //       ...d,
  //       genre_ids: movie.genre_ids,
  //     }
  //     console.log(updatedMovie);
  //     if(videoFile){
  //       await handleUpload();
  //       updatedMovie.video = videoFile;
  //     }
  //     axios
  //         .put(`${API_URL}movies/${movie._id}`, updatedMovie, {
  //           headers: {
  //             token:
  //               "bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //         navigate("/admin/movie");
  //   }

  // Helper function to filter unique objects based on a property
  const filterUniqueObjects = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].id === arr[j].id) {
          arr.splice(j, 1);
          j--;
          arr.splice(i, 1);
          i--;
        }
      }
    }
    return arr;
  };

  const handleAddGenre = () => {
    movie.genre_ids.push(Number(selectAddGenres));
    const addedGenre = allGenres.find(
      (genre) => genre.id === Number(selectAddGenres)
    );
    console.log(movie.genre_ids);
    setGenres([...genres, addedGenre]);
    //Remove genre from allGenre
    setAllGenres((prevGenres) => {
      const updatedGenres = prevGenres.filter(
        (genre) => genre.id !== Number(selectAddGenres)
      );
      setSelectAddGenres(updatedGenres.length > 0 ? updatedGenres[0].id : null);
      return updatedGenres;
    });
  };

  const handleRemoveGenre = () => {
    movie.genre_ids = movie.genre_ids.filter(
      (genre) => genre !== Number(selectRemoveGenres)
    );
    //Remove genre from current genres
    setGenres((prevAllGenres) => {
      const updatedGenres = prevAllGenres.filter(
        (genre) => genre.id !== Number(selectRemoveGenres)
      );
      setSelectRemoveGenres(
        updatedGenres.length > 0 ? updatedGenres[0].id : null
      );
      return updatedGenres;
    });
    console.log(movie.genre_ids);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
              alt="Movie_Img"
              className="productInfoImg"
            />
            <span className="productName">{movie?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Popularity:</span>
              <span className="productInfoValue">{movie.popularity}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Date:</span>
              <span className="productInfoValue">{movie.release_date}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">
                {genres.map((genre) => `${genre.name}, `)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              {...register("title", { required: "Title is required" })}
              defaultValue={movie.title}
            />
            <label>Genre</label>
            <select
              name=""
              id=""
              value={selectRemoveGenres}
              onChange={(e) => setSelectRemoveGenres(e.target.value)}
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
            <label>Add New Genre</label>
            <select
              name=""
              id=""
              value={selectAddGenres}
              onChange={(e) => setSelectAddGenres(e.target.value)}
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
            <label>Release Date</label>
            <input
              type="text"
              placeholder={movie.release_date}
              {...register("release_date", {
                required: "release_date is required",
              })}
              defaultValue={movie.release_date}
            />
            <label>Movie Overview</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder={movie.overview}
              defaultValue={movie.overview}
              {...register("overview", { required: "overview is required" })}
            ></textarea>
            <label>Video</label>
            <input
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {uploading ? (
              <button className="productButton" disabled>
                Uploading
              </button>
            ) : (
              <button className="productButton">Update</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
