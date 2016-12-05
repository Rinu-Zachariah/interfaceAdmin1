import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import mongoose from 'mongoose';
import configure from '../config';
import init from './init';
import $ from 'jquery';

/* eslint-disable no-console */
let port;
process.env.NODE_ENV = init.env()

if(init.env().toString() == 'production'){
  port = 3030;
}
else {
 port = 6002;
}
const app = express();
const compiler = webpack(config);



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


  app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
  });




mongoose.connect(configure.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
