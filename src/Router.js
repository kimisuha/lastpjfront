import { Routes, Route } from "react-router-dom";
import Login from './Component/Login.js'
import Signup from './Component/Signup.js'
import ForgotPass from './Component/ForgotPass.js'
import Profile from './Component/Profile.js'
import Dashboard from "./Component/Dashboard.js";
import Opp from "./Component/Opp.js";
import Test from "./Component/Test.js";

const RouterList = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/verify" element={<Opp/>}></Route>
            <Route path="/test" element={<Test/>}></Route>
        </Routes>
    );
}

export default RouterList;