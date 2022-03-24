import React from "react";
import {
    View,
    Text,
    Image
} from "react-native"; 
import {styles} from './styleSingIn';

import { useAuth } from "../../hooks/auth";

import  IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from "../../components/ButtonIcon/buttonIcon";
import { useNavigation } from "@react-navigation/native"
import { Background } from '../../components/Background/background';

 
export function SignIn(){

    const {user} = useAuth()

    const navigation = useNavigation()

    function handleSignIn() {
        navigation.navigate('Home')
    }

    return(
        <Background>
            <View style={styles.container}>
                
                <Image source={IllustrationImg}
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se{'\n'}
                        e organize suas{'\n'}
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games{'\n'}
                        favoritos com seus amigos
                    </Text>

                    <ButtonIcon 
                        title="Entrar Com Discord"
                        activeOpacity={0.7}
                        onPress={handleSignIn}
                    />
                </View>
                
            </View>
        </Background>
    )
}