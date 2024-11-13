import axios from "axios";

function adapter(baseURL: any){
  return axios.create({
    baseURL: baseURL,
  });
}

export default adapter;