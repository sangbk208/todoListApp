import React from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  View,
} from 'react-native';
import HeaderTodo from '../../common/header/HeaderTodo';
import Category from './categoty/Category';
import { Actions } from 'react-native-router-flux';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const categories = useSelector((state: any)=> state.category.categories);

  return (
    <View style={styles.homeContainer}>
       <HeaderTodo type='Todo List'/>
       <ScrollView style={{marginBottom: 60}}
          contentInsetAdjustmentBehavior="automatic">
         {categories.map((category:string)=>
           <Category key={category} type={category}/>
         )}
        </ScrollView>
       <Icons style={styles.icon} onPress={()=>Actions.addTodo()} name={"pluscircleo"} size={60} color="#999999" />
   </View>
  );
};

const styles = StyleSheet.create({
   homeContainer:{ 
       flex: 1,
      position:'relative',
   },
   icon:{
    position:'absolute',
    bottom: 0,
    right: '50%',
    transform: [{ translateX: 30 }],
  }
});

export default HomeScreen;
