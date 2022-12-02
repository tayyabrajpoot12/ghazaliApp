import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useTheme, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

const Text = styled.Text`
  font-size: 20px;
  padding-vertical: 10px;
`;

const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ChildDetial = styled.Text`
  font-size: 20px;
  margin-vertical: 20px;
`;
const ImageBox = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const SmallBox = styled.View``;

const Main = styled.View`
  margin-bottom: 20px;
`;

export default function ChildrenDiary({navigation: {goBack}}) {
  const [loading, setLoading] = useState(true);
  const [ChildrenDetial, setChildrenDetail] = useState([]);

  useEffect(() => {
    const getChildren = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      axios
        .get(
          `https://testserver.ghazalians.com/api/${jsonVal.user._id}/guardian/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + jsonVal.token,
            },
          },
        )
        .then(res => {
          if (res.data) {
            setLoading(false);
            setChildrenDetail(res.data.guardian.childs);
          }
        })
        .catch(err => {
          alert(err);
          setLoading(false);
        });
    };
    getChildren();
  }, []);

  const {colors} = useTheme();
  const navigation = useNavigation();
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
    <Container style={{backgroundColor: colors.background}}>
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <ChildDetial style={{color: colors.text}}>
          Check Today Diary
        </ChildDetial>
        <Main>
          {ChildrenDetial.map((item, i) => {
            return (
              <Card
                key={i}
                style={{marginBottom: 30, backgroundColor: colors.card}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CheckDiary', {data: item});
                  }}>
                  <Card.Content>
                    <View>
                      <Text style={{color: colors.text}}>Name:</Text>
                      <Text style={{color: colors.text}}>{item.stdName}</Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Class:</Text>
                      <Text style={{color: colors.text}}>
                        {item.class.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Section:</Text>
                      <Text style={{color: colors.text}}>
                        {item.section.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Roll no:</Text>
                      <Text style={{color: colors.text}}>{item.rollNo}</Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Fee:</Text>
                      <Text style={{color: colors.text}}>
                        {item.feeData.fee}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Gender:</Text>
                      <Text style={{color: colors.text}}>{item.stdGender}</Text>
                    </View>
                    <View>
                      <Text style={{color: colors.text}}>Religion:</Text>
                      <Text style={{color: colors.text}}>{item.religion}</Text>
                    </View>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            );
          })}
        </Main>
      </ScrollView>
    </Container>
  );
}
