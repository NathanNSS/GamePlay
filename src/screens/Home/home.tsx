import React, { useState } from "react";
import { View } from 'react-native';

import { styles } from  './homeStyle';
import {Profile} from "../../components/Profile/profile"
import { ButtonAdd } from "../../components/ButtonAdd/buttonAdd";
import { CategorySelect } from "../../components/CategorySelect/categorySelect";

export function Home(){
    const [ category, setCategory] = useState('')

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }
    return(
        <View>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd/>
            </View>

            <View>
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                 />
            </View>
        </View>
    )
}