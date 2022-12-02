import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Evillcons from 'react-native-vector-icons/Entypo';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import axios from 'axios';
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
`;

const IconBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 10px;
`;
const View = styled.View``;
const WelcomePage = () => {
  const {colors} = useTheme();

  const Text = styled.Text`
    text-align: center;
    color: ${colors.text};
  `;
  const SingleBox = styled.View`
    border-width: 1px;
    height: 130px;
    width: 130px;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    border-color: ${colors.text};
  `;

  const Welcome = styled.Text`
    color: ${colors.text};
    text-align: center;
    font-size: 30px;
    top: -60px;
  `;

  const [role, setRole] = useState(0);
  const [name, setName] = useState();
  const [state, setState] = useState(false);
  const navigation = useNavigation();
  const [data, setData] = useState({
    id: '',
    token: '',
  });

  const getGuardianName = () => {
    axios
      .get(
        `https://testserver.ghazalians.com/api/${data.id}/guardian/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.token,
          },
        },
      )
      .then(res => {
        setName(res.data.guardian.guardian.name);
      })
      .catch(err => {
        if (err.response.status == 401) {
          navigation.navigate('Login');
          alert('Token has expired');
        } else {
          alert(err);
        }
      });
  };

  const getStaffName = () => {
    axios
      .get(`https://testserver.ghazalians.com/api/${data.id}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
      })
      .then(res => {
        setName(res.data.staff.firstname);
      })
      .catch(err => {
        if (err.response.status == 401) {
          navigation.navigate('Login');
          alert('Token has expired');
        } else {
          alert(err);
        }
      });
  };

  const getStudentName = () => {
    axios
      .get(`https://testserver.ghazalians.com/api/${data.id}/student/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        },
      })
      .then(res => {
        setName(res.data.student.stdName);
      })
      .catch(err => {
        if (err.response.status == 401) {
          navigation.navigate('Login');
          alert('Token has expired');
        } else {
          alert(err);
        }
      });
  };

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      if (jsonVal != null) {
        setData({...data, token: jsonVal.token, id: jsonVal.user._id});
        setRole(jsonVal.user.role);
        setState(true);
      } else {
        alert('token has expired!');
        navigation.navigate('Login');
      }
    };
    getData();
  }, []);

  useEffect(() => {
    switch (role) {
      case 5:
        getStudentName();
        break;
      case 4:
        getStaffName();
        break;
      case 6:
        getGuardianName();
        break;
      default:
        break;
    }
    setState(false);
  }, [state]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Container>
        <Welcome style={{fontSize: 20}}>Welcome</Welcome>
        <Welcome>{name}</Welcome>
        {role === 6 && (
          <View>
            <IconBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Children', {
                    id: data.id,
                    token: data.token,
                  });
                }}>
                <SingleBox>
                  <MaterialCommunity
                    name="human-male-child"
                    color={'#000'}
                    size={60}
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                  />
                  <Text>Children Details</Text>
                </SingleBox>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChildrenAttendence');
                }}>
                <SingleBox>
                  <Evillcons
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                    name="pencil"
                    color={'#000'}
                    size={50}
                  />
                  <Text>Check Attendence</Text>
                </SingleBox>
              </TouchableOpacity>
            </IconBox>
            <IconBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChildrenDiary');
                }}>
                <SingleBox>
                  <AntDesign
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                    name="book"
                    color={'#000'}
                    size={50}
                  />
                  <Text>Diary</Text>
                </SingleBox>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('FeeHistory');
                }}>
                <SingleBox>
                  <MaterialCommunity
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                    name="history"
                    color={'#000'}
                    size={50}
                  />
                  <Text>Fee History</Text>
                </SingleBox>
              </TouchableOpacity>
            </IconBox>
          </View>
        )}
        {role === 4 && (
          <View>
            <IconBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Section');
                }}>
                <SingleBox>
                  <MaterialCommunity
                    name="human-male-child"
                    color={'#000'}
                    size={60}
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                  />
                  <Text>Setion Details</Text>
                </SingleBox>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SectionAttendence');
                }}>
                <SingleBox>
                  <Evillcons
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                    name="pencil"
                    color={'#000'}
                    size={50}
                  />
                  <Text>Section Attendence</Text>
                </SingleBox>
              </TouchableOpacity>
            </IconBox>
          </View>
        )}
        {role === 5 && (
          <View>
            <IconBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StudentDiary');
                }}>
                <SingleBox>
                  <AntDesign
                    style={{
                      borderRadius: 20,
                      color: colors.text,
                    }}
                    name="book"
                    color={'#000'}
                    size={50}
                  />
                  <Text>Diary</Text>
                </SingleBox>
              </TouchableOpacity>
            </IconBox>
          </View>
        )}
      </Container>
    </ScrollView>
  );
};

export default WelcomePage;
