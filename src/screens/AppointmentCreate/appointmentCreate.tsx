import React,{ useState} from "react";
import {
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView
 } from "react-native";
 import {RectButton} from 'react-native-gesture-handler';

import { styles } from './styleAppointmentDetails';
import { theme } from "../../global/styles/theme";


import { Feather } from '@expo/vector-icons'
import { Background } from '../../components/Background/background';
import { Header } from "../../components/Header/header";
import { CategorySelect } from "../../components/CategorySelect/categorySelect";
import { ListHeader } from "../../components/ListHeader/listHeader";
import { SmallInput } from "../../components/SmallInput/smallInput";
import { GuildIcon } from "../../components/GuildIcon/guildIcon";
import { TextArea } from "../../components/TextArea/textArea";
import { ModalView } from "../../components/ModalView/modalView";
import { Button } from "../../components/Button/button";
import { Guilds } from "../Guilds/guilds";
import { GuildProps } from "../../components/Guild/guild";



export function AppointmentCreate() {
   const [category, setCategory] = useState('')
   const [openGuildsModal, setOpenGuildsModal] = useState(false)
   const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleGuildSelect(guildSelect:GuildProps) {
        setGuild(guildSelect);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >   
            <ScrollView>
                <Background>
                    <Header
                        title="Agendar Partida"
                    />
                    
                    <Text style={[styles.label, {marginLeft:25, marginTop:36, marginBottom:18}]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                        hasCheckBox={true}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? <GuildIcon url={guild.icon}/> : <View style={styles.image} />
                                }
                                
                                <View style={styles.selectBody}>
                                    <Text style={[styles.label,{marginBottom:0}]}>
                                        {guild.name ? guild.name : 'Selecione um Servidor'}
                                    </Text>
                                </View>
                                <Feather
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={styles.label}>
                                    Dia e Mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2}/>
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput maxLength={2}/>
                                </View> 
                            </View>
                            
                            <View>
                                <Text style={styles.label}>
                                    Hora e Minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2}/>
                                    <Text style={styles.divider}>
                                        : 
                                    </Text>
                                    <SmallInput maxLength={2}/>
                                </View> 
                            </View>
                            


                        </View>
                        
                        <View style={[styles.field, { marginBottom:12}]}>
                            <ListHeader
                                title="Descrição"
                                subTitle="Max 100 caracteres"
                            />
                        </View>

                        <TextArea
                            autoCorrect={true}
                            multiline={true}
                            maxLength={100}
                            numberOfLines={5}
                            textAlignVertical={"top"}
                        />

                        <View style={styles.footer}>
                            <Button title="Agendar"/>
                        </View>

                    </View> 
                    <ModalView
                        visible={openGuildsModal}
                    > 
                        <Guilds handleGuildSelect={handleGuildSelect}/>
                    </ModalView>            
                </Background>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}