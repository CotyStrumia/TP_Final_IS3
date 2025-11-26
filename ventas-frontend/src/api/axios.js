import axios from "axios";
let apiInstance = null;
let loadingPromise = null;
// Cargar config.json una sola vez
async function loadConfigJson() {
    try {
        const res = await fetch("/config.json", { cache: "no-store" });
        const json = await res.json();
        return json.api_url || null;
    }
    catch (err) {
        console.warn("No se pudo cargar config.json, usando fallback.");
        return null;
    }
}
// Inicializar Axios (solo una vez)
async function init() {
    if (apiInstance)
        return; // ya inicializado
    const runtimeURL = await loadConfigJson();
    const finalURL = runtimeURL ||
        import.meta.env.VITE_API_URL ||
        "http://localhost:8080";
    console.log("API URL usada:", finalURL);
    apiInstance = axios.create({
        baseURL: finalURL,
    });
    apiInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        config.headers = config.headers || {};
        if (token)
            config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    });
}
// API que devuelve SIEMPRE un AxiosInstance válido
async function getAPI() {
    if (!loadingPromise && !apiInstance) {
        loadingPromise = init();
    }
    if (loadingPromise) {
        await loadingPromise;
        loadingPromise = null;
    }
    return apiInstance;
}
export default getAPI;
