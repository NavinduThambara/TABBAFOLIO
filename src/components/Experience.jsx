import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const experiences = [
  {
    title: "3D Modelling Artist",
    company_name: "TATEK",
    icon: "path/to/tatek-icon.png",
    iconBg: "#383E56",
    date: "Jun 2024 - Present",
    points: [
      "Created high-quality 3D models using Blender and Maya.",
      "Collaborated with the design team to develop realistic models for various projects.",
      "Ensured models were optimized for performance in different applications."
    ],
  },
  {
    title: "AR/VR Developer",
    company_name: "AirStudios",
    icon: "path/to/tatek-icon.png",
    iconBg: "#383E56",
    date: "Mar 2025 - Present",
    points: [
      "Developing immersive AR and VR experiences using Unity and C#.",
      "Collaborating with cross-functional teams to design interactive environments.",
      "Integrating 3D assets and optimizing performance for various AR/VR platforms.",
      "Conducting user testing and iterating based on feedback to enhance user experience."
    ],
  },
  
  {
    title: "Full-Stack Developer",
    company_name: "SLIIT",
    icon: "path/to/sliit-icon.png",
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developed and maintained web applications using React, Node.js, and MongoDB.",
      "Worked closely with the design team to implement user-friendly interfaces.",
      "Integrated RESTful APIs and third-party services."
    ],
  },
  {
    title: "Game Developer",
    company_name: "SLIIT",
    icon: "path/to/sliit-icon.png",
    iconBg: "#E6DEDD",
    date: "Jun 2024 - Present",
    points: [
      "Designed and developed game mechanics and features using Unity and C#.",
      "Collaborated with artists and designers to create engaging gameplay experiences.",
      "Optimized games for performance on various platforms."
    ],
  },
  {
    title: "Graphic Designer",
    company_name: "TATEK",
    icon: "path/to/tatek-icon.png",
    iconBg: "#383E56",
    date: "Jan 2021 - Present",
    points: [
      "Created visually appealing graphics for digital and print media.",
      "Worked with clients to understand their design needs and deliver tailored solutions.",
      "Managed multiple projects simultaneously while meeting deadlines."
    ],
  }
];

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
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
