import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../Components/Loader';
import axios from 'axios';

const ResetPasswordForm = ({navigation}) => {
  const [data, setData] = useState({
    password: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!data.password) {
      alert('Please fill Email');
      return;
    }
    if (!data.newPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    const dataToSend = {
      email: data.email.toLowerCase(),
      password: data.password,
    };

    // try {
    //   axios
    //     .post('http://192.168.100.212:7000/user/login', dataToSend)
    //     .then(async res => {
    //       const stringifyUser = JSON.stringify(res.data);
    //       await AsyncStorage.setItem('LOGIN_USER', stringifyUser);
    //       setLoading(false);
    //       // alert(res.data);
    //       setData({...data, email: '', password: ''});
    //       navigation.navigate('DrawerNavigationRoutes');
    //     })
    //     .catch(err => {
    //       alert(err.response.data.error);
    //       setLoading(false);
    //     });
    // } catch (err) {
    //   alert(err);
    //   setLoading(false);
    // }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView enabled>
          <View>
            <TextInput
              style={styles.inputStyle}
              placeholder="New Password"
              value={data.email}
              placeholderTextColor={'#8b9cb5'}
              onChangeText={password => {
                setData({...data, password: password});
              }}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Confirm Password"
              value={data.password}
              placeholderTextColor={'#8b9cb5'}
              onChangeText={newPassword => {
                setData({...data, newPassword: newPassword});
              }}
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default ResetPasswordForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#21242c',
    padding: 30,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 25,
    width: '100%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    width: '100%',
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    height: 50,
    marginVertical: 15,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  forgetTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-start',
    padding: 10,
  },
});
