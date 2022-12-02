import React, {useEffect, useState} from 'react';
import {Image, ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
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
`;

const View = styled.View``;

const Section = ({navigation: {goBack}}) => {
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
  const AddmissionNo = styled.Text`
    color: ${colors.text};
  `;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSection = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
        let jsonVal = JSON.parse(jsonValue);
        axios
          .get(
            `https://testserver.ghazalians.com/api/${jsonVal.user._id}/${jsonVal.user.informativeModel._id}/inchargeBySection`,
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
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getSection();
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
        <HeaderText>AddmissionNo.</HeaderText>
        <HeaderText>Name</HeaderText>
        <HeaderText>Roll No.</HeaderText>
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
                  uri: 'https://testserver.ghazalians.com/' + item.pic,
                }}
              />
              <AddmissionNo>{item.admissionNo}</AddmissionNo>
              <Name>{item.stdName}</Name>
              <RollNo>{item.rollNo}</RollNo>
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

export default Section;
