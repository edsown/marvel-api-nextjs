import md5 from "md5";
const publicKey = "ea3f84e8fb89a49e96db6db00d192540";
const privateKey = "1be47688b8609c33a5f77a6acce22635334ebf58";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;

export async function getCharacters() {
  //futuramente, em um .env
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters?${key}`
  );
  const data = await res.json();
  return data.data.results;
}
export async function getNameStartsWith(name) {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters?${key}&nameStartsWith=${name}`
  );
  const suggestionData = [];
  const data = await res.json();
  const dataObj = await data.data.results;
  dataObj.map((obj) => suggestionData.push(obj.name));

  return suggestionData;
}
