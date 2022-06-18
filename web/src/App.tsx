import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import PlayPodcastPage from './pages/PlayPodcastPage';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/podcasts/:podcastId">
          <PlayPodcastPage />
        </Route>

        <Route path="*">
          <Redirect from="/" to="home" />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
