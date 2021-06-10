import React, { useState } from 'react';
import Icons from "react-native-vector-icons/Entypo";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PickerSelect from 'react-native-picker-select';


interface Props{
    data?: any;
    screen?: string; 
}

const ListItem = ({data, screen}: Props) => {
  return (
    <View style={styles.list}>
        {data.map((item:any)=>
        (<TouchableOpacity key={item.id} style={styles.item} onPress={()=>Actions.taskDetail({task:item})}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Icons name='circle' size={24} color={item.color}></Icons>
                <Text style={{fontSize: 16, marginLeft: 10, width: screen === 'allTask'? '50%': '85%'}} numberOfLines={1}>{item.title}</Text>
            </View>
            {screen === 'allTask' && <Text style={styles.category}>category: {item.category}</Text>}
        </TouchableOpacity>))}
     </View>
  );
};

const styles = StyleSheet.create({
    list:{
        paddingLeft: 20,
    },
    item:{
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    title:{
        fontSize: 16,
        color: '#1f1f1f',
        marginLeft: 10,
        width: '50%',
    },
    category:{
        fontSize: 14,
        color: '#1f1f1f'
    }
});

export default ListItem;
