import { Navigate,useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function EditUserForm() {

  const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ username: "", email: "", age: "", course: "" });

    useEffect(() => {
          const response = axios.get(`http://localhost:3000/users/${id}`).then((response)=>{  
            setFormData(response.data.data)
        });
  },[]);

   const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updateUser/${id}`, formData)
      .then(() =>{
        alert("User updated successfully");
        navigate("/crud");
      } 
    )
      .catch(err => console.error(err));
  };


    return(
        <>
        <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <div className="flex gap-x-10">
        <label htmlFor="" className='text-sm/6 font-medium text-gray-900 mt-5'>Name</label>
        <input name="username" className="border-b-2" value={formData.username || ""} onChange={handleChange} />
      </div>
      
      <div className="flex gap-x-10">
            <label htmlFor="" className='text-sm/6 font-medium text-gray-900 mt-5'>Email</label>
          <input
  name="email" className="border-b-2"
  value={formData.email || ""}
  onChange={handleChange}
/>
      </div>

<div className="flex gap-x-10">
  <label htmlFor="" className='text-sm/6 font-medium text-gray-900 mt-5'>Age</label>
      <input
  name="age" className="border-b-2"
  value={formData.age || ""}
  onChange={handleChange}
/>
</div>

<div className="flex gap-x-10">
  <label htmlFor="" className='text-sm/6 font-medium text-gray-900 mt-5'>Course</label>
  <input
  name="course" className="border-b-2"
  value={formData.course || ""}
  onChange={handleChange}
/>
</div>

<input type="submit" className="bg-indigo-200 p-2" value="Update"/>

    </form>
        
        </>
    )
}

export default EditUserForm;