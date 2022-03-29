import React from "react";
import { View, Image } from 'react-native';

import { styles } from  './styleGuildIcon';
import DiscordSvg from '../../assets/discord.svg'

const { CDN_IMAGE } = process.env;

interface Props {
    guildId: string;
    iconId: string | null;
}

export function GuildIcon({guildId,iconId}:Props){
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`
    //"https://techgara.com/uploads/2021/7/discord-icon-1.jpg"
    return( 
        <View style={styles.container}>
            {  
                iconId ? 
                    <Image 
                        source={{uri}}
                        style={styles.image}
                        resizeMode="cover"    
                    />
                :
                    <DiscordSvg
                        width={40}
                        height={40}
                    />
            }

        </View>
    )
}