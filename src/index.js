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
const interfaceObjects = {};

$.when(
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
)
.then(function() {
		const initialState = {
		  histories: interfaceObjects.odchistory,
			events: interfaceObjects.events.reverse(),
      poll: interfaceObjects.poll.reverse(),
      quicklinks: interfaceObjects.inductionMaterial.reverse(),
      mandatorytrainings: interfaceObjects.mandatoryTrainings.reverse(),
      gallery: interfaceObjects.gallery.reverse()
		};

		const store=configureStore(initialState);

		ReactDOM.render(
			<Provider store={store}>
		  	<Router history={browserHistory} routes={routes} />
			</Provider>, document.getElementById('app'));

});
