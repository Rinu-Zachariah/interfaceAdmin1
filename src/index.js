import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import env from './environment';
import init from '../tools/init';

import {Provider} from 'react-redux';
import $ from 'jquery';
import App from './components/app';
import Error from './error';
import _ from 'lodash';

const interfaceObjects = {};
let isAdmin = false;
let admins = [];

$.when(
  $.ajax({
          url: env[init.env()].admins,
          method: 'GET',
          dataType: 'JSON',
          success: function(response) {
              admins = response;
          }
      }),
  $.ajax({
          url: 'http://home.intranet.mckinsey.com/ksapi/person/current_user?callback=JSON_CALLBACK',
          method: 'GET',
          dataType: 'JSONP',
          success: function(response) {
            if(_.includes(admins,(_.find(admins, {"fmno" : response.fmno}))))
            {
                isAdmin = true;
            }
          }
      }),


	// Get logs
  $.get(env[init.env()].logs, function(logs) {
    interfaceObjects.logs = logs;
  }),


  // Get DownloadsList
  $.get(env[init.env()].downloads, function(downloads) {
    interfaceObjects.downloads = downloads;
  })

)
.then(function() {
  if(isAdmin)
  {
	const initialState = {
		histories: [],
		events: [],
    induction: {quicklinks:[],downloads:[]},
    logs: [],
    successstories: [],
    poll: [],
    mandatorytrainings: [],
    gallery: [],
    downloads: interfaceObjects.downloads,
    admins: []
	};

	const store=configureStore(initialState);
  console.log(store.getState());


  ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));
}
else {
    ReactDOM.render(<Error/>, document.getElementById('app'));
}


});
