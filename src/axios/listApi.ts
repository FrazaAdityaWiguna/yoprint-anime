import { AnimeType } from "../type/typeApi"
import axiosConfig from "./axiosConfig"

const API_V4 = "v4"

const config = {
  anime: `${API_V4}`
}

const animeConfig = {
  async getAnimeSearch(params: AnimeType) {
    return axiosConfig.get(`${config.anime}/anime`, { params })
  },

  async getAnimeById(id: string) {
    return axiosConfig.get(`${config.anime}/anime/${id}`)
  },
}

const listApi = {
  anime: animeConfig
}

export default listApi