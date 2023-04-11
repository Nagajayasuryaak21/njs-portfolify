import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
//import { data } from "../constants/Data";
const Tech = (props) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div variants={textVariant()} className="m-[50px]">
        <p className={`${styles.sectionSubText} `}>My skills</p>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => {
          if (props.data.technologies.includes(technology.name))
            return (
              <div className="w-28 h-28" key={technology.name}>
                <BallCanvas technology={technology} />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
// export default Tech;
