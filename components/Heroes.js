import React from "react";
import styles from "../components/Heroes.module.css";
import Link from "next/link";
function Heroes(props) {
  return (
    <Link href={props.link}>
      <div className={styles.container}>
        <img src={props.source}></img>
        <div className={styles.tcontainer}>
          <h5 className={styles.text}>{props.name}</h5>
        </div>
      </div>
    </Link>
  );
}

export default Heroes;
