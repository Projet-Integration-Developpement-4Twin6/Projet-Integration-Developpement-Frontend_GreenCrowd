import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// const Landing = lazy(()=>import('./views/examples/Landing'));
// const Login = lazy(()=>import('./views/Login'));

// const Profile = lazy(()=>import('./views/Profile'));
// const Index = lazy(()=>import('./views/Index'));

// const Register = lazy(()=>import('./views/Register'));
// const NotFound = lazy(()=>import('./views/NotFound'));

import Indexs from "views/Index.js";
import NotFound from "views/NotFound.js";
import Landing from "views/Landing.js";

import Login from "views/Login.js";
import ProfileFront from "views/Profile.js";
import Reset from "views/Reset.js";

import Register from "views/Register.js";
import DemoNavbar from "components/Navbars/DemoNavbar";
import SimpleFooter from "components/Footers/SimpleFooter";

import Index from "views/Backend/Index.js";
import IndexDefault from "views/Index.js";
import Profile from "views/Backend/Profile.js";
import Tables from "views/Backend/Tables.js";
import ProfileAdd from "views/Backend/Profile-Add";

import FablabJoin from "./views/FablabJoin";
import AdminFablabJoin from "./views/Backend/AdminFablabJoin";
import FablabRequestDetails from "./views/Backend/FablabRequestDetails";
import ResetPwd from "views/ResetPwd";

import SpinnerExample from "./components/spinner.css";

function App() {
  return (
    <>
          <Suspense fallback={<SpinnerExample/>}>
      {/* <DemoNavbar /> */}
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/landing-page" element={<Landing />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/profile-page/:id" element={<ProfileFront />} />
        <Route path="/Composant" element={<Indexs />} />
        <Route path="/Register-page" element={<Register />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/Tables" element={<Tables />} />
        <Route path="/Index" element={<Index />} />
        <Route path="/IndexDefault" element={<IndexDefault />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/Profile-Add" element={<ProfileAdd />} />
        <Route path="/FablabJoin" element={<FablabJoin />} />
        <Route path="/AdminFablabJoin" element={<AdminFablabJoin/>} /> 
        <Route path="/FablabRequestDetails/:id" element={<FablabRequestDetails/>} /> 
        <Route path="/reset" element={<Reset />} />
        <Route path="/resetpwd" element={<ResetPwd />} />
      </Routes>
      </Suspense>
      <SimpleFooter />
    </>
  );
}

export default App;
