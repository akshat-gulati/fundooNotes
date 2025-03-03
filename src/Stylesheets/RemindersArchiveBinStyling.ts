import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#212025',
    },
    container: {
        flex: 1,
        padding: width * 0.025,
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        // backgroundColor:'pink',
        width: '95%',
    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.03,
        width: height * 0.03,
    },
    helperText: {
        color: 'white',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconSpacing: {
        marginRight: width * 0.04,
    },


    //   ---------------------------------------------------
    contents: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.07,
    },
    bigImage: {
        height: height * 0.2,
        width: width * 0.3,
        resizeMode: 'contain',
        // backgroundColor
    },
    mainText: {
        color: 'white',
        marginTop: height * 0.01,
        fontSize: width * 0.05,
        textAlign: 'center',
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
