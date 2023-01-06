import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 30px;
  text-transform: uppercase;
  text-decoration: underline;
  text-indent: 100px;
`;

const Home = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  useEffect(() => {
    const isUserLogin = async () => {
      const isUserActive = await AsyncStorage.getItem('LOGIN_USER');
      if (isUserActive) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    };
    isUserLogin();
  }, []);
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{color: colors.text}}>go to login</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
