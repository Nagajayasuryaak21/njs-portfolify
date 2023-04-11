import { BrowserRouter } from "react-router-dom";
import { datas } from "./constants/Data";
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
import { styles } from "./styles";
const Home = () => {
  const [data, setData] = useState(datas);
  const navigate = useNavigate();
  const handleLogin = (e) => {

    navigate("/login");
  };
  const handleRegister = (e) => {
    //e.preventDefault()
    navigate("/register");
  };

  return (
    <div>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar isset={true} />
          <Hero data={data} isset={true} />
        </div>

        <About data={data} isset={true} />
        <Experience data={data} />
        <Tech data={data} />
        <Works data={data} />
        <Feedbacks data={data} />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <div className="bg-gray-900 flex flex-col items-center py-[50px]">
          <h2
            className={`${styles.heroHeadText} text-center text-white my-[20px]`}
          >
            {" "}
            Build Your Own Portfolio
          </h2>

          <div>
            <button
              onClick={handleLogin}
              className="bg-tertiary cursor-pointer py-3 px-[30px] rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary mx-3  "
            >
              Sign-In
            </button>
            <button
              onClick={handleRegister}
              className="border py-3 cursor-pointer px-[30px] rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary  mx-3 w-fit"
            >
              Sign-Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
