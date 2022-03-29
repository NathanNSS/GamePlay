import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList
} from "react-native";

import { styles } from './styleGuilds';
import { theme } from "../../global/styles/theme";

import { Load } from '../../components/Load/load';
import { ListDivider } from "../../components/ListDivider/listDivider";
import { Guild, GuildProps } from "../../components/Guild/guild";
import api from "../../service/api";

interface Props {
    handleGuildSelect:(guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props) {

    const [ guilds, setGuilds] = useState<GuildProps[]>([]);
    const [ loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchGuilds();
    },[])

    return (
        <View style={styles.container}> 
            {
                loading ? <Load/> :
                <FlatList
                    data={guilds}
                    style={styles.guilds}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=><ListDivider isCentered={true}/>}
                    //ListHeaderComponent={()=> <ListDivider isCentered={true}/>}
                    contentContainerStyle={{paddingVertical:40}}
                    renderItem={({item}) => (
                        <Guild 
                            data={item}
                            onPress={() => handleGuildSelect(item)}
                        />
                    )}
                />
            }
        </View> 
    )
}