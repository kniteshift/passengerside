import axios from 'axios'
import Uber from 'node-uber'
import { uber_cred, lyft_cred } from '../config/key'

const uber = new Uber({
  client_id: uber_cred.client_id || process.env.UBER_CLIENTID,
  client_secret: uber_cred.client_secret || process.env.UBER_CLEINTSECRET,
  server_token: uber_cred.server_token || process.env.UBER_SERVERTOKEN,
  name: 'passanger-side'
});

export const getUberPrices = (req) => {
  return new Promise((resolve, reject) => {
    const {
      start_lat,
      start_lng,
      end_lat,
      end_lng
    } = req.body

    uber.estimates.getPriceForRouteAsync(start_lat, start_lng, end_lat, end_lng)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}  

export const getLyftPrices = (req) => {
  return new Promise((resolve, reject) => {
    const headers = { Authorization: `Bearer ${lyft_cred.client_token || process.env.lyft_token}`}

    const {
      start_lat,
      start_lng,
      end_lat,
      end_lng
    } = req.body
    
    axios({
      headers,
      method: 'get',
      url: `https://api.lyft.com/v1/cost?start_lat=${start_lat}&start_lng=${start_lng}&end_lat=${end_lat}&end_lng=${end_lng}`
    })
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })

}
