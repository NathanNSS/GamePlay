import React, { ReactNode } from "react";
import {
    View,
    Modal,
    ModalProps,
    TouchableWithoutFeedback,
} from "react-native";

import { styles } from './styleModalView';
import { theme } from "../../global/styles/theme";

import { Background } from "../Background/background";

interface Props extends ModalProps {
    children: ReactNode;
    closeModal: () => void;
}

export function ModalView({ children, closeModal, ...rest }: Props) {

    return (
        <Modal
            transparent={true}
            animationType="slide"
            statusBarTranslucent={true}
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar} />
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}