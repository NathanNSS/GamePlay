import React from "react";
import {
   ScrollView
} from "react-native";

import {styles} from "./styleCategorySelect";
import {RectButton, RectButtonProperties} from 'react-native-gesture-handler'

import { categories } from "../../utils/categories";
import { Category } from "../Category/category";

interface Props  {
    categorySelected: string;
    setCategory:(categoryId: string)=> void ;
}

export function CategorySelect({categorySelected, setCategory}:Props){
    return(
        <ScrollView style={styles.container} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight:40}}
        >
         {
             categories.map(category => (
                <Category
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={()=> setCategory(category.id)} 
                />
             ))
         }   
        </ScrollView>
    )
}