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

interface Props  extends TouchableOpacityProps {
    title: string; 
}

export function  ButtonIcon({title, ...rest} : Props){
    return(
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg}
                    style={styles.icon}
                />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}