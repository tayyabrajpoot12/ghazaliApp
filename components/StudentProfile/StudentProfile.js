import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Image, ScrollView, BackHandler} from 'react-native';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';

const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

const LoadingBox = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Text = styled.Text`
  font-size: 20px;
  padding-vertical: 10px;
`;

const Main = styled.View``;

const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SmallBox = styled.View``;
const ImageBox = styled.View`
  align-items: center;
`;

export default function StudentProfile({route, navigation: {goBack}}) {
  const {id, token} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://testserver.ghazalians.com/api/${id}/student/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        if (res.data) {
          setLoading(false);
          setData([res.data]);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
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

  const {colors} = useTheme();

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
        <Card style={{backgroundColor: colors.card}}>
          <Card.Content>
            {data.map((item, i) => {
              return (
                <SmallBox key={i}>
                  <ImageBox>
                    <Image
                      style={{height: 250, width: 250, borderRadius: 30}}
                      source={{
                        uri:
                          'https://testserver.ghazalians.com/' +
                          item.student.pic,
                      }}
                    />
                  </ImageBox>
                  <View>
                    <Text style={{color: colors.text}}>Name:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.stdName}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Roll NO:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.rollNo}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Gender:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.stdGender}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>CardNo:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.cardNo}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Father Name:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.parentsInfo.father.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Father CNIC:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.parentsInfo.father.cnic}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Contact:</Text>
                    <Text style={{color: colors.text}}>
                      {item.student.parentsInfo.father.contactNo}
                    </Text>
                  </View>
                </SmallBox>
              );
            })}
          </Card.Content>
        </Card>
      </ScrollView>
    </Container>
  );
}
