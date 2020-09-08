import React, { useState } from 'react';
import {Text, StyleSheet, View, ImageBackground, Dimensions} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const LoggedOut = () => {

    const navigation = useNavigation();

    function handleNavigationToRegister(){
        navigation.navigate('Register', {
        });
    }

    function handleNavigationToLogin(){
        navigation.navigate('Login', {
        });
    }

return (
    <ImageBackground
      style={styles.image}
      source={{uri: 'https://p0.pxfuel.com/preview/496/127/599/stars-starry-sky-the-night-sky-star-royalty-free-thumbnail.jpg'}}
    >
        

        <View >
          <Text style={styles.appNameText} >IDEALIZE APP</Text>
        </View>

        <View style={styles.actionButtonsView} >

          <View >
            <RectButton style={styles.ButtonLogin} onPress={handleNavigationToLogin} >
              <Text style={styles.textLogin} >LOGIN</Text>
            </RectButton>
          </View>

          
            <RectButton
              style={styles.ButtonRegister}
              onPress={handleNavigationToRegister}
            >
              <Text style={styles.textRegister} >REGISTER</Text>
            </RectButton>
          
        </View>

        
    </ImageBackground>
);

}

export default LoggedOut;

const styles = StyleSheet.create({
  textLogin: {
    paddingTop:10,
    color:'black',
    fontSize:13,
  },

  textRegister: {
    paddingTop:10,
    color:'white',
    fontSize:13,
  },

  appNameText:{
    fontSize:50,
    textAlign:"center",
    color:'white',
    top: screenWidth/screenHeight
  },

  actionButtonsView:{

    paddingBottom:10,
    paddingTop:10,

    backgroundColor:'white',
    top: screenWidth-99,
    alignItems:'center',
    
  },
  ButtonLogin:{

    alignItems:'center',

    backgroundColor:'white',

    width:167,
    height: 52,

    borderRadius:10,
    borderWidth:3,
    borderColor:'black',
  },
  ButtonRegister:{

    alignItems:'center',
    

    backgroundColor:'black',

    width:167,
    height: 52,

    borderRadius:10,
    borderWidth:3,
    borderColor:'white',

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});