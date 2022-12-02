import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {Image, BackHandler, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const View = styled.View`
  flex: 1;
  padding: 30px;
`;

const StudentDiary = ({navigation: {goBack}}) => {
  const [loading, setLoading] = useState(true);
  const [Diary, setDiary] = useState();

  useEffect(() => {
    const getDiary = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      axios
        .get(
          `http://192.168.100.92:7000/api/${jsonVal.user._id}/sectionPic/${jsonVal.user.informativeModel.section}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jsonVal.token,
            },
          },
        )
        .then(res => {
          setLoading(false);
          setDiary('http://192.168.100.92:7000/' + res.data);
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    };
    getDiary();
  }, []);

  useEffect(() => {
    const backAction = () => {
      goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      {loading && (
        <ActivityIndicator
          size={60}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      <Image style={{width: '100%', height: '100%'}} source={{uri: Diary}} />
    </View>
  );
};

export default StudentDiary;
