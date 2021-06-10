import React, { useState } from 'react';
import Icons from "react-native-vector-icons/Entypo";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import {addCategory} from '../../reducer/categorySlice';

interface Props{
  type:string;
}
const HeaderTodo = ({type}:Props) => {
  const absentCategory = useSelector((state:any)=>state.category.absentCategory);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const handleOnPressItem = (category:string)=>{
    dispatch(addCategory(category));
    setStatus(!status);
  }
  

  return (
    <View style={styles.header}>
        <Text style={styles.title}>{type}</Text>
        {type==="Todo List" && 
        <Icons style={styles.icon} name="dots-three-vertical" size={20} color="#fff" onPress={()=>setStatus(!status)}/>}
        {status && <View style={styles.menu}>
              {absentCategory.map((category:string)=>
                <TouchableOpacity key={category} style={styles.item} onPress={()=>handleOnPressItem(category)}>
                    <Text style={styles.itemText}>Add {category}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.item} onPress={()=>{setStatus(!status);Actions.allTask()}}>
                <Text style={styles.itemText}>Open All task</Text>
              </TouchableOpacity>
        </View>}
     </View>
  );
};

const styles = StyleSheet.create({
   header:{ 
        backgroundColor: '#DC4B3F',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
        zIndex: 100,
   },
   title:{
       color: '#fff',
       fontSize: 20,
       fontWeight: 'bold'
   },
   icon:{
    position: 'relative',
   },
   menu:{
    position: 'absolute',
    top: 45,
    right: 20,
    width: 150,
    minHeight: 30,
    backgroundColor: '#ece8e8',
    shadowColor: "black",
    borderWidth: 0.15,
    borderRadius: 4,
   },
   item:{
     flex:1,
     alignItems:'center',
     justifyContent: 'center',
     margin: 5,
   },
   itemText:{
     fontSize: 16,
   }
});

export default HeaderTodo;
