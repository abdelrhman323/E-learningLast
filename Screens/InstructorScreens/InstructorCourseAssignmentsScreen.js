import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import * as Sharing from 'expo-sharing';
import * as FileSystem from "expo-file-system";

export default class InstructorCourseOverviewScreen extends React.Component {
  state = {
    title: "",
    title1: "",
    File: {
      name: "",
      size: 0,
      type: "",
      uri: "",
    },
    course_code: "",
    token: "",
    Data: [],
    downloadProgress: 0,
    document: "",
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

  AssingmentsShow() {
    this.setState({
      course_code: "cseii3",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2ODQxMjl9.59bZRIMCiSVqXuMXtuqsFHhLfc-mMFiJgcCc043-8fI",
    });
    var url = `http://192.168.1.6:3000/courses/course/assignments/${this.state.course_code}/${this.state.title}`;
    const AuthStr = "Bearer ".concat(this.state.token);
    axios
      .get(url, { headers: { Authorization: AuthStr } })
      .then((response) => {
        // If request is good...
        this.setState({ Data: response.data });
        console.log(this.state.Data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

   GetZIP = async () => {
    var url = `http://192.168.1.6:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`; 
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          Accept: "application/zip",
          "Content-Type": "application/zip",
          Authorization: `Bearer ${this.state.token}`,
        },
      });
      const content = await response.zip();
      this.DownloadThenShare(content); // Some URI
    } catch (error) {
      console.error(error);
    }
  };
   DownloadThenShare = async (uri) => {

    const result = await FileSystem.downloadInstance.downloadAsync(
      uri,
      FileSystem.documentDirectory + "assignment.zip"
    );
  
    if (result.status === 200) {
      Sharing.shareAsync(result.uri, { dialogTitle: "Salvar ou Compartilhar" });
    } else {
      alert("Failed to Download");
    }
  };
  render() {
    const dataMongo = this.state.Data.map((item, index) => {
      for (let i = 0; i < this.state.Data.length; i++) {
        var assignment = [this.state.Data[i].fileName];
      }
      return (
        <TouchableOpacity>
          <Text style={{ fontSize: 15 }} key={index}>
            {assignment}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#9ed3e5" }}>
        <View style={styles.container}>
          <TextInput
            placeholder="title of students assignment"
            style={styles.InputText}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />
          <Text>{"\n"}</Text>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.button}
            onPress={this.AssingmentsShow.bind(this)}
          >
            <Text style={styles.text}>Show Assingments</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 25, marginTop: 35 }}>Assingments</Text>
            <View>{dataMongo}</View>
          </View>
          <Text>{"\n"}</Text>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.button}
      //      onPress={this.GetZIP.bind(this)}
          >
            <Image
              style={styles.img1}
              source={require("../../assets/download.png")}
            />
            <Text style={styles.text}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9ed3e5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  button: {
    flexDirection: "row",
    height: 50,
    width: 200,
    backgroundColor: "#206a87",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f345b",
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  img1: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  InputText: {
    height: 50,
    width: 250,
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
  },
});
/*nodownload =()=>{

      fetch(`http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`, {
   
        method: "GET",
        headers: {
       
          "Authorization": `Bearer ${this.state.token}`,
        },
      })
      .then(response => response.blob())
       .then(blob => {
        var a = FileSystem.createDownloadResumable(
          `http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`,
          FileSystem.documentDirectory + this.state.Data[0].fileName,
          {},
          
        ); try {
          const { uri } =  a.downloadAsync();
          console.log('Finished downloading to ', uri);
          //setDocument(uri);
        } catch (e) {
          console.error(e);
        }       
    })
        .catch((error) => console.log(error));
    }
uploadFile = () =>{
    var formData = new FormData();
    const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyNmExNTY3NDJmZjNmYjg2N2FjYjgiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MjM0NjUyNjZ9.PYCP_IFM0-lPk_mgG3q0mxYDeHAYEqk89GbsLf-dmUc'
    //console.log(this.state.filename)  
    //console.log(this.state.title)
    formData.append('upload', {uri: this.state.File.uri
      , name: this.state.File.name, type: 'file/pdf'});
      formData.append(`title`, this.state.title);
      formData.append(`course_code`, `cseii3`);
      fetch(`http://192.168.1.6:3000'/courses/course/assignments/myAssignment/${this.state.course_code}/${this.state.title}`, {
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
  this.setState({File:{name:'',size:0,type:'',uri:''},title:''})
  }
  */
