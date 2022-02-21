import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeroDescription from "../../components/HeroDescription";
import Footer from "../../components/Footer";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { authKey } from "../services/api";

export default function CharacterDetail() {
  const [characterDetails, setCharacterDetails] = useState([""]);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    console.log(id, "log do id query");
    if (id) {
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?${authKey}`
      )
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
      <Navbar />
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
