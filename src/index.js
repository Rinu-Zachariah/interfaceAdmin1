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
import init from '../tools/init';

// import mongoose from 'mongoose';
// import ODCHistory from './server/models/history.model.server';

import {Provider} from 'react-redux';
import $ from 'jquery';
import App from './components/app';
const interfaceObjects = {};
let History, Polls, Events, Quicklinks, Mandatorytrainings, Gallery = "";

if(init.env().toString() == "development")
{
  History = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/odchistory";
  Polls = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/poll";
  Events = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/allevents";
  Quicklinks = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/quicklinks" ;
  Mandatorytrainings = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings";
  Gallery = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/gallery";

}
else if(init.env().toString() == "production")
{
  History = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/odchistory";
  Polls = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/poll";
  Events = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/allevents";
  Quicklinks = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/quicklinks" ;
  Mandatorytrainings = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/mandatorytrainings";
  Gallery = "http://dev-sandbox-lx61.amdc.mckinsey.com:4000/gallery";

}
else{
  History = "http://localhost:4000/odchistory";
  Polls = "http://localhost:4000/poll";
  Events = "http://localhost:/allevents";
  Quicklinks = "http://localhost:4000/quicklinks" ;
  Mandatorytrainings = "http://localhost:4000/mandatorytrainings";
  Gallery = "http://localhost:4000/gallery";

}

$.when(
  // Get ODC History

  $.get(History, function(odchistory) {
    interfaceObjects.odchistory = odchistory;
  }),

  // Get polls

  $.get(Polls, function(poll) {
    interfaceObjects.poll = poll;
  }),

	// Get events

  $.get(Events, function(events) {
    interfaceObjects.events = events;
  }),

	// Get inductionmaterial

  $.get(Quicklinks, function(quicklinks) {
    interfaceObjects.inductionMaterial = quicklinks;
  }),

	// Get mandatory trainings
  $.get(Mandatorytrainings, function(mandatorytrainings) {
    interfaceObjects.mandatoryTrainings = mandatorytrainings;
  }),

	// Get gallery images
  $.get(Gallery, function(gallery) {
    interfaceObjects.gallery = gallery;
  }),
)
.then(function() {
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
