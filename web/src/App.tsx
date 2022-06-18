import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import PlayPodcastPage from './pages/PlayPodcastPage';
import LoginPage from './pages/Login';
import { ParseProvider } from './hooks/useParse';

const App: React.FC = () => (
  <>
    <ParseProvider>
      <BrowserRouter>
        <Switch>        
          <Route path="/login">
            <LoginPage />
          </Route>
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
    </ParseProvider>
  </>
);

export default App;
