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
// import mongoose from 'mongoose';
// import ODCHistory from './server/models/history.model.server';

import {Provider} from 'react-redux';
import $ from 'jquery';
import App from './components/app';
const interfaceObjects = {};

$.when(
  // Get ODC History
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/odchistory", function(odchistory) {
    interfaceObjects.odchistory = odchistory;
  }),

  // Get polls
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/poll", function(poll) {
    interfaceObjects.poll = poll;
  }),

	// Get events
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/allevents", function(events) {
    interfaceObjects.events = events;
  }),

	// Get inductionmaterial
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/quicklinks", function(quicklinks) {
    interfaceObjects.inductionMaterial = quicklinks;
  }),

	// Get mandatory trainings
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings", function(mandatorytrainings) {
    interfaceObjects.mandatoryTrainings = mandatorytrainings;
  }),

	// Get gallery images
  $.get("http://dev-sandbox-lx61.amdc.mckinsey.com:4000/gallery", function(gallery) {
    interfaceObjects.gallery = gallery;
  }),
).then(function() {
		const initialState = {
		  histories: interfaceObjects.odchistory,
			events: interfaceObjects.events.reverse(),
      poll: interfaceObjects.poll,
      quicklinks: interfaceObjects.inductionMaterial,
      mandatorytrainings: interfaceObjects.mandatoryTrainings,
      gallery: interfaceObjects.gallery
		};

		const store=configureStore(initialState);

		ReactDOM.render(
			<Provider store={store}>
		  	<Router history={browserHistory} routes={routes} />
			</Provider>, document.getElementById('app'));

});
