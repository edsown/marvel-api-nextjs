import { getCharacters } from "./api/characters";
import { useState } from "react";
import GetHero from "../components/GetHero";
import styles from "../components/index.module.css";
import AsyncSelect from "react-select/async";
import Link from "next/link";
import Head from "next/head";
import md5 from "md5";
const publicKey = "ea3f84e8fb89a49e96db6db00d192540";
const privateKey = "1be47688b8609c33a5f77a6acce22635334ebf58";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;
let searchInput = "";

export async function getStaticProps() {
  const allComicsData = await getCharacters();

  return {
    props: {
      allComicsData,
    },
  };
}

export default function Home({ allComicsData }) {
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
      `http://gateway.marvel.com/v1/public/characters?${key}&nameStartsWith=${inputValue}`
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
      <div className={styles.navbar}>
        <a href="/">
          <img className={styles.logo} src="/images/marvel-labs.png"></img>
        </a>
        <Link href="/sobre">
          <a className={styles.navlink}>about</a>
        </Link>
      </div>

      <div className={styles.bigcontainer}>
        <AsyncSelect
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
              required
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Order by
              </option>
              <option value="name">Name</option>
              <option value="modified">Last modified</option>
            </select>
          </form>
        </div>
        <div className={styles.container}>
          <GetHero
            func={handleInputChange}
            nameWith={inputValue}
            sortBy={select}
          />
        </div>
      </div>
    </div>
  );
}
