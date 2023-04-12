import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarsCanvas } from "./canvas";
import NavbarForm from "./NavbarForm";
const Goto = (props) => {

  const [data, setData] = useState(props.link || {});
  const link = `/user/${data.user}`;
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    navigate(link);
  };

  return (
    <div>
      <NavbarForm />
      <div className="relative z-0 h-[100vh]">
        <div className={` flex items-center  flex-col gap-10 overflow-hidden `}>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] mt-[70px]"
          >
            <p className={styles.sectionSubText}>Ready To Go...</p>
            <h3 className={styles.sectionHeadText}>
              Your Request Has Been Updated
            </h3>
          </motion.div>

          <div className="flex flex-col items-center ">
            <h1 className="text-white my-[20px]">
              Here is your{" "}
              <span className="text-[#915EFF]">link</span>
            </h1>
            <p>{"https://njs-portfolify.vercel.app"+link}</p>
            <button
              onClick={handleSignUp}
              className="bg-tertiary py-3 px-[70px] rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary my-5"
            >
              Go
            </button>
          </div>
        </div>
        <StarsCanvas />
      </div>
    </div>
  );
};

export default Goto;
