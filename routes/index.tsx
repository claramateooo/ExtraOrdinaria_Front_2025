import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers } from "$fresh/server.ts";
import { FreshContext, PageProps } from "$fresh/src/server/mod.ts";
import { deleteCookie, setCookie, getCookies } from "https://deno.land/std/http/cookie.ts";
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { ApiData } from "../types.ts";
import CharactersComp from "../components/CharactersComp.tsx";
import SearchCharacters from "../islands/SearchCharacter.tsx";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext) => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (response.status !== 200) {
      return new Response("Error Fetch");
    }
    const data: ApiData = await response.json();
    return ctx.render({ info: data.info, results: data.results });
  },

  POST: async (req, ctx) => {
    const form = await req.formData();
    const name = form.get("name")?.toString() ?? "";

    if (name) {
      const response1 = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
      if (response1.status === 404) {
        return ctx.render({ error: "No se encontraron personajes." });
      }
      if (response1.status !== 200) {
        return new Response("Error Fetch");
      }

      const data: ApiData = await response1.json();
      return ctx.render({ characters: data.results });
    }

    // fallback: sin nombre
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (response.status !== 200) {
      return new Response("Error Fetch");
    }
    const data: ApiData = await response.json();
    return ctx.render({ info: data.info, results: data.results });
  },
};

const Home = (props: PageProps<any>) => {
  const { results, characters, error } = props.data;

  return (
    <div class="container">
      <h1 class="title">Rick and Morty Characters</h1>
      <form method="POST" class="search-form">
        <input class="search-input" name="name" placeholder="Nombre del personaje" />
        <button type="submit" class="button">Buscar</button>
      </form>

      {error && <p class="error">{error}</p>}

      <CharactersComp results={characters ?? results} />
    </div>
  );
};

export default Home;
