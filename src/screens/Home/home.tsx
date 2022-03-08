import React from "react";
import { 
    View,
    Text
} from 'react-native';

import { styles } from  './homeStyle';
import {Profile} from "../../components/Profile/profile"

export function Home(){
    return(
        <View>
            <View style={styles.header}>
                <Profile/>
            </View>
        </View>
    )
}