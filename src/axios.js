import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://api-v2-sandbox.chimoney.io/v0.2",
//   withCredentials: true,
  headers: {
    "X-API-KEY":
      "e34cfb57a80a13f02b8da302cd0c68145a8b894295c35406a8bebd3516d38ba6",
  },
});

export default apiRequest;
