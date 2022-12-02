import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const HeaderBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 5px;
`;

const AttendencePage = ({route, navigation: {goBack}}) => {
  const {data} = route.params;
  const {colors} = useTheme();
  const HeaderText = styled.Text`
    color: ${colors.text};
    font-size: 20px;
  `;

  const Text = styled.Text`
    color: ${colors.text};
  `;

  const [attendence, setAttendence] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAttendence = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      axios
        .post(
          `https://testserver.ghazalians.com/api/${jsonVal.user._id}/student/attendanceForGuardian`,
          {student: data._id},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jsonVal.token,
            },
          },
        )
        .then(res => {
          setAttendence(res.data);
          setLoading(false);
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    };
    getAttendence();
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
    <Container>
      {loading && (
        <ActivityIndicator
          size={60}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        />
      )}
      <HeaderBox>
        <HeaderText>Daily Date</HeaderText>
        <HeaderText>Status</HeaderText>
        <HeaderText>LateIn</HeaderText>
      </HeaderBox>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {attendence.map((item, i) => {
          return (
            <View key={i}>
              <Text>{item.date}</Text>
              <Text
                style={{
                  color: item.present ? 'green' : 'red',
                }}>
                {item.present ? 'Present' : 'Absent'}
              </Text>
              <Text style={{width: 50, textAlign: 'center'}}>
                {item.absent ? '--:--:--' : item.late_in ? 'Late' : 'Present'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default AttendencePage;
