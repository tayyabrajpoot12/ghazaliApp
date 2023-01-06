import {useTheme} from '@react-navigation/native';
import React, {createRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import styled from 'styled-components/native';
import Loader from '../../components/Loader';

const Input = styled.TextInput`
  border-color: #fff;
  border-width: 1px;
  border-radius: 10px;
  color: #fff;
  padding-horizontal: 15px;
  width: 100%;
  height: 50px;
`;

const EmailVerificationForm = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
  });

  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const onDismissSnackBar = () => setShow(false);

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    if (!data.email) {
      setShow(true);
      return;
    }

    setLoading(false);
    const dataToSend = {
      email: data.email.toLowerCase(),
    };

    navigation.navigate('VerificationCodeForm');

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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View>
          <Text style={[styles.emailText, {color: colors.text}]}>
            Enter Your Email
          </Text>
          <Text style={[styles.desc, {color: colors.text}]}>
            You will receieve a verification code
          </Text>
          <View style={styles.SectionStyle}>
            <Input
              style={{borderColor: colors.text, color: colors.text}}
              onChangeText={e => {
                setData({...data, email: e});
              }}
              editable={loading ? false : true}
              value={data.email}
            />
          </View>
          <Button
            style={styles.buttonStyle}
            mode="contained"
            onPress={handleSubmitPress}>
            Submit
          </Button>
        </View>
        <Snackbar visible={show} duration={1300} onDismiss={onDismissSnackBar}>
          Please enter email
        </Snackbar>
      </ScrollView>
    </View>
  );
};

export default EmailVerificationForm;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    margin: 10,
  },
  buttonStyle: {
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 25,
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
