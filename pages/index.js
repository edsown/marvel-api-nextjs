import { useState } from "react";
import GetHero from "../components/GetHero";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/index.module.css";
import AsyncSelect from "react-select/async";
import Link from "next/link";
import Head from "next/head";
import md5 from "md5";
const publicKey = "eca622d4ab963d8f9b56c9f3c38066db";
const privateKey = "eb16ea813f8b07a4c312fcccb371982f0f636366";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;

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
      `http://gateway.marvel.com/v1/public/characters?${key}${
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
