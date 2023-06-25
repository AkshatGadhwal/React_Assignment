import './UserList.css'
import { useState } from 'react';
import { useFetchUsersQuery } from '../features/users/users-api-slice';
import {useNavigate} from "react-router-dom";

const f = (k: number) => {
    let content = []
    for(let i = 0; i<k; i++){
        content.push(<option value={i+1}>{i+1}</option>);
    }
    return content;
}

function UserList() {
  const [numUsers, setNumUsers] = useState(5); 
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const navigate = useNavigate();
  const handleRowClick = (id: number, pageNumber: number, numUsers: number) => {
    navigate('/'+id,{
        state:{
            page:pageNumber,
            per_page:numUsers,
            id:id
        }
    });
  }
  
  const { data, error, isLoading, isFetching, isSuccess } = useFetchUsersQuery({ page: pageNumber, per_page: numUsers }); 
  
  return (

    <div className="App">
        {isLoading && <h2>...Loading</h2>}
        {isFetching && <h2>...Fetching</h2>}
        {error && <h2>Something Went Wrong</h2>}
        {isSuccess && 
        <div>

                <h1> React Assignment</h1>
                <div className="card">
                    <div className='parent'>
                        <div className='children'>
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
                        <div className='children'>
                            <p>Page Number</p>
                            <select value={pageNumber} onChange={(e) => setPageNumber(Number(e.target.value))}>
                            {f((data?.total_pages)?(data?.total_pages):1)}
                            </select>
                        </div>
                    </div>
                    <div className='parent'>
                        <p className='children'>Total Users: {data?.total}</p>
                        <p className='children'>Total Pages: {data?.total_pages}</p>
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
                <tr key={user.id} onClick={() => handleRowClick(user.id,pageNumber,numUsers)}>
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
        }
    </div>
  );
}

export default UserList;
