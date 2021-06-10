import React, { useState } from 'react';
// import { ListItem } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../../../common/listItem/ListItem';
import { deleteCategory } from '../../../reducer/categorySlice';

interface Props{
    type: string,
}


const Category = ({type}:Props) => {
    const task = useSelector((state:any)=> state.task.tasks);
    const [openList, setOpenList] = useState(true);
    const dispatch = useDispatch();
  return (
    <View style={styles.category}>
        <View style={styles.wrapCategory}>
            <Text style={styles.title}>{type}</Text>
            <View style={styles.wrapIcon}>
                <Icons onPress={()=>setOpenList(!openList)} name={openList?"keyboard-arrow-up":"keyboard-arrow-down"} size={24} color="#999999" />
                {(type==='Pending' || type==='Failed') &&<Icons onPress={()=>dispatch(deleteCategory(type))} style={styles.iconDelete}  name="delete" size={24} color="#999999" />}
            </View>
        </View>
        {openList && <ListItem data={task.filter((item:any)=>item.category === type)}/>}
     </View>
  );
};

const styles = StyleSheet.create({
    category:{ 
    marginTop: 20,
   },
   title:{
       color: '#1f1f1f',
       fontSize: 16,
       fontWeight: 'bold'
   },
   wrapCategory:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomColor: '#999999',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   },
   wrapIcon:{
    flexDirection: 'row',
   },
   iconDelete:{
    marginLeft: 10,
   }
});

export default Category;
