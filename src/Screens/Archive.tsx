import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Archive = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image style={styles.icon}  source={require('../Assets/line.3.horizontal.png')} />
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Archive</Text>
                    <View style={styles.iconContainer}>
                        <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/magnifyingglass.png')} />
                        <Image style={styles.icon} source={require('../Assets/rectangle.grid.1x2.png')} />
                    </View>
                </View>

                {/* --------------------------------------------------- */}
            <View style={styles.contents}>
                <Image style={styles.bigImage} source={require('../Assets/archivebox.png')} />
                <Text style={styles.mainText}>Your archived notes appear here</Text>

            </View>


            </View>
        </SafeAreaView>
    );
};

export default Archive;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#212025',
    },
    container: {
        flex: 1,
        // padding: width * 0.025,
        alignItems:'center',
    },
    topBar:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        // backgroundColor:'pink',
        width:'95%',


    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.03,
        width: height * 0.03,
      },
      helperText:{
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
    contents:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding: width * 0.07,
    },
    bigImage:{
        height: height * 0.2,
        width: width * 0.3,
        resizeMode: 'contain',
        // backgroundColor
    },
    mainText:{
        color: 'white',
        marginTop: height * 0.01,
        fontSize: width * 0.05,
        textAlign: 'center',
    },
});
