import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
    backgroundColor: '#212025',
  },
  container: {
    flex: 1,
    padding: width * 0.025,
  },
  centreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.2,
    width: height * 0.2,
  },
  helperText: {
    color: 'white',
    marginTop: height * 0.02,
    fontSize: width * 0.05,
  },
  searchContainer: {
    backgroundColor: '#2B2B2F',
    borderRadius: width * 0.025,
    padding: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftmost: {
    flexDirection: 'row',
  },
  rightmost: {
    flexDirection: 'row',
  },
  searchIcon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.03,
    width: height * 0.03,
  },
  searchText: {
    fontSize: width * 0.045,
    color: '#83848A',
    alignSelf: 'center',
    marginLeft: width * 0.05,
  },
  gridIcon: {
    tintColor: '#9C9FA5',
  },
  profileIcon: {
    marginLeft: width * 0.05,
  },
  bottomContainer: {
    alignSelf: 'center',
    height: height * 0.1,
    width: '105%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: width * -0.005,
  },
  leftMost: {
    flexDirection: 'row',
    backgroundColor: '#313134',
    width: '50%',
  },
  rightMost: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
  },
  bottomIcon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
    marginRight: width * 0.075,
    marginTop: height * 0.012,
  },
  plusicon: {
    width: height * 0.07,
    height: height * 0.07,
    resizeMode: 'contain',
    position: 'absolute',
    top: -height * 0.050,
    right: width * 0.095,
    backgroundColor: '#3A393F',
    borderRadius: height * 0.035,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    width: '100%',
    top: 0,
    right: 0,
  },
  firstIcon: {
    marginLeft: width * 0.06,
  },
  contentBox: {
    borderWidth: 1,
    borderColor: 'white',
    padding: width * 0.025,
    marginVertical: height * 0.012,
    borderRadius: width * 0.025,
    width: '45%',
  },
  text: {
    color: 'white',
    fontSize: width * 0.03,
  },
  notesContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80
  },
  dateTime: {
    backgroundColor: '#4D4D4F',
    padding: width * 0.01,
    borderRadius: width * 0.025,
    marginTop: height * 0.01,
  }
});