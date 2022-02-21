import { useState } from "react";
import GetHero from "../components/GetHero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/index.module.css";
import AsyncSelect from "react-select/async";
import Link from "next/link";
import Head from "next/head";
import { authKey } from "../services/api";

export default function Home({}) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [select, setSelect] = useState("");

  const handleInputChange = (value) => {
    if (value) {
      setInputValue(value);
    }

    console.log(inputValue);
  };
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleLoad = (inputValue) =>
    fetch(
      `https://gateway.marvel.com/v1/public/characters?${authKey}${
        inputValue == "" ? "" : "&nameStartsWith=" + inputValue
      }`
    )
      .then((data) => data.json())
      .then((results) => {
        return results.data.results.map((item) => ({
          value: (
            <Link href={`/character/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          ),
          label: (
            <Link href={`/character/${item.id}`}>
              <a>{item.name}</a>
            </Link>
          ),
          id: item.id,
        }));
      });

  return (
    <div>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Voltaire&display=swap');
        </style>
      </Head>
      <div>
        <Navbar />
      </div>
      <div className={styles.bigcontainer}>
        <AsyncSelect
          instanceId={"id"}
          className={styles.bar}
          defaultOptions={true}
          placeholder={"Search Character"}
          loadOptions={handleLoad}
          onInputChange={handleInputChange}
          onChange={handleChange}
          isClearable
          onKeyDown={(e) => {
            if (selectedValue) {
              if (e.keyCode === 13) {
                window.location.href = `/character/${selectedValue.id}`;
                console.log(inputValue);
              }
            }
          }}
        />
        <div>
          <br></br>
          <form className="select">
            <select
              className={styles.select}
              required
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
              }}
            >
              <option value="" disabled hidden>
                Order by
              </option>
              <option value="name">Name</option>
              <option value="modified">Last modified</option>
            </select>
          </form>
        </div>
        <div className={styles.container}>
          <GetHero
            heroSearch={handleInputChange}
            nameWith={inputValue}
            sortBy={select}
          />
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}
