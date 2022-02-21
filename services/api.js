import axios from "axios";
import md5 from "md5";
const publicKey = process.env.PUB_KEY;
const privateKey = process.env.PRIV_KEY;

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export const authKey = `&ts=${time}&apikey=${publicKey}&hash=${hash}`;

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

export default api;
