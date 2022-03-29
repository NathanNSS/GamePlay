import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    FlatList,
    Alert,
    Share,
     Platform
} from "react-native";

import { Fontisto } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import * as Linking from 'expo-linking';
import api from "../../service/api";

import { styles } from './styleAppointmentDetails';
import { theme } from "../../global/styles/theme";

import BannerImg from '../../assets/banner.png'
import { Background } from '../../components/Background/background';
import { Header } from "../../components/Header/header";
import { ListHeader } from "../../components/ListHeader/listHeader";
import { Member, MemberProps } from "../../components/Member/member";
import { ListDivider } from "../../components/ListDivider/listDivider";
import { ButtonIcon } from "../../components/ButtonIcon/buttonIcon";
import { AppointmentsProps } from "../../components/Appointment/appointment";
import { Load } from "../../components/Load/load";

interface Params  {
    guildSelected: AppointmentsProps
}

interface GuildWidget{
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();

    const navigation = useNavigation()

    const { guildSelected } = route.params as Params

    

    async function fetchGuildwidget() {
        try{
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        }catch{
            Alert.alert(
                    '⚠ Atenção',
                    'Verifique as configuração do servidor. E necessário a ativação do Widget nas configurações do servidor !',
                    [
                        {text: "OK", onPress: ()=> backHome()}
                    ]
                )
        }finally{
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        if(widget.instant_invite !== null){
            const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;
            Share.share({
                message,
                url:  widget.instant_invite
            });
        }else{
            Alert.alert(
                '⚠ Atenção',
                'Verifique as configuração do servidor. E necessário você tenha permissão para gerar o convite e que o servidor esteja configurado na categoria Widget nas configurações do servidor !',
                )
        }
    }

    function backHome(){
        navigation.navigate('Home')
    }
    
    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }

    useEffect(()=>{
        fetchGuildwidget();
    },[])
    
    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name="share"
                            size={21}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subTitle}>
                        {guildSelected.description}
                    </Text>
                </View>

            </ImageBackground>
            {
                loading || Object.keys(widget).length <= 0 ? <Load/> :
                <>           
                    <View style={{paddingHorizontal:24}}>
                        <ListHeader
                            title="Jogadores"
                            subTitle={`Total ${widget.members.length}`}
                        />
                    </View>
                    
                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        style={styles.members}
                        ItemSeparatorComponent={() => <ListDivider isCentered={true}/>}
                        renderItem={({ item }) => (
                            <Member
                                data={item}
                            />
                        )}
                    />
                    {
                        widget.instant_invite !== null ? 
                            <View style={styles.footer}>
                                <ButtonIcon title="Entra na partida" onPress={handleOpenGuild} />
                            </View>
                        :
                            <></>
                    }
                    
                </>
            }
        </Background>
    )
}