import {View, Text} from 'react-native';
import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';

const MyCalendar = () => {
  const {colors} = useTheme();
  const [selectedDate, setSelectedDate] = useState();
  let date = new Date().toString().slice(0, 10);

  let today = moment();
  let day = today.clone().startOf('month');
  let customDatesStyles = [];
  // while (day.add(1, 'day').isSame(today, 'month')) {
  //   customDatesStyles.push({
  //     date: day.clone(),
  //     containerStyle: [], // extra styling for day container
  //     allowDisabled: true, // allow custom style to apply to disabled dates
  //   });
  // }

  const onDateChange = day => {
    let stringDate = day.toString();
    setSelectedDate(stringDate.slice(0, 10));
  };

  return (
    <View>
      <CalendarPicker
        textStyle={{color: colors.text}}
        onDateChange={e => {
          onDateChange(e);
        }}
        height={300}
        width={300}
        selectedDayStyle={{
          borderColor: '#7568f6',
          borderWidth: 2,
          backgroundColor: date == selectedDate ? '#7568f6' : '#fff',
          color: colors.text,
        }}
        startFromMonday={true}
        todayTextStyle={{fontWeight: 'bold', color: '#fff'}}
        todayBackgroundColor={'#7568f6'}
        customDatesStyles={customDatesStyles}
      />
    </View>
  );
};

export default MyCalendar;
