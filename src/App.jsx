import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import UserDetailsComponent from './components/UserDetailsComponent';
import UserForm from './components/UserForm';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <BrowserRouter>
       <HeaderComponent />
        <Routes>
          <Route exact path="/" element ={ <UserDetailsComponent/>} />
          <Route path="/edit-user/:id" element ={<UserForm/>} />
          <Route path="/add-user" element={<UserForm/>} /> {/* Route for AddUser component */}
        </Routes>
        <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
