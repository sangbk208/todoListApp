import React from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  View,
} from 'react-native';
import HeaderTodo from '../../common/header/HeaderTodo';
import ListItem from '../../common/listItem/ListItem';
import { useSelector } from 'react-redux';

const AllTaskScreen = () => {
  const tasks = useSelector((state:any)=> state.task.tasks);
  return (
    <View style={styles.homeContainer}>
      <HeaderTodo type='All task'/>
      <ListItem data={tasks} screen='allTask'/>
   </View>
  );
};

const styles = StyleSheet.create({
   homeContainer:{ 
       // marginTop: 200,
       flex: 1,
      position:'relative',
   },
   icon:{
    position:'absolute',
    bottom: 30,
    right: '50%',
    transform: [{ translateX: 25 }],
  }
});

export default AllTaskScreen;
