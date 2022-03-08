import React from 'react';
import {
  StatusBar
} from "react-native"

import { SignIn } from './src/screens/SingIn/singIn';
import { Home } from './src/screens/Home/home';

import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold} from "@expo-google-fonts/rajdhani";
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import { Background } from './src/components/Background/background';

export default function (){

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded) return <AppLoading/>
  return(
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Home/>
    </Background>
  )
}