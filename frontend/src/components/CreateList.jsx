import { useContext, useState } from 'react';
import { API_URL } from '../Request';
import { AuthContext } from '../context/authcontext/AuthContext';
import axios from 'axios';
function CreateList() {
    const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    movies: [],
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, such as submitting it to a server
    axios.post(`${API_URL}users/${user._id}/lists`,formData,{
        headers: { token: "bearer " + user.accessToken },
    })
    .then(()=>{
        window.location.reload();
    })
    .catch((error)=>{
        console.log(error);
    })
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter list name"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description"
          className="w-full p-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="bg-red-600 rounded font-bold p-3 hover:bg-red-700 text-white"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateList;
