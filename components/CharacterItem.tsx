import { FunctionComponent } from "preact";

export type DataProps={
    id:number;
  name:string;
  status:string;
  species:string;
  gender:string;
  origin:{
    name:string;
  },
  location:{
    name:string;
  },
  image:string;
}
const Button: FunctionComponent<DataProps>=({id,name,status,species,origin,location,image,gender})=>{
   
    return(
        <div>
        <div class="container">
        <a href="/" class="back-link" data-ancestor="true" aria-current="true">Volver</a>
        <div class="character-detail">
        <img src={image} alt={name} width="200"/>
        <div class="character-info">
            <h1 class="title">{name}</h1>
            <ul>
                <li><strong>Status:</strong>{status} </li>
                <li><strong>Species:</strong>{species}</li>
                <li><strong>Gender:</strong>{gender}</li>
                <li><strong>Origin:</strong> {origin.name}</li>
                <li><strong>Location:</strong> {location.name}</li>
                </ul></div>
                </div>
         </div>
        </div>
    )
}
export default Button;