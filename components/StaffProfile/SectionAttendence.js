import React, {useEffect, useState} from 'react';
import {Image, ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Cointainer = styled.View`
  flex: 1;
  padding: 15px;
`;
const StudentCointainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
  align-items: center;
`;
const HeaderBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  width: 100%;
`;

const View = styled.View``;

const SectionAttendence = ({navigation: {goBack}}) => {
  const {colors} = useTheme();

  const HeaderText = styled.Text`
    font-weight: bold;
    font-size: 17px;
    color: ${colors.text};
  `;
  const Name = styled.Text`
    color: ${colors.text};
    width: 80px;
    text-align: center;
  `;
  const RollNo = styled.Text`
    color: ${colors.text};
  `;
  const Status = styled.Text`
    color: ${colors.text};
  `;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAttendence = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
        let jsonVal = JSON.parse(jsonValue);
        axios
          .post(
            `https://testserver.ghazalians.com/api/${jsonVal.user._id}/${jsonVal.user.informativeModel.school._id}/student/studentSectionAttendanceToday`,
            {section: jsonVal.user.informativeModel.inchargeOf},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jsonVal.token,
              },
            },
          )
          .then(res => {
            setData(res.data);
            setLoading(false);
          })
          .catch(err => {
            alert(err);
            closeMenu();
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
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
    <Cointainer>
      <HeaderBox>
        <HeaderText>Pic</HeaderText>
        <HeaderText>Name</HeaderText>
        <HeaderText>Date</HeaderText>
        <HeaderText>Status</HeaderText>
      </HeaderBox>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {data.map((item, i) => {
          return (
            <StudentCointainer key={i}>
              <Image
                style={{width: 30, height: 30, borderRadius: 10}}
                source={{
                  uri: 'https://testserver.ghazalians.com/' + item.id.pic,
                }}
              />
              <Name>{item.id.stdName}</Name>
              <RollNo>{item.date}</RollNo>
              <Status style={{color: item.present ? 'green' : 'red'}}>
                {item.present ? 'Present' : 'Absent'}
              </Status>
            </StudentCointainer>
          );
        })}
      </ScrollView>
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
    </Cointainer>
  );
};

export default SectionAttendence;
