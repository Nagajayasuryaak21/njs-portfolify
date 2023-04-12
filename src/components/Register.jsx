import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarForm from "./NavbarForm";
import { EarthCanvas, StarsCanvas } from "./canvas";
import { slideIn } from "../utils/motion";

const Register = () => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_PATH;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [msg,setMsg]= useState("Register");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSignIn = (e) => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Please Wait ...")
    try {
      //console.log(data);
      const url = `${import.meta.env.VITE_APP_API_PATH}/users`;
      const res = await axios.post(url,{...data});
      navigate("/login");
      //console.log(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        alert(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <NavbarForm />
      <div className="relative z-0">
        <div className={` flex items-center  flex-col gap-10 overflow-hidden `}>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] mt-[70px]"
          >
            <p className={styles.sectionSubText}>Create New Account</p>
            <h3 className={styles.sectionHeadText}>Register</h3>

            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your First Name
                </span>
                <input
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your Last Name
                </span>
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">Your Email</span>
                <input
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4">
                  Your Password
                </span>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                />
              </label>

              <button
                type="submit"
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                {msg}
              </button>
            </form>
          </motion.div>
          <div className="flex flex-col items-center ">
            <p>Create an Account?</p>
            <button onClick={handleSignIn} className="bg-tertiary py-3 px-[70px] rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary my-5">
              Sign In
            </button>
          </div>
        </div>
        <StarsCanvas />
      </div>
      <EarthCanvas />
    </div>
  );
};

export default Register;
