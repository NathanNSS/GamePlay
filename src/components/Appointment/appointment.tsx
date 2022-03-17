import React from "react";
import { View, Text } from 'react-native';

import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from  './styleAppointment';

import { GuildIcon } from "../GuildIcon/guildIcon";

import { categories } from "../../utils/categories";
import PlayerSvg from "../../assets/player.svg";
import CalenderSvg from "../../assets/calendar.svg";
import { theme } from "../../global/styles/theme";
import { color } from "react-native-reanimated";

export interface GuildProps {
    id: string;
    name:string;
    icon?: string | null;
    owner: boolean;
} 

interface AppointmentsProps{
    id: string;
    guild: GuildProps;
    category: string;
    date:string;
    description: string;
}

interface Props extends RectButtonProps{
    data: AppointmentsProps;
}

export function Appointment({data, ...rest}:Props){

    const [ category ] = categories.filter(item => item.id === data.category)
    const { owner } = data.guild;
    const {on, primary} = theme.colors

    return( 
        <RectButton {...rest}>
           <View style={styles.container}>
                <GuildIcon url={data.guild.icon}/>
                <View style={styles.content}>

                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {data.guild.name}
                        </Text>
                        <Text style={styles.category}>
                            {category.title}
                        </Text>
                    </View>

                    <View  style={styles.footer}>
                        <View style={styles.dateInfo}>
                            
                            <CalenderSvg/>

                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>
                        <View style={styles.playersInfo}>
                            <PlayerSvg fill={owner ? on : primary}/>
                            <Text style={[styles.player,{color: owner ? on : primary}]}>
                                {owner ? "Anfitrião" : "Visitante"}
                            </Text>
                        </View>
                    </View>

                </View>
           </View>
        </RectButton>
    )
}