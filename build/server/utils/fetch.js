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

var getUberPrices = exports.getUberPrices = function getUberPrices(req) {
  return new _promise2.default(function (resolve, reject) {
    var _req$body = req.body,
        start_lat = _req$body.start_lat,
        start_lng = _req$body.start_lng,
        end_lat = _req$body.end_lat,
        end_lng = _req$body.end_lng;


    uber.estimates.getPriceForRouteAsync(start_lat, start_lng, end_lat, end_lng).then(function (response) {
      return resolve(response);
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
      return resolve(data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};