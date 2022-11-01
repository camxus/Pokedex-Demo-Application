import axios from "axios"
import { axiosInstance } from "@src/hooks/useAxiosInstance"

export const getAllPokemon = ({offset = 0, limit = 20}: {offset?: number, limit?: number}) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const {data} = await axiosInstance.get("/pokemon", {params: { offset, limit }})
            resolve(data)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getPokemonOffset = () => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const {data} = await axiosInstance.get("/pokemon")
            resolve(data)
        }
        catch (e) {
            reject(e)
        }
    })
}

export const getPokemon = ({url}: {url: string}) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const {data} = await axios.get(url)
            resolve(data)
        }
        catch (e) {
            reject(e)
        }
    })
}
