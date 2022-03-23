import React from "react";
import {
    View,
    Text, 
    Image,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import {styles} from "./styleButton";
import DiscordImg from "../../assets/discord.png"
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler'

interface Props  extends RectButtonProperties {
    title: string; 
}

export function  Button({title, ...rest} : Props){
    return(
        <RectButton style={styles.container} {...rest}>
          
            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}