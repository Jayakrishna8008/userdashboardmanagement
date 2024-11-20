import './index.css'
const ListData = ({ users, handleDelete, handleEdit }) => {
    console.log("User List:", users);

    return (
      <div>
        <h3>User Data List</h3>
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.department || "N/A"}</td>
                  <td style={{ maxWidth: "70px" }}>
                    <button className="table-button" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="table-button" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  export default ListData;