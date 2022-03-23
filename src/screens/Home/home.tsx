import React, { useState } from "react";
import { View, FlatList } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { styles } from  './styleHome';

import {Profile} from "../../components/Profile/profile"
import { ListHeader } from "../../components/ListHeader/listHeader";
import { ButtonAdd } from "../../components/ButtonAdd/buttonAdd";
import { CategorySelect } from "../../components/CategorySelect/categorySelect";
import { Appointment } from "../../components/Appointment/appointment";
import { ListDivider } from "../../components/ListDivider/listDivider";

import { Background } from '../../components/Background/background';


export function Home(){
    const [ category, setCategory] = useState('')

    const navigation = useNavigation()

    const appointments = [
        {
            id:'1',
            guild:{
                id:'1',
                name:'Lendários',
                icon: null,
                owner: true
            },
            category:'1',
            date:'22/06 ás 20:40h',
            description:'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        },
        {
            id:'2',
            guild:{
                id:'1',
                name:'Épicos',
                icon: 'https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551',
                owner: false
            },
            category:'3',
            date:'23/06 ás 19:00h',
            description:'Jogando com amigos'
        }
    ]

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }
    
    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails')
    }
    return(
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
                hasCheckBox={false}
            />
            <View style={styles.content}>
                <View style={{paddingHorizontal:24}}>
                    <ListHeader title="Partidas Agendadas" subTitle=" Total 6" />
                </View>

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={()=> <ListDivider/>}
                    renderItem={({item }) =>(
                        <Appointment 
                            data={item}
                            onPress={handleAppointmentDetails}
                        />
                    )}
                />
            </View>
            
        </Background>
    )
}