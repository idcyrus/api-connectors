'use strict';

const _ = require('lodash');
const express = require('express');
const BitMEXClient = require('../../nodejs/index');
const debug = require('debug')('BitMEX:Delta-Server');

module.exports = function createServer(config) {
  const app = initServer(config);
  initWSClient(app, config);
  return app;
};

function initServer(config) {
  const app = express();

  app.set('view engine', 'ejs');

  if (debug.enabled) {
    app.use(function(req, res, next) {
      debug('Got request at %s', req.url);
      next();
    });
  }

  app.get('/', function(req, res) {
    res.render('index', {
      tables: config.streams,
      symbols: config.symbols,
      noSymbolTables: BitMEXClient.noSymbolTables
    });
  });

  app.listen(config.port, function() {
    console.log('BitMEX-Delta-Server listening on http://localhost:' + config.port);
  });

  return app;
}

function initWSClient(app, config) {
  const client = new BitMEXClient(_.pick(config, 'testnet', 'endpoint', 'apiKeyID', 'apiKeySecret'));

  client.on('error', function(error) {
    console.error("Caught Websocket error:", error);
  });

  config.symbols.forEach(function(symbol) {
    config.streams.forEach(function(streamName) {
      client.addStream(symbol, streamName, function(data, symbol, tableName) {
        debug('Got new data on %s:%s - %j', tableName, symbol, data);
      });
    });
  });

  app.get('/:stream', function(req, res) {
    const symbol = req.query.symbol, stream = req.params.stream;
    if (symbol && config.symbols.indexOf(symbol) === -1) {
      return res.send(404, 'Symbol "' + symbol +'" not found. Did you subscribe to it?');
    }
    if (config.streams.indexOf(stream) === -1) {
      return res.send(404, 'Stream "' + stream +'" not found. Did you subscribe to it?');
    }
    const data = symbol ? client.getData(symbol, stream) : client.getTable(stream);
    res.json(data);
  });
}
