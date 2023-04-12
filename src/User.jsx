import { BrowserRouter } from "react-router-dom";
import { datas } from "./constants/Data";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./components/Loader"
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const User = (params) => {
  const [data, setData] = useState(datas);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (id) {
      console.log("Id",id);
      fetch(`${import.meta.env.VITE_APP_API_PATH}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      })
        .then((response) => response.json())
        .then((newData) => {
          setData(newData);
          setIsLoading(false);
        })
        .catch((error) => {console.log(error);alert('some thing went wrong');navigate("/");});
    } else {
      //setData(datas);
      setIsLoading(false);
      navigate("/");
    }
  }, [id]);

  if (isLoading) {
    return (
      <Canvas className="h-[100vh] flex items-center justify-center">
        <CanvasLoader/>
      </Canvas>
    );
  }
  return (
    <div>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero data={data} />
        </div>
        <About data={data} />
        <Experience data={data} />
        <Tech data={data} />
        <Works data={data} />
        <Feedbacks data={data} />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </div>
  );
};

export default User;
