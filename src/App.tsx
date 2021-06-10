/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 
 import {
   Modal,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

import Icons from 'react-native-vector-icons/AntDesign';

 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './screens/homeScreen/HomeScreen';
import AddTodoScreen from './screens/addTodoScreen/AddTodoScreen';
import store, {persistor} from './reducer';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import TaskDetailScreen from './screens/taskDetailScreen/TaskDetailScreen';
import AllTaskScreen from './screens/allTaskScreen/AllTaskScreen';


 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     flex:1
   };

   return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Router>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
                <Scene key="root" hideNavBar>
                  <Scene key="home"
                    hideNavBar
                    component={HomeScreen}
                    title="home"
                    initial
                  />
                  <Scene
                    key="addTodo"
                    direction="vertical"
                    component={AddTodoScreen}
                    title="addTodo"
                    hideNavBar
                  />
                  <Scene
                    key="taskDetail"
                    direction="vertical"
                    component={TaskDetailScreen}
                    title="taskDetail"
                    hideNavBar
                  />
                  <Scene
                    key="allTask"
                    direction="vertical"
                    component={AllTaskScreen}
                    title="allTask"
                    hideNavBar
                  />
                </Scene>
          </ScrollView>
        </Router>
      </SafeAreaView>
      </PersistGate>
     </Provider>
   );
 };

 const styles = StyleSheet.create({
    
 });

 export default App;
