import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      top:'80%'
  },
  overlay:{
      flex:1,
      backgroundColor: theme.colors.overlay
  },
  content:{
     padding:20,
     alignItems: 'center',
  },
  title:{
     fontSize:20,
     fontFamily: theme.fonts.title700,
     color: theme.colors.heading
  },
  textPrimary:{
   fontSize:20,
   fontFamily: theme.fonts.title700,
   color: theme.colors.primary
  },
  containerBtn:{
     width:'100%',
     flexDirection:'row',
     justifyContent:'space-between',
     marginTop: 24
  },
  btn:{
     width:160,
     height: 56,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:8,
  },
  btnBorder:{
      flex:1,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      borderWidth: 1,
      borderColor: theme.colors.secondary30,
      borderRadius:8
  },
  btnText:{
     color:theme.colors.heading,
     fontFamily: theme.fonts.text500,
     fontSize: 15
  }
})