import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://api-v2-sandbox.chimoney.io/v0.2",
//   withCredentials: true,
  headers: {
    "X-API-KEY":
      "7e06f006ae00b01a19f0c404ea50a835d20b848c520f55e2f1394383557a56e9",
  },
});

export default apiRequest;
