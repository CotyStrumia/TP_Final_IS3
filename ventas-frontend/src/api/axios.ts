import axios from "axios";

let runtimeURL = "";

// Cargamos config.json en runtime
async function loadConfig() {
  try {
    const res = await fetch("/config.json", { cache: "no-store" });
    const json = await res.json();
    runtimeURL = json.api_url || "";
  } catch (err) {
    console.warn("No se pudo cargar config.json, usando fallback.");
  }
}
await loadConfig();

const apiURL =
  runtimeURL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";

console.log("API URL usada:", apiURL);

const api = axios.create({ baseURL: apiURL });

// Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers = config.headers || {};
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
