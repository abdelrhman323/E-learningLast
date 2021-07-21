<<<<<<< HEAD
import React from 'react'
import {Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from '../../Navigators/InstructorNavigators/index'
import {Provider as StoreProvider} from 'react-redux'
import store from '../../reducer/store'

export default function App(){
  return (
    <StoreProvider store = {store}>
    <PaperProvider>
      <AppNavigator/>
    </PaperProvider>
    </StoreProvider>
  )
}
||||||| (empty tree)
=======
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EnrolledStudent from '../../Navigators/InstructorNavigators/EnrolledStudent';
import Navigation from '../../Navigators/InstructorNavigators/EnrolledStudent'

export default function App() {
  return (
    <EnrolledStudent/>
    
    );
}
>>>>>>> 4e55b32 (LAST-Modified)
