import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

// import mongoose from 'mongoose';
// import ODCHistory from './server/models/history.model.server';

import {Provider} from 'react-redux';
import $ from 'jquery';
import App from './components/app';

const store=configureStore();

// let result = $.ajax({
// 				url: 'http://localhost:4000/customerQuotes',
// 				//'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/customerQuotes',
// 				data: null,
// 				type: 'GET',
// 				datatype: 'JSON',
// 				success: function(data){
// 					//console.log(data);
// 				},
// 				error: function(data){
// 					alert('error');
// 				}
// 			});


ReactDOM.render(
	<Provider store={store}>
  	<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app'));
