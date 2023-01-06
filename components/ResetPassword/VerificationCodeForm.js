import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../Components/Loader';
import axios from 'axios';

const VerificationCodeForm = ({navigation}) => {
  const [data, setData] = useState({
    code: '',
  });
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    if (!data.code) {
      setErrortext('Please fill verification code');
      return;
    }

    setLoading(false);
    const dataToSend = {
      code: data.code,
    };

    navigation.navigate('ResetPasswordForm');

    // try {
    //   axios
    //     .post('http://192.168.100.212:7000/', dataToSend)
    //     .then(async res => {
    //       setLoading(false);
    //       // alert(res.data);
    //       setData({...data, email: ''});
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <Text style={styles.emailText}>Enter Your verification code</Text>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={data.code}
                onChangeText={code => {
                  setData({...data, code: code});
                  if (code) {
                    setErrortext('');
                  } else {
                    setErrortext('Please fill verification code');
                  }
                }}
                placeholder="Enter Code" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                returnKeyType="none"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            {errortext ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default VerificationCodeForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#21242c',
    padding: 20,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
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
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    height: 50,
    width: '100%',
  },
  emailText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  desc: {
    color: '#ffffff',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  errorTextStyle: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 14,
    paddingVertical: 5,
    marginLeft: 10,
  },
  forgetTextStyle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    marginLeft: 35,
    marginTop: 12,
  },
});
