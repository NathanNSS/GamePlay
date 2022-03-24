import { StyleSheet} from "react-native";
import { theme } from "../../global/styles/theme";


export const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        width:'100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 75,
        marginBottom: 42,
    },
    content:{
        flex:1,
        marginTop:42
    },
    matches:{
        marginTop:24,
        //marginLeft:24,
        marginHorizontal:24
    }
})