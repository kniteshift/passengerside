import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack.config.js'
import { getLyftPrices, getUberPrices } from './utils/fetch'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())

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
            <link href="//cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
            ${
          normalizeAssets(assetsByChunkName.main)
          .filter(path => path.endsWith('.css'))
          .map(path => `<link rel="stylesheet" href="${path}" />`)
          .join('\n')
        }
        </head>
        <body>
            <div id="root"></div>
                ${
                        normalizeAssets(assetsByChunkName.main)
                        .filter(path => path.endsWith('.js'))
                        .map(path => `<script src="${path}"></script>`)
                        .join('\n')
                    }
            <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
        </body>
        </html>
    `)
})

app.get('/fetch', (req, res, next) => {
  async function getPrices(req, res) {
    let prices = {
      uber: null,
      lyft: null
    }

    obj.uber = await getUberPrices(req, res)
    obj.lyft = await getLyftPrices(req, res)

    return res.status(200).send(prices)
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})