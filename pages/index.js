import React, { useEffect, useState } from "react";
import { getCharacters } from "./api/characters";
import Heroes from "../components/Heroes";
import styles from "../components/index.module.css";

var offset = 0;
export async function getStaticProps() {
  const allComicsData = await getCharacters(0);

  return {
    props: {
      allComicsData,
    },
  };
}

export default function Home({ allComicsData }) {
  console.log(allComicsData, "allComicsData log");
  return (
    <div>
      <div>
        <h1>Marvel Labs</h1>
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
