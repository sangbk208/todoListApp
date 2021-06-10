import React, { useState } from 'react';
import HeaderTodo from '../../common/header/HeaderTodo';
import Icons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { Actions } from 'react-native-router-flux';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../reducer/taskSlice';
import PickerSelect from 'react-native-picker-select';
import { addCategory } from '../../reducer/categorySlice';

interface Props{
    data?: any;
}

const colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is Required'),
  });

const AddTodoScreen = ({data}: Props) => {
    const categories = useSelector((state: any)=> state.category.categories);
    const [selectedValue, setSelectedValue] = useState("To-do");
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#F44336');
    const onChange = (event:any, selectedDate:any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };
   
  return (
    <View style={styles.addTodo}>
        <HeaderTodo type='Add Task'/>
        <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values:any) => {
                if (isEnabled){
                    values.time = String(date);
                } else {
                    values.time = NaN;
                }
                Actions.pop();
                if (categories.indexOf(selectedValue)<0){
                    dispatch(addCategory(selectedValue));
                }
                dispatch(addTask({...values, color: selectedColor, category: selectedValue}));
            }}
        >
            {({ handleChange, handleBlur, handleSubmit,touched, values, errors }) => (
            <View style={styles.form}>
                {/* title */}
                <Text style={styles.lable}>Title</Text>
                {errors.title && touched.title ? (
                    <Text style={styles.error}>{errors.title}</Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                />
                {/* Description */}
                <Text style={styles.lable}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                />
                {/*  */}
                <Text style={styles.lable}>Category</Text>
                <PickerSelect
                    Icon={()=><Icons name="keyboard-arrow-down" size={30} color="#999999" />}
                    style={pickerSelectStyles}
                    value = {selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                    items={[
                        { label: 'To-do', value: 'To-do' },
                        { label: 'Completed', value: 'Completed' },
                        { label: 'Pending', value: 'Pending' },
                        { label: 'Failed', value: 'Failed' },
                    ]}
                />
                {/* color */}
                <ScrollView  horizontal style={{marginTop: 20}}>
                    {colors.map(color=>{
                        return (
                        <Text key={color} onPress={()=>setSelectedColor(color)} style={{marginRight: 8, width: 40, height: 40, 
                                    backgroundColor: color}}>
                            {selectedColor===color && <Icons name='check' size={40}></Icons>}
                        </Text>)
                    })}
                </ScrollView>
                {/* switch */}
                <View style={styles.wrapSwitch}>
                    <Switch style={styles.switch}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                    <Text style={styles.lable}>Set due date</Text>
                </View>
                {isEnabled && <View style={styles.wrapTime}>
                    <DateTimePicker
                        style={styles.date}
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    <DateTimePicker
                        style={styles.time}
                        testID="dateTimePicker"
                        value={date}
                        mode='time'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                </View>
                }
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Add todo</Text>
                </TouchableOpacity>
            </View>
            )}
        </Formik>
     </View>
  );
};

const styles = StyleSheet.create({
    addTodo:{
    },
    form:{
        padding: 20,
    },
    lable:{
        color: 'black',
        fontSize: 20,
        marginVertical: 5,
        fontWeight: '500'
    },
    input:{
        marginBottom: 5,
        paddingLeft: 10,
        height: 45,
        fontSize: 18,
        backgroundColor: '#f6f5fb',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 4
    },
    error:{
        color: '#B00020',
    },
    wrapSwitch:{
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center'
    },
    switch:{
        marginRight: 10,
    },
    wrapTime:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    date:{
        width: 125,
        marginRight: 10,
    },
    time:{
        width: 95,
    },
    button:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    buttonText:{
        color: '#1976D2',
        fontSize: 24,
    },
    select:{
        fontSize: 20,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    //   marginTop: 10,
      fontSize: 20,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  

export default AddTodoScreen;
