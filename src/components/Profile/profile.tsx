import React from "react";
import { 
    View,
    Text,
    Alert
} from 'react-native';

import { styles } from  './profileStyle';
import { Avatar } from "../Avatar/avatar";
import { useAuth } from "../../hooks/auth";
import { RectButton } from "react-native-gesture-handler";

export function Profile(){
    const {user, logOut} = useAuth();

    function handleSignOut(){
        Alert.alert(
            'LogOut',
            'Deseja sair do GamePlay',
            [
                {
                    text:'Não',
                    style:'cancel'
                },
                {
                    text:'Sim',
                    onPress: () => logOut()
                }
            ]
        )
    }

    return(
        <View style={styles.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar}/>
            </RectButton>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.userName}>
                        {user.firstName}
                    </Text>
                </View>
                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    )
}