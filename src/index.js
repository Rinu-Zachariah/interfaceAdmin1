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
  // Get ODC History

  $.get(env[init.env()].history, function(odchistory) {
    interfaceObjects.odchistory = odchistory;
  }),

  // Get polls

  $.get(env[init.env()].polls, function(poll) {
    interfaceObjects.poll = poll;
  }),

	// Get events

  $.get(env[init.env()].allevents, function(events) {
    interfaceObjects.events = events;
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
  // Get DownloadsList
  $.get(env[init.env()].downloads, function(downloads) {
    interfaceObjects.downloads = downloads;
  }),
  //Get All Admins
  $.get(env[init.env()].admins, function(admins) {
    interfaceObjects.admins = admins;
  })

)
.then(function() {
	const initialState = {
		histories: interfaceObjects.odchistory,
		events: interfaceObjects.events.reverse(),
    poll: interfaceObjects.poll.reverse(),
    quicklinks: interfaceObjects.inductionMaterial.reverse(),
    mandatorytrainings: interfaceObjects.mandatoryTrainings.reverse(),
    gallery: interfaceObjects.gallery.reverse(),
    logs: interfaceObjects.logs.reverse(),
    downloads: interfaceObjects.downloads,
    admins: interfaceObjects.admins.reverse()
	};

	const store=configureStore(initialState);

if(isAdmin)
{
  ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
    </Provider>, document.getElementById('app'));
}
else {
    ReactDOM.render(<Error/>, document.getElementById('app'));
}


});
