import React, { useState } from "react";
import { technologies as Tech, services as Serv } from "../constants";

import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
const FormsUserServTech = ({ onBack, onNext, data }) => {
  const [technologies, setCheckedTechnologies] = useState(
    data.technologies || []
  );
  const [services, setCheckedServices] = useState(data.services || []);

  const handleCheckboxChangeTech = (event) => {
    const technologyName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedTechnologies([...technologies, technologyName]);
    } else {
      setCheckedTechnologies(
        technologies.filter((name) => name !== technologyName)
      );
    }
  };
  const handleCheckboxChangeServ = (event) => {
    const ServiceName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedServices([...services, ServiceName]);
    } else {
      setCheckedServices(services.filter((name) => name !== ServiceName));
    }
  };
  const handlenext = (e) => {
    data.technologies = technologies;
    data.services = services;
    onNext(data);
  };
  const handleback = (e) => {
    data.technologies = technologies;
    data.services = services;
    onBack(data);
  };

  return (
    <div
      className={` flex items-center justify-center h-[100vh]  flex-col-reverse gap-10 overflow-auto `}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[350px]  max-w-[700px]  "
      >
        <div className="flex justify-center flex-col items-center">
          <p className={styles.sectionSubText}>Technologies Known</p>

          <div className="flex flex-wrap gap-5 ml-20 mt-10 mb-10">
            {Tech.map((technology, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={index}
                  name={technology.name}
                  checked={technologies.includes(technology.name)}
                  onChange={handleCheckboxChangeTech}
                  className="m-1"
                />
                <label>{technology.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p className={styles.sectionSubText}>services</p>

          <div className="flex flex-wrap gap-5 ml-20 mt-10 mb-10">
            {Serv.map((service, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={index}
                  name={service.title}
                  checked={services.includes(service.title)}
                  onChange={handleCheckboxChangeServ}
                  className="m-1"
                />
                <label>{service.title}</label>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
};

export default FormsUserServTech;
