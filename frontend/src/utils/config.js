const api=import.meta.env.VITE_API_URL===undefined?'http://localhost:5000':import.meta.env.VITE_API_URL.replace(/\/$/,'');
export { api };
