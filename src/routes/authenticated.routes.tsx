import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import { theme } from "../global/styles/theme";

const { Navigator, Screen } = createStackNavigator();

import { Home } from '../screens/Home/home';
import { AppointmentDetails } from "../screens/AppointmentDetails/appointmentDetails";
import { AppointmentCreate } from "../screens/AppointmentCreate/appointmentCreate";

export function AuthRoutes(){
    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle:{
                    backgroundColor:theme.colors.secondary100
                }
            }}
        >          

            <Screen
                name="Home"
                component={Home}
            />
            
            <Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
            
            <Screen
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
            
        </Navigator>
    )
}