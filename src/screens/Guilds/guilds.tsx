import React from "react";
import {
    View,
    Text,
    FlatList
} from "react-native";

import { styles } from './styleGuilds';
import { theme } from "../../global/styles/theme";

import { Background } from '../../components/Background/background';
import { ListDivider } from "../../components/ListDivider/listDivider";
import { Guild, GuildProps } from "../../components/Guild/guild";

interface Props {
    handleGuildSelect:(guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props) {

   const guilds = [
       {
           id: '1',
           name: 'Lendários',
           icon: 'https://storage.qoo-static.com/game/17607/KGhkiIABcwb0ZdwWMfGGBsHCb6gQbQNX.jpg',
           owner: true
       }
   ]

    return (
        <View style={styles.container}> 
            <FlatList
                data={guilds}
                style={styles.guilds}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={()=><ListDivider/>}
                renderItem={({item}) => (
                    <Guild 
                        data={item}
                        onPress={() => handleGuildSelect(item)}
                    />
                )}
            />
        </View> 
    )
}