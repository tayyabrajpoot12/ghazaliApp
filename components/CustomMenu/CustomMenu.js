import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View, Alert} from 'react-native';
import {Divider, Menu} from 'react-native-paper';

const CustomMenu = ({toggleTheme, isDarkTheme}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const navigation = useNavigation();

  const CheckUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);

      if (jsonVal) {
        switch (jsonVal.user.role) {
          case 5:
            navigation.navigate('StudentProfile', {
              id: jsonVal.user._id,
              token: jsonVal.token,
            });
            closeMenu();
            break;
          case 4:
            navigation.navigate('StaffProfile', {
              id: jsonVal.user._id,
              token: jsonVal.token,
            });
            closeMenu();
            break;
          case 6:
            navigation.navigate('GardianProfile', {
              id: jsonVal.user._id,
              token: jsonVal.token,
            });
            closeMenu();
            break;
          case 1:
            navigation.navigate('AdminProfile', {
              id: jsonVal.user._id,
              token: jsonVal.token,
            });
            closeMenu();
            break;
          default:
            break;
        }
      }
    } catch (e) { 
      console.log(e);
    }
  };

  const ShowAlert = () => {
    Alert.alert('Stay Here!', 'Are you Want to logout Out?', [
      {
        text: 'Cancel',
        onPress: () => closeMenu(),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => LogoutUser()},
    ]);
  };

  const LogoutUser = async () => {
    await AsyncStorage.removeItem('LOGIN_USER');
    navigation.navigate('Login');
  };

  const [image, setImage] = useState();

  const school =
    'https://ghazalians.com/static/media/SchoolDropDownImg.71ac8876c1fc1e8066dd.jpg';

  const guardianImage = async () => {
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
          setImage(
            'https://testserver.ghazalians.com/' +
              res.data.guardian.guardian.pic,
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getStaffImage = async () => {
    const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
    let jsonVal = JSON.parse(jsonValue);
    axios
      .get(
        `https://testserver.ghazalians.com/api/${jsonVal.user._id}/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jsonVal.token,
          },
        },
      )
      .then(res => {
        if (res.data) {
          setImage('https://testserver.ghazalians.com/' + res.data.staff.pic);
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const getStudentImage = async () => {
    const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
    let jsonVal = JSON.parse(jsonValue);
    axios
      .get(
        `https://testserver.ghazalians.com/api/${jsonVal.user._id}/student/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jsonVal.token,
          },
        },
      )
      .then(res => {
        if (res.data) {
          setImage('https://testserver.ghazalians.com/' + res.data.student.pic);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getImage = async () => {
      const jsonValue = await AsyncStorage.getItem('LOGIN_USER');
      let jsonVal = JSON.parse(jsonValue);
      if (jsonVal) {
        switch (jsonVal.user.role) {
          case 5:
            getStudentImage();
            break;
          case 4:
            getStaffImage();
            break;
          case 6:
            guardianImage();
            break;
          default:
            break;
        }
      }
    };
    getImage();
  }, []);

  return (
    <View style={{}}>
      <Menu
        style={{marginTop: 40}}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 15,
              }}
              source={{uri: image ? image : school}}
            />
          </TouchableOpacity>
        }>
        <Menu.Item
          leadingIcon={'theme-light-dark'}
          onPress={() => {
            toggleTheme();
            closeMenu();
          }}
          title={isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        />
        <Divider />
        <Menu.Item onPress={CheckUser} title="Profile" />
        <Divider />
        <Menu.Item onPress={ShowAlert} title="Logout" />
      </Menu>
    </View>
  );
};
export default CustomMenu;
