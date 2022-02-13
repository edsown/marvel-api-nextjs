import { getCharacters, getNameStartsWith } from "../api/characters";

export async function getStaticPaths(context) {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const id = context.params.id;
  return {
    props: {
      id: id,
    },
  };
}
async function Character(props) {
  return <div>Id do produto: {props.id} </div>;
}
export default Character;
