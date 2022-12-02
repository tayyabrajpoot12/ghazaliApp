import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView, Image} from 'react-native';
import styled from 'styled-components/native';
import {Card} from 'react-native-paper';
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;
const View = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ImageBox = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const Text = styled.Text`
  font-size: 20px;
  padding-vertical: 10px;
`;
const GuardianChildDetail = ({route}) => {
  const {colors} = useTheme();
  const {student} = route.params;
  return (
    <Container>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Card style={{marginBottom: 30, backgroundColor: colors.card}}>
          <Card.Content>
            <ImageBox>
              <Image
                style={{height: 250, width: 250, borderRadius: 30}}
                source={{
                  uri: 'https://testserver.ghazalians.com/' + student.pic,
                }}
              />
            </ImageBox>
            <View>
              <Text style={{color: colors.text}}>Name:</Text>
              <Text style={{color: colors.text}}>{student.stdName}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Class:</Text>
              <Text style={{color: colors.text}}>{student.class.name}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Section:</Text>
              <Text style={{color: colors.text}}>{student.section.name}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Roll no:</Text>
              <Text style={{color: colors.text}}>{student.rollNo}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Fee:</Text>
              <Text style={{color: colors.text}}>{student.feeData.fee}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Gender:</Text>
              <Text style={{color: colors.text}}>{student.stdGender}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Religion:</Text>
              <Text style={{color: colors.text}}>{student.religion}</Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Addmission Date:</Text>
              <Text style={{color: colors.text}}>
                {student.addmissionDate.slice(0, 10)}
              </Text>
            </View>
            <View>
              <Text style={{color: colors.text}}>Home Address:</Text>
              <Text
                style={{color: colors.text, width: 160, textAlign: 'center'}}
                numberOfLines={2}
                ellipsizeMode="tail">
                {student.homeAddress}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default GuardianChildDetail;
