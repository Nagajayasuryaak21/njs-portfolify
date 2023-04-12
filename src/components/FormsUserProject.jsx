import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { github } from "../assets";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import axios from "axios";
import "react-vertical-timeline-component/style.min.css";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        
      </Tilt>
    </motion.div>
  );
};
const FormsUserProject = (props) => {
  const [isProject, setIsProject] = useState(props.data.isProject || false);
  const [aboutProject, setAboutProject] = useState(
    props.data.aboutProject || ""
  );
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sourse_code_link, setLink] = useState("");
  const [projects, setProjects] = useState(props.data.projects || []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newproject = {
      name,
      description,
      image,
      sourse_code_link,
    };
    setProjects([...projects, newproject]);
    setname("");
    setDescription("");
    setImage("");
    setLink("");

  };

  const handlenext = async (e) => {
    e.preventDefault();

    props.data.isProject = isProject;
    props.data.projects = projects;
    props.data.aboutProject = aboutProject;
    props.onSubmit(props.data);
    
  };
  const handleback = (e) => {
    props.data.isProject = isProject;
    props.data.projects = projects;
    props.data.aboutProject = aboutProject;
    props.onBack(props.data);
  };

  const handleDelete = (index) => {
    const newArray = [...projects];
    newArray.splice(index, 1);
    setProjects(newArray);
  };

  const handleRadioChange = (e) => {
    if (e.target.name === "no") {
      setIsProject(false);
      setProjects([]);
    } else {
      setIsProject(true);
    }

  };

  return (
    <div
      className={
        ` flex items-center justify-center flex-col gap-10 ` +
        (isProject ? "h-[auto]" : "h-[100vh]")
      }
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] flex flex-col"
      >
        <div className="mr-[30px] my-[20px]">
          <p className={styles.sectionSubText}>
            Do you have any projects to share?
          </p>
        </div>
        <div className="flex space-x-20 mb-[20px]">
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="checked"
              className="m-2 w-[20px]"
              checked={isProject}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="no"
              className="m-2 w-[20px]"
              checked={!isProject}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>

        {isProject ? (
          <div>
            <label className="flex flex-col mb-10">
              <span className="text-white font-medium mb-4">
                Write Someting About Your Works
              </span>
              
              <textarea
              rows={5}
              name='userAbout'
              value={aboutProject}
                onChange={(event) => setAboutProject(event.target.value)}
              placeholder='Enter some points about your projects and your experience'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              required
            />
            </label>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <div className="mr-[30px] my-[20px]">
                  <p className={styles.sectionSubText}>
                    Add Details of your projects
                  </p>
                  <h3 className={styles.sectionHeadText}>Projects</h3>
                </div>
                <div className="w-[85%] mx-[auto]">
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Project Name
                    </span>
                    <input
                      type="text"
                      id="Name"
                      value={name}
                      onChange={(event) => setname(event.target.value)}
                      placeholder="Enter project name "
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Project Description
                    </span>
                    <input
                      type="text"
                      id="icon"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Enter project description "
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Project Image
                    </span>
                    <input
                      type="text"
                      id="company"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                      placeholder="Enter project image URL "
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Project Git Link
                    </span>
                    <input
                      type="text"
                      id="image"
                      value={sourse_code_link}
                      onChange={(event) => setLink(event.target.value)}
                      placeholder="Enter project GIT link "
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                </div>

                <button
                  className="border-transparent rounded bg-green-500/100 w-fit mx-auto  my-5  px-[15px] py-[7px]"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
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
            type="submit"
            onClick={handlenext}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Submit
          </button>
        </div>
      </motion.div>

      {isProject ? (
        <div className="flex flex-col items-center">
          <p className={styles.sectionSubText}>Preview</p>

          <div className="mt-10 flex flex-wrap gap-7 mb-[50px]">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col">
                <ProjectCard
                  key={`project-${index}`}
                  index={index}
                  {...project}
                />
                <button
                  className="w-fit ml-auto rounded px-[15px] py-[6px] bg-red-500/100 my-2"
                  key={index}
                  name={index}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FormsUserProject;
