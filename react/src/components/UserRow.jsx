import { Link } from "react-router-dom";

function UserRow({ user, onDelete }) {
  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.created_at}</td>
        <td>
          <Link to={`/users/${user.id}`}>Edit</Link>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </td>
      </tr>
    </>
  );
}
export default UserRow;
