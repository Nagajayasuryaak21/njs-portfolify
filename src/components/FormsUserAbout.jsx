import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
const FormsUserAbout = (props) => {
  const formRef = useRef();

  const [data , setData] = useState(props.data);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNext(data);
    
  };

  return (
    <div
      className={` flex items-center justify-center  flex-col-reverse gap-10 h-[100vh] sm:h-auto `}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] mt-[70px] mb-[50px]'
      >
        <p className={styles.sectionSubText}>Create Portfolio</p>
        <h3 className={styles.sectionHeadText}>User Details</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='userName'
              value={data.userName}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Short Message</span>
            <textarea
              rows={5}
              name='userDo'
              value={data.userDo}
              onChange={handleChange}
              placeholder='Short note about what you do'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>About You</span>
            <textarea
              rows={7}
              name='userAbout'
              value={data.userAbout}
              onChange={handleChange}
              placeholder='Enter About your skills and services you do'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {"Next"}
          </button>
        </form>
      </motion.div>

      
    </div>
  );
};

export default FormsUserAbout;
