import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import useReduction from './useReduction';

export interface Settings {
  sessionToken?: string;
}

export interface SettingsProviderProps {
  lsKey: string;

  settings?: Settings;
  children?: React.ReactNode;
}

export interface SettingsContextProps extends Settings {
  initialized: boolean;

  update: (updates: Partial<Settings>) => void;
  useDefaults: () => void;
  useSaved: () => void;
}

export const DefaultSettings: Settings = {
  sessionToken: '',
};

const SettingsContext = createContext<SettingsContextProps>({
  ...DefaultSettings,
  initialized: false,

  update: () => {},
  useDefaults: () => {},
  useSaved: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({
  children,
  lsKey: _lsKey,
  settings: _settings = DefaultSettings,
}: SettingsProviderProps) {
  const memoizedSettings = useMemo(() => _settings, [_settings]);
  const lsKey = useMemo(() => _lsKey, [_lsKey]);

  const [settingsState, setSettingsState] =
    useReduction<Settings>(memoizedSettings);
  const [initialized, setInitialized] = useState(false);

  const setSettings = useCallback(
    (settings: Partial<Settings>) =>
      setSettingsState({ ...DefaultSettings, ...settings }),
    [setSettingsState]
  );

  const getValidSettings = (settings?: Settings): Settings => {
    if (!settings) {
      return DefaultSettings;
    }

    return { ...DefaultSettings, ...settings };
  };

  const getSavedSettings = useCallback((): Settings => {
    const savedSettings = window.localStorage.getItem(lsKey);

    return getValidSettings(JSON.parse(savedSettings ?? '{}'));
  }, [lsKey]);

  const _persist = (settings: Settings) => {
    window.localStorage.setItem(lsKey, JSON.stringify(settings));
  };

  const update = useCallback(
    (updates: Partial<Settings>, persist: boolean = false) =>
      setSettings({
        ...settingsState,
        ...updates,
      }),
    [settingsState, setSettings]
  );

  const useDefaults = useCallback(
    () => setSettings(DefaultSettings),
    [setSettings]
  );

  const useSaved = useCallback(
    () => setSettings(getSavedSettings()),
    [setSettings, getSavedSettings]
  );

  useEffect(() => {
    setSettingsState(getSavedSettings());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized && window) {
      _persist(settingsState);
    }
  }, [initialized, lsKey, settingsState]);

  return (
    <SettingsContext.Provider
      value={{
        ...settingsState,

        initialized,

        update,
        useDefaults,
        useSaved,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default useSettings;
