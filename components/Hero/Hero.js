import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import Typography from "@mui/material/Typography";
function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroTxt}>
        <h1>Get cheesy with PizzaHub</h1>
        <p>
          Quick and easy delivery right to your door. <br /> Pick up your
          favorite pizza from our Pizza Hub.
        </p>
      </div>
      <div className={styles.heroImg}>
        <Image
          src="/images/Herov3.png"
          alt="Pizza food image!"
          width={700}
          height={500}
        />
      </div>
    </div>
  );
}

export default Hero;
