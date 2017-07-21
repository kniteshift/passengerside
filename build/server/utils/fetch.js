'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLyftPrices = exports.getUberPrices = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _nodeUber = require('node-uber');

var _nodeUber2 = _interopRequireDefault(_nodeUber);

var _key = require('../config/key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uber = new _nodeUber2.default({
  client_id: _key.uber_cred.client_id || process.env.UBER_CLIENTID,
  client_secret: _key.uber_cred.client_secret || process.env.UBER_CLEINTSECRET,
  server_token: _key.uber_cred.server_token || process.env.UBER_SERVERTOKEN,
  name: 'passanger-side'
});

var Category = function Category(name, low, high) {
  this.name = name;
  this.low = low;
  this.high = high;
  this.range = '$' + this.low + ' - $' + this.high;
};

var getUberPrices = exports.getUberPrices = function getUberPrices(req) {
  return new _promise2.default(function (resolve, reject) {
    var _req$body = req.body,
        start_lat = _req$body.start_lat,
        start_lng = _req$body.start_lng,
        end_lat = _req$body.end_lat,
        end_lng = _req$body.end_lng;


    uber.estimates.getPriceForRouteAsync(start_lat, start_lng, end_lat, end_lng).then(function (response) {
      var prices = response.prices;


      var products = prices.map(function (product) {
        var display_name = product.display_name,
            low_estimate = product.low_estimate,
            high_estimate = product.high_estimate;

        var category = new Category(display_name, low_estimate, high_estimate);

        return category;
      });

      var services = products.filter(function (product) {
        if (product.name !== "TAXI") {
          return product;
        }
      });

      services = services.sort(function (a, b) {
        return a.low - b.low;
      });

      resolve(services);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var getLyftPrices = exports.getLyftPrices = function getLyftPrices(req) {
  return new _promise2.default(function (resolve, reject) {
    var headers = { Authorization: 'Bearer ' + (_key.lyft_cred.client_token || process.env.lyft_token) };

    var _req$body2 = req.body,
        start_lat = _req$body2.start_lat,
        start_lng = _req$body2.start_lng,
        end_lat = _req$body2.end_lat,
        end_lng = _req$body2.end_lng;


    (0, _axios2.default)({
      headers: headers,
      method: 'get',
      url: 'https://api.lyft.com/v1/cost?start_lat=' + start_lat + '&start_lng=' + start_lng + '&end_lat=' + end_lat + '&end_lng=' + end_lng
    }).then(function (_ref) {
      var data = _ref.data;
      var cost_estimates = data.cost_estimates;


      var products = cost_estimates.map(function (product) {
        var display_name = product.display_name,
            estimated_cost_cents_min = product.estimated_cost_cents_min,
            estimated_cost_cents_max = product.estimated_cost_cents_max;

        var min = Math.round(estimated_cost_cents_min / 100),
            max = Math.round(estimated_cost_cents_max / 100);

        var category = new Category(display_name, min, max);

        return category;
      });

      products = products.sort(function (a, b) {
        return a.low - b.low;
      });

      resolve(products);
    }).catch(function (err) {
      return reject(err);
    });
  });
};