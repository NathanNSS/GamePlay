import React from "react";
import {
    View,
    Text,
    Image,
    Alert,
    ActivityIndicator
} from "react-native"; 
import {styles} from './styleSingIn';

import { useAuth } from "../../hooks/auth";

import  IllustrationImg from '../../assets/illustration.png';

import { ButtonIcon } from "../../components/ButtonIcon/buttonIcon";
import { useNavigation } from "@react-navigation/native"
import { Background } from '../../components/Background/background';
import { theme } from "../../global/styles/theme";

 
export function SignIn(){

    const {user, loading, signIn} = useAuth()

    const navigation = useNavigation()

    async function handleSignIn() {
        try {
            await signIn();
        } catch (error){
            Alert.alert(String(error))
        }
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
                    {loading ?
                        <ActivityIndicator color={theme.colors.primary}/>
                            :
                        <ButtonIcon 
                            title="Entrar Com Discord"
                            activeOpacity={0.7}
                            onPress={handleSignIn}
                        />
                    }
                </View>
                
            </View>
        </Background>
    )
}