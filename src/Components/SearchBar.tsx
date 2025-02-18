import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <View style={styles.leftmost}>
          <Image style={styles.icon} source={require('../Assets/line.3.horizontal.png')}/>
        <Text style={{ fontSize:17,color:'#83848A', alignSelf:'center', marginLeft:20}}>Search Your Notes</Text>
        </View>
      
      <View style={styles.rightmost}>
      <Image style={[styles.icon, {tintColor: '#9C9FA5'}]} source={require('../Assets/rectangle.grid.1x2.png')} />
        <Image style={[styles.icon, {marginLeft: 20}]} source={require('../Assets/person.crop.circle.png')} />



      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        backgroundColor:'#2B2B2F',
        borderRadius:10,
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between'
        

    },
    leftmost:{
      flexDirection:'row'

    },
    icon:{
      tintColor:'white',
      resizeMode:'contain',
      height:25,
      width:25


    },
    rightmost:{
      flexDirection:'row',

    }
})