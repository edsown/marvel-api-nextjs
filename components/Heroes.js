import React from "react";
import styles from "../components/Heroes.module.css";

function Heroes(props) {
  return (
    <div className={styles.container}>
      <img src={props.source}></img>
      <div className={styles.tcontainer}>
        <h4 className={styles.text}>{props.name}</h4>
      </div>
    </div>
  );
}

export default Heroes;
