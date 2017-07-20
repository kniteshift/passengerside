import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config'
import { getLyftPrices, getUberPrices } from './utils/fetch'
import { GOOGLE_API_KEY } from './config/key'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

app.post('/fetch', (req, res, next) => {
  async function fetchPrices(req, res) {
    const uber = await getUberPrices(req)
    const lyft = await getLyftPrices(req)

    return {
      uber: uber,
      lyft: lyft
    }
  }

  fetchPrices(req, res).then(prices => res.status(200).send(prices))
})

// WEBPACK
function normalizeAssets(assets) {
  return Array.isArray(assets) ? assets : [assets]
}

const compiler = webpack(webpackConfig)
app.use(webpackMiddleware(compiler, {
  stats: {
    color: true
  },
  serverSideRender: true
}))
app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Passenger Side</title>
                <!-- Import Google Icon Font -->
            <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <!-- Import materialize.css -->
            ${
          normalizeAssets(assetsByChunkName.main)
          .filter(path => path.endsWith('.css'))
          .map(path => `<link rel="stylesheet" href="${path}" />`)
          .join('\n')
        }
        </head>
        <body>
            <div id="root"></div>
            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY || process.env.GOOGLE_API_KEY}&libraries=places"></script>
                ${
                  normalizeAssets(assetsByChunkName.main)
                  .filter(path => path.endsWith('.js'))
                  .map(path => `<script src="${path}"></script>`)
                  .join('\n')
                }
        </body>
        </html>
    `)
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

export default app