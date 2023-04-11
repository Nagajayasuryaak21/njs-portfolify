import { BrowserRouter , useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormsUserAbout,
  FormsUserServTech,
  FormsUserExperience,
  FormsUserFeedback,
  FormsUserProject,
  Navbar,
  Goto,
} from "./components";

const Forms = (props) => {

  const navigate = useNavigate();
  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  if (props.data._id === "") {
    window.location = "/login";
  }
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    form1: {
      _id: props.data._id,
      user: props.data.user,
      userName: props.data.userName,
      userDo: props.data.userDo,
      userAbout: props.data.userAbout,
    },
    form2: {
      services: props.data.services,
      technologies: props.data.technologies,
    },
    form3: {
      isExperience: props.data.isExperience,
      experiences: props.data.experiences,
    },
    form4: {
      isTestimonial: props.data.isTestimonial,
      testimonials: props.data.testimonials,
    },
    form5: {
      isProject: props.data.isProject,
      projects: props.data.projects,
      aboutProject: props.data.aboutProject,
    },
  });

  const handleNext = (data) => {
    const currentForm = `form${step}`;
    const nextForm = `form${step + 1}`;
    setFormData((prevData) => ({ ...prevData, [currentForm]: data }));
    setStep(step + 1);
    const nextFormData = formData[nextForm] || {};
    const updatedFormData = { ...data, ...nextFormData };
    setFormData((prevData) => ({ ...prevData, [nextForm]: updatedFormData }));
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (data) => {

    try {

      const url = "http://localhost:3000/api/data/put";
      const { data: res } = await axios.post(url, {
        data: data,
        userId: data._id,
      });
      setStep(step + 1);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert(error.message);
        navigate("/");
      }
    }
  };

  const formProps = {
    onNext: handleNext,
    onBack: handleBack,
    data: formData[`form${step}`] || {},
  };

  return (
    <div>
      <div className="relative z-0 bg-primary">
        {step === 1 && <FormsUserAbout {...formProps} />}
        {step === 2 && <FormsUserServTech {...formProps} />}
        {step === 3 && <FormsUserExperience {...formProps} />}
        {step === 4 && <FormsUserFeedback {...formProps} />}
        {step === 5 && (
          <FormsUserProject {...formProps} onSubmit={handleSubmit} />
        )}
        {step === 6 && (
          <Goto link={formData['form1']} />
        )}
        {/* add more forms as needed */}
      </div>
    </div>
  );
};

export default Forms;
