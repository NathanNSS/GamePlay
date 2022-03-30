import React from 'react';

import {
   View,
   Text,
   Modal,
   TouchableOpacity,
   TouchableWithoutFeedback,
   ModalProps,
} from 'react-native';

import { styles } from './styleLogOut';

import { useAuth } from '../../hooks/auth'
import { Background } from '../Background/background';
import { RectButton } from 'react-native-gesture-handler';

interface Props extends ModalProps {
   closeModal: () => void;
}

export function LogOut({ closeModal, ...rest }: Props) {

   const { logOut } = useAuth();

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
                     <View style={styles.content}>
                        <Text style={styles.title}>
                           Deseja sair do Game<Text style={styles.textPrimary}>Play</Text> ?
                        </Text>
                        <View style={styles.containerBtn}>
                           <TouchableOpacity
                              onPress={closeModal}
                              activeOpacity={0.3}
                              style={styles.btn}
                           >
                              <View style={styles.btnBorder}>
                                 <Text style={styles.btnText}>Não</Text>
                              </View>
                           </TouchableOpacity>
                           <TouchableOpacity
                              onPress={ () => logOut()}
                              style={[styles.btn, { backgroundColor: '#E51C44' }]}
                           >
                              <Text style={styles.btnText}>Sair</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </Background>
               </View>
            </View>
         </TouchableWithoutFeedback>
      </Modal>
   );
}