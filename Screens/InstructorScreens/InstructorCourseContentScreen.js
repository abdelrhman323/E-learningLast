import React from 'react'
import { StyleSheet, View, Button, Text, ScrollView, Modal, FlatList } from 'react-native';
import TreeView from 'react-native-final-tree-view';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Constants/colors';

async function upload() {
  try{
    const file = await DocumentPicker.getDocumentAsync({type: 'text/*'})
    if(file.type === 'success'){
      return file
    }
    else{
      return {}
    }
  } catch(e){
    return
  }
}

export default class AdminManageStudentsAccountsScreen extends React.Component{
  
  state={
    lessons: [
      {
        id: 'Grandparent',
        name: 'Grandpa',
        age: 78,
        children: [
          {
            id: 'Me',
            name: 'Me',
            age: 30,
            children: [
              {
                id: 'Erick',
                name: 'Erick',
                age: 10,
              },
              {
                id: 'Rose',
                name: 'Rose',
                age: 12,
              },
            ],
          },
          {
            id: 'You',
            name: 'You',
            age: 30,
            children: [
              {
                id: 'Cantona',
                name: 'Cantona',
                age: 10,
              },
              {
                id: 'Pink',
                name: 'Pink',
                age: 12,
              },
            ],
          },
        ],
      },
      {
        id: 'GrandMa',
        name: 'Grandma',
        age: 78,
        children: [
          {
            id: 'We',
            name: 'We',
            age: 30,
            children: [
              {
                id: 'Toby',
                name: 'Toby',
                age: 10,
              },
              {
                id: 'Yellow',
                name: 'Yellow',
                age: 12,
              },
            ],
          },
          {
            id: 'They',
            name: 'They',
            age: 30,
            children: [
              {
                id: 'Dier',
                name: 'Dier',
                age: 10,
              },
              {
                id: 'Red',
                name: 'Red',
                age: 12,
              },
            ],
          },
        ],
      },
      
    ],
    visibleModal: false,
    lessonTitle: '',
    youtubeLink: '',
    enableAdd: false,
  }

  handleLessonTitleUpdate = lessonTitle => {
    this.setState({lessonTitle}, this.validateForm)
  }
  handleYoutubeLinkUpdate = youtubeLink => {
    this.setState({youtubeLink}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.lessonTitle.length > 0 && this.state.youtubeLink.length > 0){
      this.setState({enableAdd: true})
    }
  }

  // uploadFile = () =>{
  //   var formData = new FormData();
  //   const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzMjI3OTk1MmVhNTNhMGMyNzdmOTYiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTZAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM0MDY3NzN9.uRxlfkIbpEkbf5IIasOD0sbJKWhO0hO48mbvR0M8tng'
  //   //console.log(this.state.filename)  
  //   //console.log(this.state.title)
  //   formData.append('upload', {uri: this.state.File.uri
  //     , name: this.state.File.name, type: 'file/pdf'});
  //     formData.append(`lesson_title`, this.state.title);
  //     formData.append(`course_id`, `60c337c85b92c52224b405e4`);
  //     fetch(`http://192.168.1.4:3000/courses/course/lessonsUpload`, {
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: formData,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         if (!res.ok) {
  //           throw Error(res.status);
  //         }
  //         console.log("then data");
  //       })
  //       .catch((error) => console.log(error));
  //       this.setState({i:this.state.i+1})
  //       this.setState({ 
  //         Lessons: this.state.Lessons.concat([`Lesson${this.state.i}: ${this.state.File.name}${'\n'}`])
  //       })
  //     this.setState({File:{name:'',size:0,type:'',uri:''},title:''})
  // }
  
  uploadFile = async() => {

  }

  createLesson = () => {
    this.setState({visibleModal: false})
  }

  getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return '-'
    } else if (isExpanded) {
      return '\\/'
    } else {
      return '>'
    }
  }

  renderNode = ({node, level, isExpanded, hasChildrenNodes}) => (
    <View>
      <Text style={{marginLeft: 25*level, fontSize: 20}}>
        {this.getIndicator(isExpanded, hasChildrenNodes)} {node.name}
      </Text>
    </View>
  )

  //Open
  onNodePress = ({node, level}) => {
    if(level === 2){
      Toast.show(`PRESSED node ${node.name} in level ${level}`)
    }
  }

  //Download
  onNodeLongPress = ({node, level}) => {
    if(level === 2){
      Toast.show(`LONG PRESSED node ${node.name} in level ${level}`)
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
          <TreeView 
            data={this.state.lessons}
            renderNode={this.renderNode}
            onNodePress={this.onNodePress}
            onNodeLongPress={this.onNodeLongPress}
            getCollapsedNodeHeight={({level}) => {}}
          />
          <View style={styles.modal}>
          <Modal
            visible={this.state.visibleModal}
            onRequestClose={() => {this.setState({visibleModal: false})}}
            onMagicTap={() => {this.setState({visibleModal: false})}}            
            animationType='slide'
            transparent={false}
          >
            <View style={styles.modal}>
              <View style={styles.innerModal}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 24}}>Add Lesson</Text>
                <TextInput 
                  value={this.state.lessonTitle}
                  placeholder='Enter lesson title'
                  onChangeText={this.handleLessonTitleUpdate}
                  style={styles.input}
                />
                <TextInput 
                  value={this.state.youtubeLink}
                  placeholder='Enter youtube link'
                  onChangeText={this.handleYoutubeLinkUpdate}
                  style={styles.input}
                />
                
                <View style={styles.formButton}>
                  <Button 
                    title='Upload File'
                    onPress={this.uploadFile}
                    color={Colors.primary_color}
                  />
                </View>

                <View style={styles.formButton}>
                  <Button 
                    title='Create'
                    onPress={this.createLesson}
                    color={Colors.primary_color}
                  />
                </View>

              </View>
            </View>
          </Modal>
        </View>
        </ScrollView>
        <View style={styles.addButton}>
          <TouchableOpacity 
            onPress={() => {this.setState({visibleModal: true})}}  
            >
            <Icon 
              name='list'
              type='font-awesome'
              color='#fff'
            />
            <Text style={styles.buttonLabel}>Add lesson</Text>
          </TouchableOpacity>
        </View>
      </View>
         
    );
  }
}


const styles = StyleSheet.create({
  container: {height: '100%', padding: 16, backgroundColor: '#fff'},
  scroller: {},
  buttonLabel: {color: '#fff', fontSize: 7, textAlign: 'center'},
  addButton: {width: 50, height: 50, borderRadius: 30, alignSelf: 'flex-end', 
                  backgroundColor: Colors.primary_color, justifyContent: 'center',marginBottom: 8},
  modal: {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22,},
  innerModal: {height: '100%', width: '80%', margin: 20, paddingBottom: 80, backgroundColor: "#eee", borderRadius: 20, padding: 15, alignItems: "center", justifyContent: 'center'},
  input: {borderBottomWidth: 1, marginBottom: 16, width: '80%', position: 'relative'},
  formButton: {marginVertical: 8}

});
