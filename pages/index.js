import React, { useEffect, useState } from "react";
import { getCharacters } from "./api/characters";
import Heroes from "../components/Heroes";
import styles from "../components/index.module.css";
import Autocomplete from "../components/Autocomplete.js";
import "../components/Autocomplete.module.css";

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
        <img className={styles.logo} src="/images/marvel-labs.png"></img>
        <Autocomplete
          suggestions={[
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District Of Columbia",
            "Federated States Of Micronesia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Marshall Islands",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Mariana Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Palau",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virgin Islands",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
          ]}
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
