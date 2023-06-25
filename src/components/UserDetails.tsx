import { User, useFetchUsersQuery } from '../features/users/users-api-slice';
import { createSelector } from '@reduxjs/toolkit';
import { useLocation, useParams } from 'react-router-dom';

function UserDetails(){

    const location = useLocation();
    const page = location.state.page ? location.state.page : 1;
    const per_page = location.state.per_page ? location.state.per_page : 20;

    const { id } = useParams();

    let {data} = useFetchUsersQuery({page:page,per_page:per_page}); // geting from the catch, not calling again

    const dummyUser: User = {
        id: 0,
        first_name:"not found",
        last_name:"not found",
        email:"not found",
        avatar:"not found"
    }
    const dummyUserArray = [dummyUser]
    const res = data? data.data : dummyUserArray;

    const selectNumCompletedTodos = createSelector(
        (data: User[]) => data,
        (data:User[],userId : number) => userId,
        (data:User[],userId:number) => data.filter((user) => user.id == userId)
      )
      
    const user = selectNumCompletedTodos(res,id?Number(id):0)[0];

    return(
        <div>
            <h2>User Details</h2>
            <p><img src={user.avatar} alt={`Avatar of ${user.first_name}`} /></p>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
        </div>
    );
}
export default UserDetails;


