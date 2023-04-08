import axios from "axios";

export default axios.create({
  baseURL: "https://api.portals.fi/v1/",
});
