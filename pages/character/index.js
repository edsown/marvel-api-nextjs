import md5 from "md5";
const publicKey = "ea3f84e8fb89a49e96db6db00d192540";
const privateKey = "1be47688b8609c33a5f77a6acce22635334ebf58";
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const key = `&apikey=${publicKey}&hash=${hash}&ts=${ts}`;
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters?${key}`
  );
  const data = await res.json();

  return {
    props: { heroes: data },
  };
};

const Heroes = ({ heroes }) => {
  return (
    <div>
      <h1>All Heroes</h1>
      {heroes.data.results.map((heroes) => (
        <Link href={"/character/" + heroes.id} key={heroes.id}>
          <a>
            <h3>{heroes.name}</h3>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Heroes;
