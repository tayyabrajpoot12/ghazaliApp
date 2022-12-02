import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import {useTheme, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';

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
  font-size: 30px;
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

export default function GuardianProfile({route, navigation: {goBack}}) {
  const {id, token} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ChildrenDetial, setChildrenDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`https://testserver.ghazalians.com/api/${id}/guardian/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        if (res.data) {
          setData([res.data]);
          setLoading(false);
        }
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  }, []);

  const {colors} = useTheme();
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
  const navigation = useNavigation();

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
                          item.guardian.guardian.pic,
                      }}
                    />
                  </ImageBox>
                  <View>
                    <Text style={{color: colors.text}}>Name:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Email:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.email}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Contact:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.contactNo}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Education:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.education}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>Job:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.job}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: colors.text}}>CNIC:</Text>
                    <Text style={{color: colors.text}}>
                      {item.guardian.guardian.cnic}
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
