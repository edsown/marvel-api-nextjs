import React from "react";
function HeroDescription(props) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.heroBanner}>
        <div className={styles.imgContainer}>
          <img src={props.banner}></img>
        </div>
        <div className={styles.txtContainer}>
          <p>{props.desc}</p>
        </div>
      </div>
      <div className={styles.comicsContainer}>{props.comics}</div>
    </div>
  );
}

export default HeroDescription;
