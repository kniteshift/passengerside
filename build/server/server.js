'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _fetch = require('./utils/fetch');

var _key = require('./config/key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

app.post('/fetch', function (req, res, next) {
  var fetchPrices = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
      var uber, lyft;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch.getUberPrices)(req);

            case 2:
              uber = _context.sent;
              _context.next = 5;
              return (0, _fetch.getLyftPrices)(req);

            case 5:
              lyft = _context.sent;
              return _context.abrupt('return', {
                uber: uber,
                lyft: lyft
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function fetchPrices(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  fetchPrices(req, res).then(function (prices) {
    return res.status(200).send(prices);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
});

// WEBPACK
function normalizeAssets(assets) {
  return Array.isArray(assets) ? assets : [assets];
}

var compiler = (0, _webpack2.default)(_webpack4.default);

app.use((0, _webpackDevMiddleware2.default)(compiler, {
  stats: {
    color: true
  },
  serverSideRender: true
}));

app.use(function (req, res) {
  var assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  res.send('\n        <html lang="en">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <title>Passenger Side</title>\n                <!-- Import Google Icon Font -->\n            <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n            <script src="https://use.typekit.net/oil6vvx.js"></script>\n            <script>try{Typekit.load({ async: true });}catch(e){}</script>\n            <!-- Import materialize.css -->\n            ' + normalizeAssets(assetsByChunkName.main).filter(function (path) {
    return path.endsWith('.css');
  }).map(function (path) {
    return '<link rel="stylesheet" href="' + path + '" />';
  }).join('\n') + '\n        </head>\n        <body>\n            <div id="root"></div>\n            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=' + (_key.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY) + '&libraries=places"></script>\n                ' + normalizeAssets(assetsByChunkName.main).filter(function (path) {
    return path.endsWith('.js');
  }).map(function (path) {
    return '<script src="' + path + '"></script>';
  }).join('\n') + '\n        </body>\n        </html>\n    ');
});

app.listen(PORT, function () {
  console.log('Listening on port: ' + PORT);
});

exports.default = app;