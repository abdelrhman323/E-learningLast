<<<<<<< HEAD
import React from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import UsersTable from '../../Components/UsersTable';


 
export default class StudentCourseContentScreen extends React.Component{
  
  state={
    attributes: ['Week', 'Work',],
    studentsShownData: [
      ['Week1', 'Lesson1'],
      ['Week2', 'Lesson2'],
      ['Week3', 'Lesson3'],
      ['Week4', 'Lesson4'],
      ['Week5', 'Lesson5'],
      ['Week6', 'Lesson6'],
      ['Week7', 'Lesson7'],
 ]
};


  render(){

    return(  
      <View>      
        <UsersTable 
          userType={'Student'}
          attributes={this.state.attributes} 
          usersShownData={this.state.studentsShownData} 
          navigation={this.props.navigation} 
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  
});
||||||| (empty tree)
=======
import React,{useEffect} from 'react'
import { StyleSheet, View, Button,TouchableOpacity,Text,ScrollView,Image} from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import axios from 'axios'
import * as FileSystem from "expo-file-system";

export default class StudentCourseContentScreen extends React.Component{
state  ={
  Lessons:[],
  downloads:'',
} 
  LessonsShow() {
  
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0OTQwMjV9.CAFoceovNWiG8SpB85NmJEA4tF7d_lk-XlUvppHv7ss"
    const id ='60c337c85b92c52224b405e4'
    var url = `http://192.168.1.4:3000/courses/lessons/${id}`;
    const AuthStr = "Bearer ".concat(Token);
    axios
    .get(url, {headers: { Authorization: AuthStr } })
      .then((response) => {
        // If request is good...
        this.setState({ Lessons: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }
  makeDowload() {
    console.log("Downloads: "+this.state.downloads)
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0OTQwMjV9.CAFoceovNWiG8SpB85NmJEA4tF7d_lk-XlUvppHv7ss"
    const id ='60c337c85b92c52224b405e4'
    var url = `http://192.168.1.6:3000/courses/lessons/lesson/${id}/${this.state.downloads}`;
    const AuthStr = "Bearer ".concat(Token);
    FileSystem.downloadAsync(
     url,
     FileSystem.documentDirectory  + this.state.downloads +'.pdf',
     {headers:{Authorization: AuthStr}}
   )
     .then(({ uri }) => {
       if(this.state.downloads){
       alert('Finished downloading to '+uri);
       }
       else {alert("Can't download")}
     })
     .catch(error => {
       console.error(error);
     });
 
 }
  componentDidMount(){
    this.LessonsShow();
}
  render(){
    const dataMongo = this.state.Lessons.map((item, index) => {
     
      var lesson=[item,'\n']   
       return (
         <TouchableOpacity  >
           <Text style={{ fontSize: 20 ,
            backgroundColor:'blue',textAlign:'center',color:'white',
            borderRadius:5,
            marginTop:10,
            height:30,
            fontWeight:'bold',
            width:200,
             }}  key={index}>
             {lesson}
           </Text>

         </TouchableOpacity>
       );
     });
     
    return(
      <ScrollView>
      <View>
        <Text style={{
          height:100,
          padding:20,
          fontSize:40,fontWeight:'bold',
          color:'blue',textAlign:'center',
          marginTop:10,backgroundColor:'gray'}}>
            Course Content
            </Text>
        </View>  
      <View style={{ width:250,marginTop: 35 ,marginLeft:25}}>
        {dataMongo} 
      </View>
      <View >
      <TextInput
              placeholder="title of downloaded lesson"
              style={styles.InputText}
              onChangeText={(downloads) => this.setState({ downloads })}
              value={this.state.downloads}
            />
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.button}
              onPress={this.makeDowload.bind(this)}
            >
              <Image
                style={styles.img1}
                source={require("../../assets/download.png")}
              />
              <Text style={styles.text}>Download</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  img1: {
    width: 40,
    height: 40,
    marginLeft: 150,
    flexDirection:'column'
  },
  InputText: {
    height: 50,
    width: 250,
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    marginTop:20,
    marginBottom:20,
    marginLeft:20
  },
  button: {
    flexDirection: "row",
    height: 50,
    width: 200,
    backgroundColor: "#206a87",
    alignItems: "center",
    borderRadius: 7,
    textAlign:'center',
    marginLeft:20
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    position:'absolute',
    marginLeft:10
  },
});
>>>>>>> 4e55b32 (LAST-Modified)
