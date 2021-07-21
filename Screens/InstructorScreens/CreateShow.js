import React, { Component,useState } from 'react'
import {Text, View, TextInput,Button,TouchableOpacity,ScrollView ,Platform,StyleSheet} from 'react-native'
import {FAB} from 'react-native-paper'
export default class CreateQuiz extends Component {
    
render() {
    const { navigate } = this.props.navigation;
    return(
  <ScrollView>		
	<View style={styles.container}>    
    <FAB
        small
        icon='plus'
        label='Create Quiz'
        onPress={() => navigate('CreateQuiz')} 
        style={{backgroundColor:'blue',marginTop:50,marginBottom:50,width:120,right:40}}
        />
        <FAB
        small
        icon='eye'
        label='Show Quizzes '
        onPress={() => navigate('Quizzes')} 
        style={{backgroundColor:'blue',marginTop:50,marginBottom:50,width:120,right:40}}
        />
        </View>
       </ScrollView>
        )
        }
}
const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth:2,
        width:350,
        alignContent:'center',
        marginLeft:20,
        marginTop:20,
        position:'relative',
        borderRadius:7,
        borderColor:'blue'
      },
      buttonView: {
      flexDirection: 'row'
      },
      textInput: {
      height: 40,
      borderColor: 'black', 
      borderWidth: 1,
      margin: 20,
      position:'relative'
    },
    row:{
      flexDirection: 'row',
      justifyContent: 'center'
      },
      
})