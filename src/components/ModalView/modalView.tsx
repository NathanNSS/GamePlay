import React, { ReactNode } from "react";
import {
    View,
    Text,
    Modal,
    ModalProps
} from "react-native";

import { styles } from './styleModalView';
import { theme } from "../../global/styles/theme";

import { Background } from "../Background/background";

interface Props extends ModalProps {
    children: ReactNode;
}

export function ModalView({children, ...rest}:Props) {
   
    return (
        <Modal 
            transparent={true}
            animationType="slide"
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Background>
                        <View style={styles.bar}/>                        
                        {children}
                    </Background>
                </View>
            </View>
        </Modal> 
    )
}