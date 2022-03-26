import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import { theme } from "../global/styles/theme";

const { Navigator, Screen } = createStackNavigator();

import { SignIn } from '../screens/SingIn/singIn';

export function PublicRoutes(){
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
                name="SignIn"
                component={SignIn}
            />
           
        </Navigator>
    )
}