import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { useRouter } from "next/router";
import HeroDescription from "../../components/HeroDescription";
import Footer from "../../components/Footer";
import Head from "next/head";
import styles from "/components/id.module.css";
const publicKey = "eca622d4ab963d8f9b56c9f3c38066db";
const privateKey = "eb16ea813f8b07a4c312fcccb371982f0f636366";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `apikey=${publicKey}&hash=${hash}&ts=${ts}`;

export default function CharacterDetail() {
  const [characterDetails, setCharacterDetails] = useState([""]);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    console.log(id, "log do id query");
    if (id) {
      fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?${key}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data, "response.data");
          setCharacterDetails(response.data.results[0]);
        })
        .catch((error) => {
          console.error(error, "mensagem de erro");
        });
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Voltaire&display=swap');
        </style>
      </Head>

      <div className={styles.header}>
        <p>back to home</p>
        <h2>{characterDetails.name}</h2>
        <p>favorite</p>
      </div>

      <HeroDescription
        desc={
          characterDetails.description
            ? characterDetails.description
            : `The origins of ${characterDetails.name} are still a mystery to this very day.`
        }
        banner={
          characterDetails.thumbnail
            ? `${characterDetails.thumbnail.path}/portrait_uncanny.${characterDetails.thumbnail.extension}`
            : "/images/marvel-labs.png"
        }
      />
      <Footer />
    </>
  );
}
