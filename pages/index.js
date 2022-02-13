import { getCharacters, getNameStartsWith } from "./api/characters";
import { useState } from "react";
import Heroes from "../components/Heroes";
import styles from "../components/index.module.css";
import PageComponent from "../components/PageComponent";
import AsyncSelect from "react-select/async";
import md5 from "md5";
const publicKey = "ea3f84e8fb89a49e96db6db00d192540";
const privateKey = "1be47688b8609c33a5f77a6acce22635334ebf58";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;

export async function getStaticProps() {
  const allComicsData = await getCharacters();
  const hello = await getNameStartsWith();

  return {
    props: {
      allComicsData,
    },
  };
}

export default function Home({ allComicsData }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const handleLoad = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  return (
    <div>
      <div>
        <img className={styles.logo} src="/images/marvel-labs.png"></img>

        <AsyncSelect
          defaultOptions={true}
          placeholder={"Search Character"}
          loadOptions={(inputValue) =>
            fetch(
              `http://gateway.marvel.com/v1/public/characters?${key}&nameStartsWith=${inputValue}`
            )
              .then((data) => data.json())
              .then((results) => {
                return results.data.results.map((item) => ({
                  value: item.name,
                  label: item.name,
                }));
              })
          }
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
        <div className={styles.container}>
          {allComicsData.map((comic) => (
            <>
              <Heroes
                name={comic.name}
                source={
                  comic.thumbnail.path !==
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                    : "/images/marvel-cover.jpg"
                }
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
