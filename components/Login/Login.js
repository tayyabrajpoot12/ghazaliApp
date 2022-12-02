import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {Button as MyButton, Snackbar, Text} from 'react-native-paper';
import styled from 'styled-components/native';
import {useNetInfo, NetInfo} from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';
const Input = styled.TextInput`
  border-color: #fff;
  border-width: 1px;
  border-radius: 10px;
  color: #fff;
  padding-horizontal: 15px;
`;

const View = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  align-items: center;
  justify-content: center;
`;

const SnackBox = styled.View`
  flex-direction: row;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState({
    mail: false,
    pass: false,
    isConnected: false,
  });

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const netInfo = useNetInfo();

  const userLogin = () => {
    setLoading(true);
    if (data.email && data.password) {
      const regexp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const myEmail = data.email.trim().toLowerCase();
      const myPassword = data.password.trim();
      let correct = regexp.test(myEmail);
      // if (!correct) {
      //   alert('please enter a valid email');
      //   setLoading(false);
      //   return false;
      // }

      if (!netInfo.isConnected) {
        setVisible({...visible, isConnected: true});
        setLoading(false);
        return false;
      }

      try {
        axios
          .post('https://testserver.ghazalians.com/api/signin', {
            email: myEmail,
            password: myPassword,
          })
          .then(async res => {
            const loginUser = JSON.stringify(res.data);
            await AsyncStorage.setItem('LOGIN_USER', loginUser);
            if (res.data.user.permissions.canSeeDashboard == true) {
              navigation.navigate('DashBoard');
              setData({...data, email: '', password: ''});
              setLoading(false);
            } else {
              navigation.navigate('WelcomePage');
              setData({...data, email: '', password: ''});
              setLoading(false);
            }
          })
          .catch(e => {
            if (e.response.status == 401) {
              setLoading(false);
              alert('Email and Password do not match');
            } else if (e.response.status == 400) {
              setLoading(false);
              alert('User Email Does Not Exist');
            } else if (e.response.status == 422) {
              alert('Please enter valid email');
              setLoading(false);
            }
            setLoading(false);
          });
      } catch (err) {
        setLoading(false);
        alert(err);
      }
    } else {
      if (!data.email) {
        setVisible({...visible, mail: true});
        setLoading(false);
      } else {
        setVisible({...visible, pass: true});
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const isUserLogin = async () => {
      const isUserActive = await AsyncStorage.getItem('LOGIN_USER');
      const jsonVal = JSON.parse(isUserActive);
      if (jsonVal != null) {
        if (jsonVal.user.role == 1) {
          navigation.navigate('DashBoard');
        } else if (jsonVal.user.role === 4 || 5 || 6) {
          navigation.navigate('WelcomePage');
        } else {
          navigation.navigate('Login');
        }
      }
    };
    isUserLogin();
  }, []);

  const {colors} = useTheme();
  return (
    <>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginVertical: 10,
              color: '#7568f6',
            }}>
            Login
          </Text>
          <Text style={{marginVertical: 20}}>
            Enter your email address and password to access app features
          </Text>
          <Text style={{color: '#7568f6', marginVertical: 20}}>Email</Text>
          <Input
            style={{borderColor: colors.text, color: colors.text}}
            onChangeText={e => {
              setData({...data, email: e});
            }}
            editable={loading ? false : true}
            value={data.email}
          />
          <Text style={{marginVertical: 20, color: '#7568f6'}}>Password</Text>
          <Input
            style={{borderColor: colors.text, color: colors.text}}
            onChangeText={e => {
              setData({...data, password: e});
            }}
            editable={loading ? false : true}
            value={data.password}
          />
          <Text style={{marginVertical: 20}}>
            Enter your email address we'll send you verification an code to
            reset your password
          </Text>
          <Box>
            {loading && (
              <ActivityIndicator
                size={25}
                style={{position: 'absolute', zIndex: 20}}
              />
            )}
            <MyButton
              disabled={loading ? true : false}
              style={{width: '100%'}}
              mode="contained"
              onPress={userLogin}>
              Login
            </MyButton>
          </Box>
        </ScrollView>
        <Snackbar
          visible={visible.mail}
          duration={1300}
          onDismiss={onDismissSnackBar}>
          Please enter email
        </Snackbar>
        <Snackbar
          visible={visible.pass}
          duration={1300}
          onDismiss={onDismissSnackBar}>
          Please enter password
        </Snackbar>
        <Snackbar
          visible={visible.isConnected}
          duration={1300}
          onDismiss={onDismissSnackBar}>
          <SnackBox>
            <Icon
              name="wifi-off"
              size={20}
              style={{
                color: colors.text === '#ffffff' ? '#000000' : '#ffffff',
              }}
            />
            <Text
              style={{
                color: colors.text === '#ffffff' ? '#000000' : '#ffffff',
                paddingHorizontal: 10,
              }}>
              You are currently offline
            </Text>
          </SnackBox>
        </Snackbar>
      </View>
    </>
  );
};

export default Login;
