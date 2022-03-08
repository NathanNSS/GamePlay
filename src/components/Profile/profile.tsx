import React from "react";
import { 
    View,
    Text
} from 'react-native';

import { styles } from  './profileStyle';
import { Avatar } from "../Avatar/avatar";

export function Profile(){
    return(
        <View style={styles.container}>
            <Avatar urlImage="https://github.com/nathannss.png"/>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.userName}>
                        Nathan
                    </Text>
                </View>
                <Text style={styles.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
    )
}