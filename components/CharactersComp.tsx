import { FunctionComponent } from "preact";
import { Character } from "../types.ts";

export type DataProps={
  info?:{
    pages:number;
  },
  results:Character[];
}
const Characters: FunctionComponent<DataProps>=({results})=>{
    return(
        <div>
           <div class="characters">
            {results && results.map((r)=>(
                <a key={r.id} class="character-card" href={`/character/${r.id}`} >
                <img src={r.image} alt={r.name}/>
                <p>{r.name}</p>
              </a>
            ))}
           </div>
             <div class="pagination">
           </div>
        </div>
    )
}
export default Characters;