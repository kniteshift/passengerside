import axios from 'axios'
import Uber from 'node-uber'
import { uber_cred, lyft_cred } from '../config/key'

const uber = new Uber({
  client_id: uber_cred.client_id || process.env.UBER_CLIENTID,
  client_secret: uber_cred.client_secret || process.env.UBER_CLEINTSECRET,
  server_token: uber_cred.server_token || process.env.UBER_SERVERTOKEN,
  name: 'passanger-side'
});

let Category = function(name, low, high) {
  this.name = name
  this.low = low
  this.high = high
  this.range = `$${this.low} - $${this.high}`
}

export const getUberPrices = (req) => {
  return new Promise((resolve, reject) => {
    const {
      start_lat,
      start_lng,
      end_lat,
      end_lng
    } = req.body

    uber.estimates.getPriceForRouteAsync(start_lat, start_lng, end_lat, end_lng)
      .then(response => {
        const { prices } = response
        
        const products = prices.map(product => {
          let { display_name, low_estimate, high_estimate } = product
          let category = new Category(display_name, low_estimate, high_estimate)

          return category
        })

        let services = products.filter(product => {
          if (product.name !== "TAXI") {
            return product
          }
        })

        services = services.sort((a, b) => {
          return a.low - b.low
        })

        resolve(services)
      })
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
      .then(({ data }) => {
        const { cost_estimates } = data

        let products = cost_estimates.map(product => {
          let { display_name, estimated_cost_cents_min, estimated_cost_cents_max } = product
          let min = Math.round(estimated_cost_cents_min/100),
          max = Math.round(estimated_cost_cents_max/100)

          let category = new Category(display_name, min, max)

          return category
        })

        products = products.sort((a, b) => {
          return a.low - b.low
        })

        resolve(products)
      })
      .catch(err => reject(err))
  })

}
