// import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import User from "./User";
import Forms from "./Forms";
import Home from "./Home";
import { Login, Register,Goto } from "./components";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState({
    _id: "",
    user: "",
    userName: "",
    userDo: "",
    userAbout: "",
    technologies: [],
    services: [],
    isExperience: false,
    experiences: [],
    isTestimonial: false,
    testimonials: [],
    isProject: false,
    projects: [],
    aboutProjects:"",
    __v: 0,
  });

  const [key, setKey] = useState(0);


  const handleForm=(e)=>{
    const navigate= useNavigate();
    navigate('/forms');
  }
  const updateUserData = (userData) => {
    setData(userData);
    setKey(key+1);

  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login update={updateUserData} goForm={handleForm} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user" element={<User />} />
        <Route path="/forms" element={<Forms data={data}  key={key}/>} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/GoTo" element={<Forms data={data} link={`/user/${data.user}`}/>} /> */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
