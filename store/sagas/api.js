import axios from 'axios'
import { link, keys } from "../../constants/index";

function* getAddreesFromGeo (latlng) {
  const response = yield axios.get(link.link.geocoding, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      latlng: latlng,
      key: keys.key.geocoding
    }
  }).then(({ data }) => data)

  const info = response && response.status === 'OK' ? response.results : []

  return info
}

export const api = { getAddreesFromGeo }