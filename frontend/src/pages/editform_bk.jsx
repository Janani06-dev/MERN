import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditUserForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ username: "", email: "", age: "", course: "" });


  useEffect(() => {
    console.log("eddddee");
    const getUser = async () => {
    const response = await axios.get(
    `http://localhost:3000/user/${id}`
    );
    setFormData(response.data.data);
};
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/${id}`, formData)
      .then(() => alert("User updated successfully"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input
  name="username"
  value={formData.username || ""}
  onChange={handleChange}
/>

<input
  name="email"
  value={formData.email || ""}
  onChange={handleChange}
/>

<input
  name="age"
  value={formData.age || ""}
  onChange={handleChange}
/>

<input
  name="course"
  value={formData.course || ""}
  onChange={handleChange}
/>
    </form>
  );
}

export default EditUserForm;
