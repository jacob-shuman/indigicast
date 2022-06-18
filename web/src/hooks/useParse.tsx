import React, { useEffect, useState } from 'react';
import * as Parse from 'parse';
import useInterval from '@use-it/interval';
import useSettings from './useSettings';

interface ParseContextProps {
  initialized: boolean;
  connected: boolean;
  client: any;
  authenticated: boolean;

  login: (username: string, password: string) => Promise<Parse.User>;
  logout: () => Promise<Parse.User>;

  error?: string;
}

const ParseContext = React.createContext<ParseContextProps>({
  initialized: false,
  connected: false,
  client: {},
  authenticated: false,

  login: async () => ({} as unknown as Parse.User),
  logout: async () => ({} as unknown as Parse.User),
});

interface ParseProviderProps {
  children: React.ReactNode;
}

// TODO: move post and topic syncing to their own hooks
export const ParseProvider = ({ children }: ParseProviderProps) => {
  const [initialized, setInitialized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState<any>();
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState();
  const settings = useSettings();

  const refreshAuthenticated = () => {
    setAuthenticated(Boolean(Parse.User.current()));
  };

  useInterval(() => refreshAuthenticated(), 1000 * 10);

  useEffect(() => {
    if (initialized) {
      refreshAuthenticated();
    }
  }, [initialized]);

  const login = async (username: string, password: string) => {
    const user = await Parse.User.logIn(username, password);
    const sessionToken = user.getSessionToken();

    if (sessionToken) {
      settings.update({ sessionToken });
    }

    return user;
  };

  const sessionLogin = async () => {
    if (
      settings.sessionToken &&
      settings.sessionToken.length > 0 &&
      !authenticated
    ) {
      try {
        await Parse.User.become(settings.sessionToken);
        refreshAuthenticated();
      } catch (err) {
        settings.update({ sessionToken: '' });
      }
    }
  };

  const logout = async () => {
    const user = await Parse.User.logOut();

    settings.update({ sessionToken: '' });

    return user;
  };

  const initializeServer = async () => {
    //Load env variables into constants
    const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
    const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
    const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;

    Parse.initialize(PARSE_APPLICATION_ID ?? '', PARSE_JAVASCRIPT_KEY);

    // @ts-ignore
    Parse.serverURL = PARSE_HOST_URL ?? '';

    Parse.enableLocalDatastore();

    //@ts-ignore
    let client = new Parse.LiveQueryClient({
      applicationId: PARSE_APPLICATION_ID,
      serverURL: process.env.REACT_APP_LIVE_QUERY_URL,
      javascriptKey: PARSE_JAVASCRIPT_KEY,
    });

    client.open();

    client.on('open', async () => {
      setConnected(true);
    });

    client.on('error', (error: any) => {
      console.error('A live query client error has occurred', error);
      setConnected(false);
      setError(error);
    });

    setInitialized(true);
    setClient(client);
  };

  useEffect(() => {
    initializeServer();
  }, []);

  useEffect(() => {
    sessionLogin();
  }, [settings.initialized]);

  return (
    <ParseContext.Provider
      value={{
        initialized,
        connected,
        client,
        authenticated,

        login,
        logout,

        error,
      }}
    >
      {children}
    </ParseContext.Provider>
  );
};

export const useParse = () => React.useContext(ParseContext);

export default useParse;
