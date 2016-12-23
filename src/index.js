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

  // Get polls

  $.get(env[init.env()].polls, function(poll) {
    interfaceObjects.poll = poll;
  }),

	// Get mandatory trainings
  $.get(env[init.env()].mandatorytrainings, function(mandatorytrainings) {
    interfaceObjects.mandatoryTrainings = mandatorytrainings;
  }),

	// Get gallery images
  $.get(env[init.env()].gallery, function(gallery) {
    interfaceObjects.gallery = gallery;
  }),


)
.then(function() {
  if(isAdmin)
  {
	const initialState = {
		histories: [],
		events: [],
    poll: interfaceObjects.poll.reverse(),
    induction: {quicklinks:[],downloads:[]},
    mandatorytrainings: interfaceObjects.mandatoryTrainings.reverse(),
    gallery: interfaceObjects.gallery.reverse(),
    logs: [],
    successstories: [],
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
