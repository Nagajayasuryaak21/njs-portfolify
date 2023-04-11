import React, { useState } from "react";
import { technologies as Tech, services as Serv } from "../constants";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { textVariant } from "../utils/motion";
import { assets } from "../constants/Data";
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={assets[experience.icon] || experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2 ">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider "
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};
const FormsUserExperience = (props) => {
  const [title, setTitle] = useState("");
  const [isExperience, setIsExperience] = useState(props.data.isExperience||false);
  const [companyName, setCompanyName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconBg, setIconBg] = useState("#FFFFFF");
  const [date, setDate] = useState("");
  const [points, setPoints] = useState([]);
  const [experiences, setExperiences] = useState(props.data.experiences||[]);

  const handleAddPoint = () => {
    setPoints([...points, ""]);
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const experience = {
      title,
      company_name: companyName,
      icon,
      iconBg,
      date,
      points,
    };
    setExperiences([...experiences, experience]);
    setTitle("");
    setCompanyName("");
    setIcon("");
    setIconBg("#FFFFFF");
    setDate("");
    setPoints([]);
  };

  const handlenext = (e) => {
    props.data.isExperience = isExperience;
    props.data.experiences = experiences;
    props.onNext(props.data);
  };
  const handleback = (e) => {
    props.data.isExperience = isExperience;
    props.data.experiences = experiences;
    props.onBack(props.data);
  };

  const handleDelete= (index)=>{
    const newArray = [...experiences];
    newArray.splice(index, 1);
    setExperiences(newArray);
  }

  const handleRadioChange = (e) => {
    if (e.target.name === "no") {
      setIsExperience(false);
      setExperiences([]);
    } else {
      setIsExperience(true);
    }

  };

  return (
    <div
      className={` flex items-center justify-center  flex-col gap-10 `+((isExperience)?'h-[auto]':'h-[100vh]')}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] flex flex-col"
      >
        <div className="mr-[30px] my-[20px]">
          <p className={styles.sectionSubText}>
            Do you have any work experience?
          </p>
        </div>
        <div className="flex space-x-20 mb-[20px]">
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="checked"
              className="m-2 w-[20px]"
              checked={isExperience}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="no"
              className="m-2 w-[20px]"
              checked={!isExperience}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>

        {isExperience ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="mr-[30px] my-[20px]">
                <p className={styles.sectionSubText}>
                  Add Details About your experiance
                </p>
                <h3 className={styles.sectionHeadText}>Work Experience</h3>
              </div>
              <div className="w-[85%] mx-[auto]">
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">Job Title</span>
                  <input
                    type="text"
                    //name='userName'
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    //value={data.userName}
                    //onChange={handleChange}
                    placeholder="Enter title of your job "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
                {/* <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            /> */}

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Company Name
                  </span>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="Enter The Company Name "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>

                {/* <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            /> */}

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">Icon Url</span>
                  <input
                    type="text"
                    id="icon"
                    value={icon}
                    onChange={(event) => setIcon(event.target.value)}
                    placeholder="Enter The Company Icon URL "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>

                {/* <label htmlFor="icon">Icon</label>
            <input
              type="text"
              id="icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
            /> */}

                {/* <label htmlFor="iconBg">Icon Background</label>
            <input
              type="text"
              id="iconBg"
              value={iconBg}
              onChange={(event) => setIconBg(event.target.value)}
            /> */}

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Time Period
                  </span>
                  <input
                    type="text"
                    id="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    placeholder="Enter start and end date "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>

                {/* <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            /> */}
              </div>
              <div className="mr-[30px] my-[20px]">
                <p className={styles.sectionSubText}>
                  Add Some Points About Your Work Experiance
                </p>
                <h3 className={styles.sectionHeadText}>Points</h3>
              </div>

              {points.map((point, index) => (
                <div key={index} className="w-[85%] mx-[auto]">
                  {/* <input
                  type="text"
                  value={point}
                  onChange={(event) =>
                    handlePointChange(index, event.target.value)
                  }
                /> */}
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      point : {index + 1}
                    </span>
                    <input
                      type="text"
                      id="icon"
                      value={point}
                      onChange={(event) =>
                        handlePointChange(index, event.target.value)
                      }
                      placeholder="Enter The Company Icon URL "
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                </div>
              ))}
              <button
                className="border-transparent rounded bg-sky-500/100 w-fit  my-10  px-[15px] py-[7px]"
                type="button"
                onClick={handleAddPoint}
              >
                Add Point +
              </button>

              <button
                className="border-transparent rounded bg-green-500/100 w-fit mx-auto  my-5  px-[15px] py-[7px]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div></div>
        )}

        <div className="flex justify-between w-[100%]">
          <button
            type="button"
            onClick={handleback}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlenext}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Next
          </button>
        </div>
      </motion.div>

      <div className="mt-20 flex flex-col items-center w-[80%]">
        {(isExperience && experiences.length>0)?<p className={styles.sectionSubText}>
          Preview
        </p>:<div></div>}
        {experiences.map((experience, index) => (
          
          <div key={index} className=" flex flex-col my-[50px]">
            
            <ExperienceCard key={`experience-${index}`} experience={experience} />
            <button className="w-fit ml-auto rounded px-[15px] py-[6px] bg-red-500/100" key={index} name ={index} onClick={()=>handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormsUserExperience;
