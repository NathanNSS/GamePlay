import React from "react";
import {
    View,
    Text, 
    Image,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import {styles} from "./styles";
import DiscordImg from "../../assets/discord.png"
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler'

interface Props  extends RectButtonProperties {
    title: string; 
}

export function  ButtonIcon({title, ...rest} : Props){
    return(
        <RectButton style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg}
                    style={styles.icon}
                />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    )
}