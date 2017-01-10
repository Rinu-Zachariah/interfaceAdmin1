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
let currentUser = "";

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
              currentUser = response.fmno;
          }
      }),

	// Get logs
  $.get(env[init.env()].logs, function(logs) {
    interfaceObjects.logs = logs;
  })

)
.then(function() {
  if(_.includes(admins,(_.find(admins, {"fmno" : currentUser}))))
  {
    console.log("isAdmin is true");
      isAdmin = true;
  }
  if(isAdmin)
  {
  	const initialState = {
  		histories: [],
  		events: [],
      induction: {quicklinks:[],downloads:[]},
      logs: interfaceObjects.logs,
      successstories: [],
      poll: [],
      mandatorytrainings: [],
      gallery: [],
      downloads: [],
      admins: []
  	};

  	const store=configureStore(initialState);


  ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));
}
else {
    ReactDOM.render(<Error/>, document.getElementById('app'));
}


});
