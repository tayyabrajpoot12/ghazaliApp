import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Dimensions, ScrollView, View, ActivityIndicator} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {Card} from 'react-native-paper';
import styled from 'styled-components/native';
import MyCalendar from './Calender';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Text = styled.Text`
  font-size: 30px;
  padding-horizontal: 30px;
  padding-vertical: 20px;
`;

const screenWidth = Dimensions.get('window').width;

const ChartJs = () => {
  const {colors} = useTheme();
  const [Studentstrenght, setStudentStrenght] = useState(0);
  const [Staffstrenght, setStaffStrenght] = useState(0);
  const [presentStudents, setPresentStudent] = useState(0);
  const [presentStaff, setPresentStaff] = useState(0);
  const [absentStudents, setAbsentStudent] = useState(0);
  const [absentStaff, setAbsentStaff] = useState(0);
  const [onLeaveStudents, setOnLeaveStudents] = useState(0);
  const [onLeaveStaff, setOnLeaveStaff] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem('LOGIN_USER');
      const savedUser = JSON.parse(user);

      axios
        .all([
          axios.post(
            `https://testserver.ghazalians.com/api/${savedUser.user._id}/getStudentStrength`,
            {school: '6312efd87a290c1fb21a0938'},
            {
              headers: {
                Authorization: `Bearer ${savedUser.token}`,
              },
            },
          ),
          axios.post(
            `https://testserver.ghazalians.com/api/${savedUser.user._id}/getStaffStrength`,
            {school: '6312efd87a290c1fb21a0938'},
            {
              headers: {
                Authorization: `Bearer ${savedUser.token}`,
              },
            },
          ),
        ])
        .then(
          axios.spread((data1, data2) => {
            // output of req.
            setStaffStrenght(data2.data);
            setStudentStrenght(data1.data);
          }),
        )
        .catch(async err => {
          if (err.response.status == 401) {
            const isUserLogin = JSON.stringify('token has expired');
            await AsyncStorage.setItem('IS_TOKEN', isUserLogin);
            navigation.navigate('Login');
          } else {
            alert(err);
          }
        });
    };
    getData();
  }, []);

  useEffect(() => {
    const PresntData = () => {
      axios
        .all([
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/presentStudents`,
          ),
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/absentStudents`,
          ),
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/presentStaff`,
          ),
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/absentStaff`,
          ),
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/onLeaveStudents`,
          ),
          axios.get(
            `https://testserver.ghazalians.com/api/6312efd87a290c1fb21a0938/onLeaveStaff`,
          ),
        ])
        .then(
          axios.spread((data1, data2, data3, data4, data5, data6) => {
            setLoading(false);
            setPresentStudent(data1.data);
            setAbsentStudent(data2.data);
            setPresentStaff(data3.data);
            setAbsentStaff(data4.data);
            setOnLeaveStudents(data5.data);
            setOnLeaveStaff(data6.data);
          }),
        )
        .catch(e => {
          console.log(e);
          setLoading(false);
        });
    };
    PresntData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const studentdata = [
    {
      name: 'Present',
      students: presentStudents,
      color: 'green',
      legendFontSize: 12,
      legendFontColor: `${colors.text}`,
    },
    {
      name: 'Absent',
      students: absentStudents,
      color: '#f00',
      legendFontSize: 13,
      legendFontColor: `${colors.text}`,
    },
    {
      name: 'OnLeave',
      students: onLeaveStudents,
      color: 'blue',
      legendFontSize: 13,
      legendFontColor: `${colors.text}`,
    },
  ];

  const staffData = [
    {
      name: 'Present',
      staff: presentStaff,
      color: 'green',
      legendFontColor: `${colors.text}`,
      legendFontSize: 12,
    },
    {
      name: 'Absent',
      staff: absentStaff,
      color: '#F00',
      legendFontColor: `${colors.text}`,
      legendFontSize: 13,
    },
    {
      name: 'onLeave',
      staff: onLeaveStaff,
      color: 'blue',
      legendFontColor: `${colors.text}`,
      legendFontSize: 13,
    },
  ];

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [25, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chart = {
    backgroundGradientFrom: `${colors.text}`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: `${colors.text}`,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `${colors.text}`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{padding: 20}}>
        <Card style={{backgroundColor: colors.card}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text}}>Students</Text>
            <Text style={{color: colors.text}}>{Studentstrenght}</Text>
          </View>
          {loading && (
            <ActivityIndicator
              size={60}
              style={{top: 140, position: 'absolute', left: 60}}
            />
          )}
          <Card.Content>
            <PieChart
              data={studentdata}
              width={340}
              height={220}
              chartConfig={chartConfig}
              accessor={'students'}
              backgroundColor={'transparent'}
              center={[10, -20]}
              absolute={true}
              paddingLeft={15}
            />
          </Card.Content>
        </Card>
      </View>
      <View style={{padding: 20}}>
        <Card style={{backgroundColor: colors.card}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: colors.text}}>Staff</Text>
            <Text style={{color: colors.text}}>{Staffstrenght}</Text>
          </View>
          {loading && (
            <ActivityIndicator
              size={60}
              style={{top: 140, position: 'absolute', left: 60}}
            />
          )}
          <Card.Content>
            <PieChart
              data={staffData}
              width={340}
              height={220}
              chartConfig={chartConfig}
              accessor={'staff'}
              backgroundColor={'transparent'}
              center={[10, -20]}
              absolute={true}
              paddingLeft={15}
            />
          </Card.Content>
        </Card>
      </View>
      {/* <View style={{padding: 20}}>
        <Card style={{backgroundColor: colors.card}}>
          <Text style={{color: colors.text}}>Staff</Text>
          <Card.Content>
            <BarChart
              style={{left: -5}}
              data={data}
              width={330}
              height={330}
              yAxisLabel="$"
              chartConfig={chart}
              verticalLabelRotation={30}
            />
          </Card.Content>
        </Card>
      </View> */}
      <View style={{padding: 20}}>
        <Card style={{backgroundColor: colors.card}}>
          <Card.Content>
            <MyCalendar />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ChartJs;
