import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const newServices = [
  {
    title: "Web Developer",
    icon: "path/to/web-development-icon.png",
  },
  {
    title: "Content Creator",
    icon: "path/to/content-creator-icon.png",
  },
  {
    title: "Game Developer",
    icon: "path/to/game-developer-icon.png",
  },
  {
    title: "3D Artist",
    icon: "path/to/3d-artist-icon.png",
  },
  {
    title: "UI/UX Designer",
    icon: "path/to/ui-ux-icon.png",
  },
  {
    title: "Photographer",
    icon: "path/to/photography-icon.png",
  },
  {
    title: "VR/AR Developer",
    icon: "path/to/vr-ar-icon.png",
  },
  {
    title: "Project Management",
    icon: "path/to/pm-icon.png",
  },
];

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a passionate BSc IT (Hons) in Interactive Media undergrad with a tech and creative spark. I thrive in mobile app development, UX/UI design, and game creation, building intuitive and visually stunning experiences. Beyond code, I wield a camera, capturing captivating moments and crafting visual stories through photography and videography.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {newServices.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
