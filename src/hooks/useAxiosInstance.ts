import axios from "axios"

// Next we make an 'instance' of axios
export const axiosInstance = axios.create({
  // .. where we make our configurations
  // ** baseURL for pokeapi
  baseURL: "https://pokeapi.co/api/v2/"
})

// ** intercept the axiosInstance for all requests or responses before they are handled by then or catch.
axiosInstance.interceptors.request.use(
  async (config) => {
    // ** If token is present add it to request's Authorization Header
    return config
  },
  (error) => Promise.reject(error)
)
// Also add/ configure interceptors && all the other cool stuff
// axiosInstance.defaults.headers.common["Content-type"] = "application/json"
// axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getUserData()?.signInUserSession.idToken.jwtToken}`
