import axios from "axios";

const instance = axios.create({
  baseURL: "https://649d9baf9bac4a8e669e0503.mockapi.io/mangos",
  headers: { "content-type": "application/json" },
});

export default instance;
