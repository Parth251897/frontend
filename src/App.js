import React from "react";
import "./App.css";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Header from "./component/Header";
import Logout from "./component/Logout";
import { Route, Routes } from "react-router-dom";
import Sendotp from "./component/Sendotp";
import Resetpassword from "./component/Resetpassword";
import PasswordChangeForm from "./component/Changepassword";
import Loginn from './component/signin'
function App() {
  return (
    <>
    <Routes>
   <Route path="/" element={<Login/>} />
   <Route path="/loginn" element={<Loginn/>} />
   <Route path="/Sign-Up" element={<SignUp/>} />
   <Route path="/Header" element={<Header/>}/>
   <Route path="/Logout" element={<Logout/>}/>
   <Route path="/Sendotp" element={<Sendotp/>}/>
   <Route path="/Resetpassword" element={<Resetpassword/>}/>
   <Route path="/Changepassword" element={<PasswordChangeForm/>}/>

    </Routes>
    
   
    </>
    );
}

export default App;
