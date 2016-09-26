import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import histories from './reducer/historyReducer';

// import mongoose from 'mongoose';
// import ODCHistory from './server/models/history.model.server';

import {Provider} from 'react-redux';
import $ from 'jquery';
import App from './components/app';

let result = $.ajax({
				url: 'http://localhost:4000/odchistory',
				//'http://dev-sandbox-lx61.amdc.mckinsey.com:4000/customerQuotes',
				data: null,
				type: 'GET',
				datatype: 'JSON',
				success: function(data){
						storeCreation(data);
				},
				error: function(data){
					alert('error');
				}
			});
console.log(result);

// let initialState1= histories: result;
// console.log(histories);

function storeCreation(data){
	const initialState1 = {
	  histories: data
	};

	const initialState = {
	  histories: [{id:123, text:'hello', completed: false}]

	};

	console.log(initialState1);
	console.log(initialState);

	const store=configureStore(initialState1);
	console.log(store);

	ReactDOM.render(
		<Provider store={store}>
	  	<Router history={browserHistory} routes={routes} />
		</Provider>, document.getElementById('app'));

};
