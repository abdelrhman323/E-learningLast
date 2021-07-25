import React from "react";
import { StyleSheet, View, Button, Text ,TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import UsersTable from "../../Components/UsersTable";
import * as DocumentPicker from "expo-document-picker";
import { FAB } from "react-native-paper";
import axios from "axios";
import { concat, isEmpty } from "lodash";
export default class AdminManageStudentsAccountsScreen extends React.Component {
  state = {
    quizzes: [{}],
      }
 QuizzesShow() {
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
    const course_code ='cseii3'
    var url = `http://192.168.1.4:3000/quizes/getQuizTitles/${course_code}`;
    const AuthStr = "Bearer ".concat(Token);
    axios
    .get(url, {headers: { "Authorization": AuthStr } })
      .then((response) => {
        // If request is good...
        let i=0
        console.log("length: "+response.data.length)
        while(i<response.data.length){
      //  console.log(response.data[i].title)
      //  console.log(response.data[i]._id)
          i+=1
        }
        this.setState({quizzes:response.data})
        
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }
  componentDidMount(){
    this.QuizzesShow();
}
match(item){
for(let i=0;i<this.state.quizzes.length;i++){
  if(this.state.quizzes[i]._id===item){
    this.removeData(this.state.quizzes[i]._id)
  }
}
}
 removeData = (id) => {  
  const course_code ='cseii3'
 const URL = `http://192.168.1.4:3000/delete/${id}/${course_code}`
 const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI"
 const res=axios.delete(URL, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
console.log(res.status)
}    
  render() {
    const { navigate } = this.props.navigation;
    let x= this.state.quizzes.length
     const dataMongo = this.state.quizzes.map((item, index) => {
     
      var quiz=[item.title,'\n']   
       return (
         <TouchableOpacity  style={{marginBottom:20}}
         onPress={()=>{
           this.match(item._id)
           console.log(item._id)
          }
          }
          >
            {isEmpty(item) ? 
            (<Text style={{ fontSize: 20 ,
              backgroundColor:'blue',textAlign:'center',color:'white',
              borderRadius:5,
              marginTop:10,
              height:30,
              fontWeight:'bold',
              width:200,
              }}  key={index}>
             No Quizzes Exist
            </Text>):
            (<Text style={{ fontSize: 20 ,
             backgroundColor:'blue',textAlign:'center',color:'white',
             borderRadius:5,
             marginTop:10,
             height:30,
             fontWeight:'bold',
             width:200,
             }}  key={index}>
             {quiz}
           </Text>)}
         </TouchableOpacity>
       );
     });
  
    return (
      <ScrollView>
          <View style={{ width:250,marginTop: 35 ,marginLeft:25}}>
              {dataMongo}
       </View>
       <Button
                    onPress={() => navigate('CreateShow')}
                    title='Go Back'
                    color="#007bff"
                />
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
