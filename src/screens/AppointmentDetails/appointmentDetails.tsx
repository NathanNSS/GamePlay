import React from "react";
import {
    View,
    Text,
    ImageBackground,
    FlatList
} from "react-native";

import { styles } from './styleAppointmentDetails';
import { theme } from "../../global/styles/theme";
import BannerImg from '../../assets/banner.png'

import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from "react-native-gesture-handler";
import { Background } from '../../components/Background/background';
import { Header } from "../../components/Header/header";
import { ListHeader } from "../../components/ListHeader/listHeader";
import { Member } from "../../components/Member/member";
import { ListDivider } from "../../components/ListDivider/listDivider";
import { ButtonIcon } from "../../components/ButtonIcon/buttonIcon";


export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            userName: 'Nathan',
            avatar_url: 'https://github.com/nathannss.png',
            status: 'online',
        },
        {
            id: '2',
            userName: 'Nathan',
            avatar_url: 'https://github.com/nathannss.png',
            status: 'offline',
        },
    ]

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
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
                        Lendários
                    </Text>

                    <Text style={styles.subTitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>

            </ImageBackground>

            <View style={{paddingHorizontal:24}}>
                <ListHeader
                    title="Jogadores"
                    subTitle="Total 3"
                />
            </View>
            
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                style={styles.members}
                ItemSeparatorComponent={() => <ListDivider />}
                renderItem={({ item }) => (
                    <Member
                        data={item}
                    />
                )}
            />
            <View style={styles.footer}>
                <ButtonIcon title="Entra na partida" />
            </View>
        </Background>
    )
}