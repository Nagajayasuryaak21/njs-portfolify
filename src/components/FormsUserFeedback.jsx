import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import "react-vertical-timeline-component/style.min.css";
import { fadeIn, textVariant } from "../utils/motion";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);
const FormsUserFeedback = (props) => {
  const [testimonial, setTestimonial] = useState("");
  const [isTestimonial, setIsTestimonial] = useState(
    props.data.isTestimonial || false
  );
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [testimonials, setTestimonials] = useState(
    props.data.testimonials || []
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const newtestimonial = {
      testimonial,
      name,
      designation,
      company,
      image,
    };
    setTestimonials([...testimonials, newtestimonial]);
    setTestimonial("");
    setCompany("");
    setname("");
    setImage("");
    setDesignation("");

  };

  const handlenext = (e) => {
    props.data.isTestimonial = isTestimonial;
    props.data.testimonials = testimonials;
    props.onNext(props.data);
  };
  const handleback = (e) => {
    props.data.isTestimonial = isTestimonial;
    props.data.testimonials = testimonials;
    props.onBack(props.data);
  };

  const handleDelete = (index) => {
    const newArray = [...testimonials];
    newArray.splice(index, 1);
    setTestimonials(newArray);
  };

  const handleRadioChange = (e) => {
    if (e.target.name === "no") {
      setIsTestimonial(false);
      setTestimonials([]);
    } else {
      setIsTestimonial(true);
    }

  };

  return (
    <div
      className={` flex items-center justify-center flex-col gap-10 `+((isTestimonial)?'h-[auto]':'h-[100vh]')}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl w-[70%] min-w-[200px]  max-w-[700px] flex flex-col"
      >
        <div className="mr-[30px] my-[20px]">
          <p className={styles.sectionSubText}>
            Do you have any feedback you'd like to share?
          </p>
        </div>
        <div className="flex space-x-20 mb-[20px]">
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="checked"
              className="m-2 w-[20px]"
              checked={isTestimonial}
              onChange={handleRadioChange}
            />
            Yes
          </label>
          <label className="flex items-center text-xl">
            <input
              type="radio"
              name="no"
              className="m-2 w-[20px]"
              checked={!isTestimonial}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>

        {isTestimonial ? (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="mr-[30px] my-[20px]">
                <p className={styles.sectionSubText}>
                  Add Details About feedbacks you got from others
                </p>
                <h3 className={styles.sectionHeadText}>Customer Feedback</h3>
              </div>
              <div className="w-[85%] mx-[auto]">
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Testimonial
                  </span>
                  <input
                    type="text"
                    id="testimonial"
                    value={testimonial}
                    onChange={(event) => setTestimonial(event.target.value)}
                    placeholder="Enter feedback "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">Reviewer Name</span>
                  <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                    placeholder="Enter reviewer name "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Designation
                  </span>
                  <input
                    type="text"
                    id="icon"
                    value={designation}
                    onChange={(event) => setDesignation(event.target.value)}
                    placeholder="Enter designation of reviewer "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">
                    Company Name
                  </span>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Enter reviewer's company name "
                    className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-4">Image</span>
                  <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="Enter reviewer'd company icon URL "
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

      {isTestimonial ? (
        <div className={`mt-12 bg-black-100 rounded-[20px] mb-[50px] flex flex-col items-center`}>
          <p className={styles.sectionSubText}>Preview</p>
          <div
            className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
          >
            <motion.div variants={textVariant()}>
              <p className={styles.sectionSubText}>What others say</p>
              <h2 className={styles.sectionHeadText}>Testimonials.</h2>
            </motion.div>
          </div>
          <div
            className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col">
                <FeedbackCard
                  key={testimonial.name}
                  index={index}
                  {...testimonial}
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

export default FormsUserFeedback;
