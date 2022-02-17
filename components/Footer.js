import React from "react";
import styles from "../components/Footer.module.css";
function Footer() {
  return (
    <div>
      <div className={styles.footerItems}>
        <p>Data provided by Marvel. © 2014 Marvel</p>
        <p>
          Developed and designed by{" "}
          <a href="http://github.com/edsown" target="_blank">
            edsown
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
