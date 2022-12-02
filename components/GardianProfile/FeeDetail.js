import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import {useTheme} from '@react-navigation/native';

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

const FeeDetail = ({route, navigation: {goBack}}) => {
  const {data} = route.params;
  const {colors} = useTheme();
  const HeaderText = styled.Text`
    color: ${colors.text};
    font-size: 20px;
  `;

  const Text = styled.Text`
    color: ${colors.text};
    font-size: 17px;
    text-align: center;
  `;

  const [History, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      axios
        .post(
          `https://testserver.ghazalians.com/api/${jsonVal.user._id}/fee/singleStudent`,
          {regNum: data.admissionNo},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jsonVal.token,
            },
          },
        )
        .then(res => {
          setHistory(res.data);
          setLoading(false);
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    };
    getHistory();
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
        <HeaderText>DueDate</HeaderText>
        <HeaderText>BasicFee</HeaderText>
        <HeaderText>Paid</HeaderText>
        <HeaderText>Month</HeaderText>
        <HeaderText>Due</HeaderText>
      </HeaderBox>
      <ScrollView>
        {History.map((item, i) => {
          return (
            <View key={i}>
              <Text>{item.dueDate.slice(0, 10)}</Text>
              <Text>{item.basicFee}</Text>
              <Text style={{color: item.paid ? 'green' : 'red'}}>
                {item.paid ? 'Paid' : 'unPaid'}
              </Text>
              <Text>{item.chargedMonth}</Text>
              <Text>{item.due}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default FeeDetail;
