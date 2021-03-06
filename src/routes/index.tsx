import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/auth";

import { AuthRoutes } from "./authenticated.routes";
import { PublicRoutes } from "./public.routes";

export function Routes (){
    const { user } = useAuth();

    return(
        <NavigationContainer>
            {user.id ? <AuthRoutes/> : <PublicRoutes/>}
        </NavigationContainer>
    )
    
}