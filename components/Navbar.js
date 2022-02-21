import React from "react";
import Link from "next/link";
import styles from "../components/Navbar.module.css";

function Navbar() {
  return (
    <div>
      <div className={styles.navContainer}>
        <Link href="/">
          <a>
            <img className={styles.logo} src="/images/marvel-labs.png"></img>
          </a>
        </Link>
        <Link href="/about">
          <a className={styles.navlink}>About</a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
