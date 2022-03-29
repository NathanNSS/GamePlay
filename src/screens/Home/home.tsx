import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList } from 'react-native';

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from  './styleHome';

import {Profile} from "../../components/Profile/profile"
import { ListHeader } from "../../components/ListHeader/listHeader";
import { ButtonAdd } from "../../components/ButtonAdd/buttonAdd";
import { CategorySelect } from "../../components/CategorySelect/categorySelect";
import { Appointment, AppointmentsProps } from "../../components/Appointment/appointment";
import { ListDivider } from "../../components/ListDivider/listDivider";
import { Load } from "../../components/Load/load";

import { Background } from '../../components/Background/background';
import { COLLECTION_APPOINTMENTS } from "../../configs/database";


export function Home(){
    const [ category, setCategory] = useState('')
    const [ loading, setLoading] = useState(true)
    const [ appointments, setAppointments] = useState<AppointmentsProps[]>([])
    const navigation = useNavigation()

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }
    
    function handleAppointmentDetails(guildSelected: AppointmentsProps){
        navigation.navigate('AppointmentDetails',{guildSelected})
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        }else{
            setAppointments(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(()=>{
        loadAppointments();
    },[category]))

    // useEffect(()=>{
    //     loadAppointments();
    // },[category])

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
            {
                loading ? <Load/> :
            
                <View style={styles.content}>
                    <View style={{paddingHorizontal:24}}>
                        <ListHeader title="Partidas Agendadas" subTitle={` Total ${appointments.length}`} />
                    </View>

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=> <ListDivider/>}
                        contentContainerStyle={{paddingBottom:40}}
                        renderItem={({item }) =>(
                            <Appointment 
                                data={item}
                                onPress={()=>handleAppointmentDetails(item)}
                            />
                        )}
                    />
                </View>
            }
        </Background>
    )
}