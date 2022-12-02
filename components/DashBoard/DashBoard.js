import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import ChartJs from './PieChart';
import {BackHandler} from 'react-native';

const DashBoard = () => {
  // const {colors} = useTheme();

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
    <Container>
      <ChartJs></ChartJs>
    </Container>
  );
};

export default DashBoard;

const Container = styled.View`
  flex: 1;
`;
