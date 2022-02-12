import React from "react";
import styles from "../components/Heroes.module.css";

function Heroes(props) {
  return (
    <div className={styles.container}>
      <img src={props.source}></img>
      <div className={styles.tcontainer}>
        <h5 className={styles.text}>{props.name}</h5>
      </div>
    </div>
  );
}

export default Heroes;
