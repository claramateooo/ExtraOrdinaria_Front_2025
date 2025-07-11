import { useSignal } from "@preact/signals";
import { Handlers } from "$fresh/server.ts";
import { FreshContext, PageProps } from "$fresh/src/server/mod.ts";
import { deleteCookie, setCookie, getCookies } from "https://deno.land/std/http/cookie.ts";
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { Character } from "../../types.ts";
import CharacterItem from "../../components/CharacterItem.tsx";


export const handler:Handlers={
    GET: async(req:Request,ctx:FreshContext)=>{
        const {id}=ctx.params;
      const response=await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if(response.status!==200){
        return new Response("Error Fetch");
      }
      const data: Character= await response.json();
        return ctx.render(data);
    },
    
}

const Home=(props:PageProps<Character>)=>{
  const {id,name,image,status,species,origin,location,gender}= props.data;
    return(
        <div>
      <CharacterItem id={id} name={name} image={image} status={status} species={species} origin={origin} location={location} gender={gender}/>
         </div>
    )
}
export default Home;