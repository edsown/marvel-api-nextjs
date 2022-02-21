import React, { useState, useEffect, useCallback } from "react";
import { authKey } from "../services/api";
import axios from "axios";
import Link from "next/link";
import styles from "../components/GetHero.module.css";

function GetHero(props) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await axios
          .get(
            `https://gateway.marvel.com/v1/public/characters?${authKey}&orderBy=${
              props.sortBy
            }${props.nameWith == "" ? "" : "&nameStartsWith=" + props.nameWith}`
          )
          .then(setLoading(true));

        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getCharacters();
  }, [props.heroSearch]);

  const getMore = useCallback(async () => {
    try {
      const offset = characters.length;
      const response = await axios
        .get(
          `https://gateway.marvel.com/v1/public/characters?${authKey}&offset=${offset}&orderBy=${
            props.sortBy
          }${props.nameWith == "" ? "" : "&nameStartsWith=" + props.nameWith}`
        )
        .then(setLoadingMore(true));

      await setCharacters([...characters, ...response.data.data.results]);

      setLoadingMore(false);
    } catch (err) {
      console.log("erro", err);
    }
  }, [characters]);

  return (
    <>
      {loading ? (
        <h2>Loading Characters</h2>
      ) : (
        characters.map((character) => (
          <>
            <Link key={character.id} href={`/character/${character.id}`}>
              <div className={styles.container}>
                <img
                  src={
                    character.thumbnail.path !==
                    "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                      ? `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
                      : "/images/marvel-cover.jpg" // Se não tiver capa, colocar capa personalizada que eu fiz
                  }
                ></img>
                <div className={styles.tcontainer}>
                  <h5 className={styles.text}>{character.name}</h5>
                </div>
              </div>
            </Link>
          </>
        ))
      )}
      {loadingMore ? (
        <h2 className={styles.loadingMore}>Loading More</h2>
      ) : (
        <button className={styles.button} onClick={getMore}>
          <h2>Load More</h2>
        </button>
      )}
    </>
  );
}

export default GetHero;
