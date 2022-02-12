import React, { useEffect, useState } from "react";
import { getSortedPostsData } from "./api/characters";
import Heroes from "../components/Heroes";
import styles from "../components/index.module.css";

var offset = 0;
export async function getStaticProps() {
  const allComicsData = await getSortedPostsData(50);

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
        <h1>Character name: </h1>
        <div className={styles.container}>
          {allComicsData.map((comic) => (
            <>
              <Heroes
                name={comic.name}
                source={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
              />
            </>
          ))}
          ´
        </div>
      </div>
    </div>
  );
}
