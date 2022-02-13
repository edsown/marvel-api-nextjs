import React from "react";
import AsyncSelect from "react-select/async";
import md5 from "md5";
const publicKey = "ea3f84e8fb89a49e96db6db00d192540";
const privateKey = "1be47688b8609c33a5f77a6acce22635334ebf58";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;

export default function PageComponent() {
  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: data.name,
  });

  async function callApi(value) {
    const data = await fetch(
      `http://gateway.marvel.com/v1/public/characters?${key}&nameStartsWith=${value}`
    )
      .then((response) => response.json())
      .then((response) => response.map(mapResponseToValuesAndLabels))
      .then((final) =>
        final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
      );

    return data;
  }

  return (
    <div>
      <p>Exemplo de Async Select com api</p>
      <AsyncSelect
        cacheOptions
        loadOptions={callApi}
        onInputChange={(data) => {
          console.log(data);
        }}
        onChange={(data) => {
          console.log(data);
        }}
        defaultOptions
      />
    </div>
  );
}
