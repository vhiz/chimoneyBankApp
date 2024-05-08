import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://api-v2-sandbox.chimoney.io/v0.2",
//   withCredentials: true,
  headers: {
    "X-API-KEY":
      "3df3f8fe47c9787203e20b725951e2039b965b45e3de3d23f99f9a838019ecee",
  },
});

export default apiRequest;
