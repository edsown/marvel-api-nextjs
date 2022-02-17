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
        <Link href="/favorites">
          <a className={styles.navlink}>Favorites</a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
