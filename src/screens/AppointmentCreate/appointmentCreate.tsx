import React,{ useState} from "react";
import {
    View,
    Text,
    Platform,
    ScrollView,
    KeyboardAvoidingView
 } from "react-native";

 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { useNavigation } from "@react-navigation/native";
 import {RectButton} from 'react-native-gesture-handler';
 import { Feather } from '@expo/vector-icons'
 import uuid from 'react-native-uuid' 

 import { COLLECTION_APPOINTMENTS } from "../../configs/database";

import { styles } from './styleAppointmentDetails';
import { theme } from "../../global/styles/theme";


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
   const [category, setCategory] = useState('1')
   const [openGuildsModal, setOpenGuildsModal] = useState(false)
   const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [hour, setHour] = useState('')
   const [minute, setMinute] = useState('')
   const [description, setDescription] = useState('')

    const navigation = useNavigation()

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }
    
    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }

    function handleGuildSelect(guildSelect:GuildProps) {
        setGuild(guildSelect);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string){
        setCategory(categoryId);
    }

    async function handleSave(){
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointment = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointment, newAppointment])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >   
            <Background>
                <ScrollView>
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
                                        guild.name ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image} />
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
                                        <SmallInput maxLength={2} onChangeText={setDay} />
                                        <Text style={styles.divider}>
                                            /
                                        </Text>
                                        <SmallInput maxLength={2} onChangeText={setMonth} />
                                    </View> 
                                </View>
                                
                                <View>
                                    <Text style={styles.label}>
                                        Hora e Minuto
                                    </Text>

                                    <View style={styles.column}>
                                        <SmallInput maxLength={2} onChangeText={setHour}/>
                                        <Text style={styles.divider}>
                                            : 
                                        </Text>
                                        <SmallInput maxLength={2} onChangeText={setMinute}/>
                                    </View> 
                                </View>
                                


                            </View>
                            
                            <View style={[styles.field, { marginBottom:5}]}>
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
                                placeholder="Descrição da Partida"
                                placeholderTextColor={theme.colors.highlight}
                                onChangeText={setDescription}                               
                            />

                            <View style={styles.footer}>
                                <Button title="Agendar" onPress={handleSave}/>
                            </View>

                        </View> 
                        <ModalView
                            visible={openGuildsModal}
                            closeModal={handleCloseGuilds}
                        > 
                            <Guilds handleGuildSelect={handleGuildSelect}/>
                        </ModalView>            
                </ScrollView>
            </Background>
        </KeyboardAvoidingView>
    )
}