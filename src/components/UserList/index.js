import React,{useState,useEffect} from 'react'
import "./index.css"
import ListData from '../ListData';

const UserList=()=>{
    const[users,setUsers]=useState([]);
    const [formData, setFormData] = useState({ id: "", name: "", email: "", department: "" }); 
    const [error, setError] = useState("");
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    const fetchData=async()=>{
        try{
            const data=await fetch(apiUrl)
            if(data){
                 const response= await data.json();
                 setUsers(response)

            }else{
                console.log("Fetching error")
            }
        }catch{
            console.log("Server Error")
        }
    }
    useEffect(() => {
        fetchData()
      }, []);

    console.log("users",users)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const method = formData.id ? "PUT" : "POST";
        const url = formData.id ? `${apiUrl}/${formData.id}` : apiUrl;

        fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (method === "POST") {
              setUsers([...users, { ...formData, id: data.id }]);
            } else {
              setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
            }
            setFormData({id: "", name: "", email: "", department: ""});
          })
          .catch(() => setError("Failed to save user."));
      };


      const handleDelete = (id) => {
        fetch(`${apiUrl}/${id}`, { method: "DELETE" })
          .then(() => setUsers(users.filter((user) => user.id !== id)))
          .catch(() => setError("Failed to delete user."));
      };

      const handleEdit = (user) => {
        setFormData({
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.department || "",  
        });
      };


      return(
        <div>
            <h1>User Management Dashboard</h1>
            <h3>Add New User</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit} >
            <input
                name="name"
                placeholder="Enter User Name"
                value={formData.name}
                onChange={handleChange}
             />

            <input
                name="email"
                placeholder="Enter User Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
             />
            <input
                name="department"
                placeholder="Enter User Department"
                value={formData.department}
                onChange={handleChange}
             />
            <button type="submit">{formData.id ? "Update" : "Add"}</button>
            </form>
            <ListData
                users={users}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                />

       </div>

      )
}

export default UserList
