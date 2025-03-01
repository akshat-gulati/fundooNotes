// AccountModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

// Get device screen dimensions
const { width, height } = Dimensions.get('window');

const AccountModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
         <Image style={styles.icon} source={require('../Assets/x.square.png')} />
         </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: width * 0.85, // 85% of screen width
    maxHeight: height * 0.7, // 70% of screen height
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.05, // Responsive padding
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: height * 0.02, // Responsive margin
    textAlign: 'center',
    fontSize: width * 0.04, // Responsive font size
  },
  icon: {
    tintColor: 'black',
    resizeMode: 'contain',
    height: height * 0.03,
    width: height * 0.03,
  },
});

export default AccountModal;
