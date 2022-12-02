import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  Provider as PaperProvider,
  Switch,
  TouchableRipple,
} from 'react-native-paper';
import CustomMenu from '../CustomMenu/CustomMenu';
import WelcomePage from '../CustomMenu/Welcome';
import DashBoard from '../DashBoard/DashBoard';
import GardianProfile from '../GardianProfile/GardianProfile';
import GuardianChildDetail from '../GardianProfile/GuardianChildDetail';
import Login from '../Login/Login';
import StaffProfile from '../StaffProfile/StaffProfile';
import StudentProfile from '../StudentProfile/StudentProfile';
import {CustomDarkTheme, CustomDefaultTheme} from '../Theme/Theme';
import Section from '../StaffProfile/Section';
import SectionAttendence from '../StaffProfile/SectionAttendence';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Children from '../GardianProfile/Children';
import ChildrenAttendence from '../GardianProfile/ChildrenAttendence';
import ChildrenDiary from '../GardianProfile/ChildrenDiary';
import AttendencePage from '../GardianProfile/AttendencePage';
import FeeHistory from '../GardianProfile/FeeHistory';
import FeeDetail from '../GardianProfile/FeeDetail';
import AdminProfile from '../DashBoard/AdminProfile';
import CheckDiary from '../GardianProfile/CheckDiary';
import StudentDiary from '../StudentProfile/StudentDiary';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const toggleTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      const stringTheme = JSON.stringify('DarkTheme');
      await AsyncStorage.setItem('theme', stringTheme);
    } else {
      await AsyncStorage.removeItem('theme');
    }
  };

  useEffect(() => {
    const getSaveTheme = async () => {
      const stringTheme = await AsyncStorage.getItem('theme');
      const parseTheme = JSON.parse(stringTheme);
      if (parseTheme == 'DarkTheme') {
        setIsDarkTheme(true);
      }
    };
    getSaveTheme();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          initialRouteName="Login"
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="DashBoard"
            options={{
              headerBackVisible: false,
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
              ),
            }}
            component={DashBoard}
          />
          <Stack.Screen
            name="StaffProfile"
            component={StaffProfile}
            options={{
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
              ),
            }}
          />
          <Stack.Screen
            name="GardianProfile"
            component={GardianProfile}
            options={{
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
              ),
            }}
          />
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{
              headerBackVisible: false,
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
              ),
            }}
          />
          <Stack.Screen
            name="StudentProfile"
            component={StudentProfile}
            options={{
              // headerBackImageSource: true,
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
              ),
            }}
          />
          <Stack.Screen
            name="AdminProfile"
            component={AdminProfile}
            options={{
              // headerBackImageSource: true,
              headerRight: () => (
                <CustomMenu
                  toggleTheme={toggleTheme}
                  isDarkTheme={isDarkTheme}
                />
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
