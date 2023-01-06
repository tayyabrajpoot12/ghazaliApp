import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({children, ...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const CheckNet = props => {
  const {isOffline} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isOffline}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Connection Error</Text>
          <Text style={styles.modalText}>
            Oops! Looks like your device is not connected to the Internet.
          </Text>
          <Button>Try Again</Button>
        </View>
      </View>
    </Modal>
  );
};

export default CheckNet;

const styles = StyleSheet.create({
  // ...

  modalContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  modalText: {
    fontSize: 18,
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
});
