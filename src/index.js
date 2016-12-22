import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import histories from './reducer/historyReducer';
import events from './reducer/eventsReducer';
import gallery from './reducer/galleryReducer';
import poll from './reducer/pollReducer';
import successstories from './reducer/successReducer';
import quicklinks from './reducer/quicklinksReducer';
import mandatorytrainings from './reducer/mandatorytrainingsReducer';
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

	// Get inductionmaterial

  $.get(env[init.env()].quicklinks, function(quicklinks) {
    interfaceObjects.inductionMaterial = quicklinks;
  }),

	// Get mandatory trainings
  $.get(env[init.env()].mandatorytrainings, function(mandatorytrainings) {
    interfaceObjects.mandatoryTrainings = mandatorytrainings;
  }),

	// Get gallery images
  $.get(env[init.env()].gallery, function(gallery) {
    interfaceObjects.gallery = gallery;
  }),
  // Get logs
  $.get(env[init.env()].logs, function(logs) {
    interfaceObjects.logs = logs;
  }),


  // Get SuccessStories
  $.get(env[init.env()].successstories, function(successstories) {
    interfaceObjects.successstories = successstories;
  }),

  // Get DownloadsList
  $.get(env[init.env()].downloads, function(downloads) {
    interfaceObjects.downloads = downloads;
  }),

)
.then(function() {
  if(isAdmin)
  {
	const initialState = {
		histories: [],
		events: [],
    poll: interfaceObjects.poll.reverse(),
    quicklinks: interfaceObjects.inductionMaterial.reverse(),
    mandatorytrainings: interfaceObjects.mandatoryTrainings.reverse(),
    gallery: interfaceObjects.gallery.reverse(),
    logs: interfaceObjects.logs.reverse(),
    successstories: interfaceObjects.successstories.reverse(),
    downloads: interfaceObjects.downloads,
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
