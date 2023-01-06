import React, {useEffect, useState, useContext} from 'react';
import Routes from './components/Routes/Routes';
import {ThemeContext} from './components/Context/GlobalState';
import {CustomDarkTheme, CustomDefaultTheme} from './components/Theme/Theme';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckNet from './components/CheckNet';
import {isReadyRef, navigationRef} from './RootNavigation';

const App = () => {
  const Theme = useContext(ThemeContext);
  const [routeName, setRouteName] = useState('');
  const [isOffline, setOfflineStatus] = useState(false);
  const [isConnected, setIsConnected] = useState();
  const Ref = createNavigationContainerRef();
  const net = useNetInfo();

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, [isOffline]);

  useEffect(() => {
    const setPage = async () => {
      AsyncStorage.removeItem('currentPage');
      const currentPage = JSON.stringify(routeName);
      await AsyncStorage.setItem('currentPage', currentPage);
    };
    setPage();
  }, [routeName]);

  return (
    <>
      {isOffline || !net.isConnected ? (
        <CheckNet isOffline={isOffline} />
      ) : (
        <PaperProvider
          theme={Theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
          <NavigationContainer
            theme={Theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
              setRouteName(Ref.getCurrentRoute().name);
            }}
            onStateChange={async () => {
              const previousRouteName = routeName;
              const currentRouteName = navigationRef.getCurrentRoute().name;
              console.log('route', currentRouteName);
              setRouteName(currentRouteName);
            }}>
            <Routes />
          </NavigationContainer>
        </PaperProvider>
      )}
    </>
  );
};

export default App;
