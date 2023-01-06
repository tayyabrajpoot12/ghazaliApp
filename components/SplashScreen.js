import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  const isUserLogin = async () => {
    const isUserActive = await AsyncStorage.getItem('LOGIN_USER');
    const jsonVal = JSON.parse(isUserActive);
    const IS_TOKEN = await AsyncStorage.getItem('IS_TOKEN');
    const jsonToken = JSON.parse(IS_TOKEN);
    if (jsonVal != null && jsonToken == null) {
      if (jsonVal.user.role == 1) {
        navigation.navigate('DashBoard');
      } else if (jsonVal.user.role === 4 || 5 || 6) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      isUserLogin();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bootsplash_logo_original.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121430',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
