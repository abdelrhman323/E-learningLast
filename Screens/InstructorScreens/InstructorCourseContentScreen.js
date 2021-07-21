<<<<<<< HEAD
import React from 'react'
import { StyleSheet, View, Button,Text } from 'react-native';
import { ScrollView, TextInput, } from 'react-native-gesture-handler';
import UsersTable from '../../Components/UsersTable';
import * as DocumentPicker from 'expo-document-picker';
import { FAB} from 'react-native-paper'

 
export default class AdminManageStudentsAccountsScreen extends React.Component{
  
  state={
    Lessons:[],
    title:'',
    File:{
      name:'',
      size:0,
      type:'',
      uri:''
    },
    i:1
};
selectFile = async() =>{
  const file = await DocumentPicker.getDocumentAsync()
 
  console.log( file )
  if(file.type === 'success'){
    this.setState({File:file}) 
  }
  else{
    alert('Error:Cannot Select this File')
  } 
}

uploadFile = () =>{
  var formData = new FormData();
  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0MDY3NzN9.uRxlfkIbpEkbf5IIasOD0sbJKWhO0hO48mbvR0M8tng'
  //console.log(this.state.filename)  
  //console.log(this.state.title)
  formData.append('upload', {uri: this.state.File.uri
    , name: this.state.File.name, type: 'file/pdf'});
    formData.append(`lesson_title`, this.state.title);
    formData.append(`course_id`, `60c337c85b92c52224b405e4`);
    fetch(`http://192.168.1.4:3000/courses/course/lessonsUpload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw Error(res.status);
        }
        console.log("then data");
      })
      .catch((error) => console.log(error));
      this.setState({i:this.state.i+1})
      this.setState({ 
        Lessons: this.state.Lessons.concat([`Lesson${this.state.i}: ${this.state.File.name}${'\n'}`])
      })
this.setState({File:{name:'',size:0,type:'',uri:''},title:''})
}


 SampleFunction=(item)=>{
 
    Alert.alert(item);
 
  }
  render(){

    return(
      <ScrollView>   
      <View> 
         
        <FAB
            style={styles.fab}
            small
            label='Choose File'
            onPress={this.selectFile.bind(this)}
            
        />        
        <FAB
            style={styles.fab1}
            small
            icon='plus'
            label='Add Lessons'
            onPress={this.uploadFile.bind(this)}
        />
                            <TextInput
                      placeholder='title'
                      style={styles.InputText}
                      onChangeText={(title) => this.setState({title})}
                      value={this.state.title}
                      />
                      <View style={styles.MainContainer}> 
      { this.state.Lessons.map((item, key)=>(
      <Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
      )}
    </View>     

      </View>
      </ScrollView>      
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  fixedView: {marginBottom: 20},
  fab: {
    backgroundColor: 'blue',
    position:'relative',
    margin: 20,
    right: 0,
    width :150
},
fab1: {
  backgroundColor: 'blue',
  position:'relative',
  margin: 20,
  right: 0,
  width :150
},
InputText:
{
height: 50, 
width: 150,
fontSize: 15,
backgroundColor:'white',
borderRadius:5,
paddingLeft:10,
position:'relative',
marginLeft: 25,
marginTop:10,
},  
MainContainer: {
  flex: 1,
  margin: 10,
  backgroundColor:'#c2c2c2', 
  borderRadius:10,
},
TextStyle:{
  fontSize : 15,
   textAlign: 'center',
   fontWeight:'bold',
   color:'#5b5858',
   marginTop:7
}
});
||||||| (empty tree)
=======
import React from "react";
import { StyleSheet, View, Button, Text ,TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import UsersTable from "../../Components/UsersTable";
import * as DocumentPicker from "expo-document-picker";
import { FAB } from "react-native-paper";
import axios from "axios";
import { concat } from "lodash";
export default class AdminManageStudentsAccountsScreen extends React.Component {
  state = {
    Lessons: [],
    title: "",
    File: {
      name: "",
      size: 0,
      type: "",
      uri: "",
    },
    i: 1,
  };
  selectFile = async () => {
    const file = await DocumentPicker.getDocumentAsync();

    console.log(file);
    if (file.type === "success") {
      this.setState({ File: file });
    } else {
      alert("Error:Cannot Select this File");
    }
  };

  uploadFile = () => {
    var formData = new FormData();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0OTQwMjV9.CAFoceovNWiG8SpB85NmJEA4tF7d_lk-XlUvppHv7ss";
    //console.log(this.state.filename)
    //console.log(this.state.title)
    formData.append("upload", {
      uri: this.state.File.uri,
      name: this.state.File.name,
      type: "file/pdf",
    });
    formData.append(`lesson_title`, this.state.title);
    formData.append(`course_id`, `60c337c85b92c52224b405e4`);
    fetch(`http://192.168.1.6:3000/courses/course/lessonsUpload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw Error(res.status);
        }
        console.log("then data");
      })
      .catch((error) => console.log(error));
    this.setState({ i: this.state.i + 1 });
    // this.setState({
    //   Lessons: this.state.Lessons.concat([
    //     `Lesson${this.state.i}: ${this.state.File.name}${"\n"}`,
    //   ]),
    // });
    this.setState({
      File: { name: "", size: 0, type: "", uri: "" },
      title: "",
    });

  };

  SampleFunction = (item) => {
    Alert.alert(item);

  };

  LessonsShow() {
  
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0OTQwMjV9.CAFoceovNWiG8SpB85NmJEA4tF7d_lk-XlUvppHv7ss"
    const id ='60c337c85b92c52224b405e4'
    var url = `http://192.168.1.6:3000/courses/lessons/${id}`;
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
  componentWillMount(){
    this.LessonsShow();
}
  render() {
    const dataMongo = this.state.Lessons.map((item, index) => {
     
     var lesson=[item,'\n']   
      return (
        <TouchableOpacity >
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
  
    return (
      <ScrollView>
        <View>
          <FAB
            style={styles.fab}
            small
            label="Choose File"
            onPress={this.selectFile.bind(this)}
          />
          <FAB
            style={styles.fab1}
            small
            icon="plus"
            label="Add Lessons"
            onPress={this.uploadFile.bind(this)}
          />
          <TextInput
            placeholder="title"
            style={styles.InputText}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <View style={{ width:250,marginTop: 35 ,marginLeft:25}}>
              {dataMongo} 
       </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  fixedView: { marginBottom: 20 },
  fab: {
    backgroundColor: "blue",
    position: "relative",
    margin: 20,
    right: 0,
    width: 150,
  },
  fab1: {
    backgroundColor: "blue",
    position: "relative",
    margin: 20,
    right: 0,
    width: 150,
  },

  InputText: {
    height: 50,
    width: 150,
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    position: "relative",
    marginLeft: 25,
    marginTop: 10,
  },
  MainContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#c2c2c2",
    borderRadius: 10,
  },
  TextStyle: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5b5858",
    marginTop: 7,
  },
});
>>>>>>> 4e55b32 (LAST-Modified)
