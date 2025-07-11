import { useEffect, useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { ApiData, Character } from "../types.ts";
import CharactersComp from "../components/CharactersComp.tsx";


const SearchCharacters: FunctionComponent=()=>{  
    const [charactersList,setCharactersList]= useState<Character[]>([]);
    const [characterName,setCharacterName]= useState<string>("");
    const [error,setError]= useState<string>("");
    useEffect(()=>{
       getCharacters();
    },[]);
    const getCharacters=async()=>{
     const response=await fetch("https://rickandmortyapi.com/api/character");
          if(response.status!==200){
            return new Response("Error Fetch");
          }
          const data: ApiData= await response.json();
          const characterss=data.results;
          if(!characterss){
            return;
          }
          setCharactersList(characterss);
    }
    const handleSubmit=(e:Event)=>{
        e.preventDefault();
        const encontradoss=charactersList.some((c)=>c.name===characterName);
        console.log(encontradoss);
       const encontrados= charactersList.filter((c)=>c.name===characterName);
       console.log(encontrados);
       if(!encontradoss){
        setError("No hay resultados.");
        return;
       }
       setCharactersList(encontrados);
    }
    return(
         <div>
         <div class="container">
          <h1 class="title">Rick and Morty Characters</h1>
          <form class="search-form" onSubmit={handleSubmit}>
          <input class="search-input" value={characterName} placeholder="Nombre del personaje" onInput={(e)=>setCharacterName(e.currentTarget.value)}/>
          <button type="submit" class="button">Buscar</button>
          </form>
          <CharactersComp results={charactersList}/>
          {error && <h1>{error}</h1>}
            </div>
          </div>
      
    )
}
export default SearchCharacters;