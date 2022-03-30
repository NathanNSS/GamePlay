import React, { useState } from "react";
import { 
    View,
    Text,
    Alert
} from 'react-native';

import { styles } from  './profileStyle';
import { Avatar } from "../Avatar/avatar";
import { useAuth } from "../../hooks/auth";
import { RectButton } from "react-native-gesture-handler";
import { LogOut } from "../LogOut/logOut";

export function Profile(){
    
    const [ modal, setModal] = useState(false)

    const { user } = useAuth();

    function closeModal(){
        setModal(false)
    }
    
    function handleSignOut(){
        setModal(true)
        // Alert.alert(
        //     'LogOut',
        //     'Deseja sair do GamePlay',
        //     [
        //         {
        //             text:'Não',
        //             style:'cancel'
        //         },
        //         {
        //             text:'Sim',
        //             onPress: () => logOut()
        //         }
        //     ]
        // )
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
            <LogOut visible={modal} closeModal={closeModal}/>
        </View>
    )
}