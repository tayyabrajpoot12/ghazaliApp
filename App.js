import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Routes from './components/Routes/Routes';
const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <>
      <Routes />
    </>
  );
};

export default App;
