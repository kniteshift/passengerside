import axios from 'axios'
import Uber from 'node-uber'
import { uber_cred, lyft_cred } from '../config/key'

const uber = new Uber({
  client_id: uber_cred.client_id || process.env.UBER_CLIENTID,
  client_secret: uber_cred.client_secret || process.env.UBER_CLEINTSECRET,
  server_token: uber_cred.server_token || process.env.UBER_SERVERTOKEN,
  name: 'passanger-side'
});

export const getUberPrices = (req, res) => {
  let data = null
  const UBER_API = `https://api.uber.com/v1.2/estimates/price?start_latitude=${req.query.s_lat}&start_longitude=${req.query.s_lng}&end_latitude=${req.query.e_lat}&end_longitude=${req.query.e_lng}`

  // Saving this for refactoring
  // const {
  //   start_lat,
  //   start_lng,
  //   end_lat,
  //   end_lng
  // } = req.body

  uber.estimates.getPriceForRouteAsync(req.query.s_lat, req.query.s_lng, req.query.e_lat, req.query.e_lng)
    .then(response => { data = response })
    .catch(err => { data = err })
  
  return data
}

export const getLyftPrices = (req, res) => {
  let data = null
  const headers = { Authorization: `Bearer ${lyft_cred.client_token || process.env.lyft_token}`}

  
  axios({
    headers,
    method: 'get',
    url: `https://api.lyft.com/v1/cost?start_lat=${req.query.s_lat}&start_lng=${req.query.s_lng}&end_lat=${req.query.e_lat}&end_lng=${req.query.e_lng}`
  })
    .then(response => { data = response })
    .catch(err => { data = err })

  return data
}
