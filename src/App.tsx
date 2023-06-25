import reactLogo from './assets/react.svg'
import './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { useState } from 'react';
import { useFetchUsersQuery } from './features/users/users-api-slice';

import UserDetails from './components/UserDetails';
import UserList from './components/UserList';



function App() {
  return (
    <Router>
      <Route path='/' element={<UserList/>} />
      <Route path='/:id' element={<UserDetails/>}/>
    </Router>
  )
}

export default App;
