import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { Animate } from "react-simple-animate";

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("LLLL"));
  const roles = [
    "a UI/UX Designer",
    "an Editor",
    "a Frontend Developer",
    "a Mobile Application Developer",
    "a Content Creator"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("LLLL"));
    }, 1000);

    const roleTimer = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // Change role every 3 seconds

    return () => {
      clearInterval(timer);
      clearInterval(roleTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#7469B6]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-black`}>
            HI, I'M <span className='text-[#FFFFFF]'>NAVINDU</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-300`}>
            I'm <Animate
              play
              duration={0.5}
              start={{ opacity: 0 }}
              end={{ opacity: 1 }}
              key={currentRoleIndex}
            >
              {roles[currentRoleIndex]}
            </Animate>
            <br className='sm:block hidden' />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>

      <div className='absolute bottom-10 w-full flex justify-center items-center'>
        <p className="text-white-200">
          {currentTime}
        </p>
      </div>
    </section>
  );
};

export default Hero;
