import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/app';
import HomePage from './components/views/HomePage';
import EventPage from './components/views/Eventpage';
import PollPage from './components/views/PollPage';
import ODCHistory from './components/views/ODCHistory';
import InductionPage from './components/views/InductionPage';
import GalleryPage from './components/views/GalleryPage';
import TrainingsPage from './components/views/TrainingsPage';
import ContributorsPage from './components/views/ContributorsPage';
import SuccessStories from './components/views/SuccessStories';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="events" component={EventPage} />
    <Route path="polls" component={PollPage} />
    <Route path="odchistory" component={ODCHistory} />
    <Route path="induction" component={InductionPage} />
    <Route path="gallery" component={GalleryPage} />
    <Route path="trainings" component={TrainingsPage} />
    <Route path="contributors" component={ContributorsPage} />
    <Route path="successstories" component={SuccessStories}/>
  </Route>
);
