import React from "react";
import { View, Image } from 'react-native';

import { styles } from  './styleGuildIcon';

interface Props {
    url?: string | null;
}

export function GuildIcon({url}:Props){
   const uri = url ? url : "https://techgara.com/uploads/2021/7/discord-icon-1.jpg"
    return( 
        <Image 
            source={{uri}}
            style={styles.image}
            resizeMode="cover"    
        />
    )
}