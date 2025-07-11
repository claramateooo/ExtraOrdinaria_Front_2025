export type Character = {
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
};
export type ApiData={
  info?:{
    pages:number;
  }
  results:Character[];
}