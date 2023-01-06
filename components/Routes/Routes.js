import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Switch, TouchableRipple} from 'react-native-paper';
import CustomMenu from '../CustomMenu/CustomMenu';
import Home from '../CustomMenu/Welcome';
import AdminProfile from '../DashBoard/AdminProfile';
import DashBoard from '../DashBoard/DashBoard';
import AttendencePage from '../GardianProfile/AttendencePage';
import CheckDiary from '../GardianProfile/CheckDiary';
import Children from '../GardianProfile/Children';
import ChildrenAttendence from '../GardianProfile/ChildrenAttendence';
import ChildrenDiary from '../GardianProfile/ChildrenDiary';
import FeeDetail from '../GardianProfile/FeeDetail';
import FeeHistory from '../GardianProfile/FeeHistory';
import GardianProfile from '../GardianProfile/GardianProfile';
import GuardianChildDetail from '../GardianProfile/GuardianChildDetail';
import Login from '../Login/Login';
import EmailVerificationForm from '../ResetPassword/EmailVerificationForm';
import SplashScreen from '../SplashScreen';
import Section from '../StaffProfile/Section';
import SectionAttendence from '../StaffProfile/SectionAttendence';
import StaffProfile from '../StaffProfile/StaffProfile';
import StudentDiary from '../StudentProfile/StudentDiary';
import StudentProfile from '../StudentProfile/StudentProfile';
import {
  ThemeContext as Context,
  ThemeDispatchContext,
} from '../Context/GlobalState';

export const navigationRef = createNavigationContainerRef();

const Routes = () => {
  const ChangeTheme = useContext(ThemeDispatchContext);

  const Stack = createNativeStackNavigator();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mode, setMode] = useState('light');

  const toggleTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      setMode('dark');
      ChangeTheme('dark');
      await AsyncStorage.setItem('theme', 'dark');
    } else {
      setMode('light');
      ChangeTheme('light');
      await AsyncStorage.removeItem('theme');
    }
  };

  useEffect(() => {
    const getTheme = async () => {
      const saveTheme = await AsyncStorage.getItem('theme');
      if (saveTheme === 'dark') {
        ChangeTheme('dark');
        setIsDarkTheme(true);
      } else {
        ChangeTheme('light');
        setIsDarkTheme(false);
      }
    };
    getTheme();
  }, []);


 

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerRight: () => {
          return (
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          );
        },
        headerShadowVisible: true,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{
          headerBackVisible: false,
        }}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerBackVisible: false,
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
      />
      <Stack.Screen
        name="DashBoard"
        options={{
          headerBackVisible: false,
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
        component={DashBoard}
      />
      <Stack.Screen
        name="StaffProfile"
        component={StaffProfile}
        options={{
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
      />
      <Stack.Screen
        name="GardianProfile"
        component={GardianProfile}
        options={{
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
      />

      <Stack.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{
          // headerBackImageSource: true,
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{
          // headerBackImageSource: true,
          headerRight: () => (
            <CustomMenu toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          ),
        }}
      />
      <Stack.Screen
        name="GuardianChildDetail"
        component={GuardianChildDetail}
        options={{
          // headerBackImageSource: true,
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="Section"
        component={Section}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="CheckDiary"
        component={CheckDiary}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="StudentDiary"
        component={StudentDiary}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="ChildrenAttendence"
        component={ChildrenAttendence}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="AttendencePage"
        component={AttendencePage}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="ChildrenDiary"
        component={ChildrenDiary}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="Children"
        component={Children}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="SectionAttendence"
        component={SectionAttendence}
        options={{
          headerRight: () => {
            return null;
          },
        }}
      />
      <Stack.Screen
        name="FeeHistory"
        component={FeeHistory}
        options={{
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="FeeDetail"
        component={FeeDetail}
        options={{
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="EmailVerificationForm"
        component={EmailVerificationForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
