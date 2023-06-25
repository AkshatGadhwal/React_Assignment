import reactLogo from './assets/react.svg'
import './UserList.css'
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { useFetchUsersQuery } from '../features/users/users-api-slice';
import { Link } from 'react-router-dom';

import {useNavigate} from "react-router-dom";

const f = (k: number) => {
    let content = []
    for(let i = 0; i<k; i++){
        content.push(<option value={i+1}>{i+1}</option>);
    }
    return content;
}


function UserList() {
  const [numUsers, setNumUsers] = useState(5); // Change the state variable name
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    navigate('/'+id);
  }

  const { data, isFetching } = useFetchUsersQuery({ page: pageNumber, per_page: numUsers }); // Update the hook usage
  

  return (
    <div className="App">

      <h1> React Assignment</h1>
      <div className="card">
        <div>
            <div>
                <p>Users Per Page</p>
                <select value={numUsers} onChange={(e) =>
                    {
                     setNumUsers(Number(e.target.value));
                     setNumOfPages(Number(  ((data?.total)?(data?.total):10)/(Number(e.target.value)) ))
                    }
                }>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div>
                <p>Page Number</p>
                <select value={pageNumber} onChange={(e) => setPageNumber(Number(e.target.value))}>
                {f((data?.total_pages)?(data?.total_pages):1)}
                </select>
            </div>
        </div>
        <div>
            <p>Total Pages: {data?.total_pages}</p>
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
      <th>Profle Link</th>
    </tr>
  </thead>
  <tbody>
    {data?.data.map((user) => (
      <tr key={user.id} onClick={() => handleRowClick(user.id)}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>
            <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
            </td>
            <td>
                <Link to={'/'+user.id}>See Details</Link>
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
