// components/UserList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { useFetchUsersQuery } from '../features/users/users-api-slice';

// const UserList: React.FC = () => {
//   const users: any[] = [];

//   return (
//     <div>
//       <h1>User List</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <Link to={`/user/${user.id}`}>
//               {user.first_name} {user.last_name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

function UserList() {
    const [numUsers, setNumUsers] = useState(10); // Change the state variable name

    const { data, isFetching } = useFetchUsersQuery({ page: 1, per_page: numUsers }); // Update the hook usage

    return (
    <div className="App">

        <h1> React Assignment</h1>
        <div className="card">
        <div>
            <p>Users to Fetch</p>
            <select value={numUsers} onChange={(e) => setNumUsers(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            </select>
        </div>
        <div>
            <p>Number of users fetched: {data?.data.length}</p>
            <table className="table">
    <thead>
    <tr>
        <th>ID</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Avatar</th>
    </tr>
    </thead>
    <tbody>
    {data?.data.map((user) => (
        <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>
            <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
        </td>
        </tr>
    ))}
    </tbody>
    </table>

        </div>
        </div>
    </div>
    );
}
export default UserList;