import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator ,TouchableOpacity} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, } from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import {FAB} from 'react-native-paper'
import { Touchable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { flatten } from 'lodash';
import { object } from 'prop-types';

export default class ViewAnswers extends Component {

state = {
    N:[],
    loading: false,
    showQuiz: false,
    userAnswer: 0,
    asked: 0,
    quizData: [],
    year: '',
    currentQuestion: '',
    currentQuestionOptions: [],
    totalUserAnswers: [],
    totalTime:'',
    total_marks:'',
    notstart:'',
    title:'',
    quizID:'',
    quizzes:[{}],
    selectedQuiz:'',
    titles:[],
    n:[],
    ans:'',
    q:[],
    Correct : '',
    quiz_id :'',


}

   componentDidMount() {
        const { navigation } = this.props;
        const Title = navigation.getParam('Title', '')
        const currentQuestion = navigation.getParam('currentQuestion', [])
        const quiz_id = navigation.getParam('quiz_id', '')
        this.setState({Title})
        this.fetchQuizData(Title)
       // this.fetchQuizAnswer()
        console.log("TTTTT"+quiz_id)
        this.fetchQuizAnswer(quiz_id)
      //  this.fetchQuizData(quiz_id)
//      console.log("PROPSS: "+this.props.userToken)
    }
    fetchQuizData(s) {
        const { loading } = this.state
        const {title} = this.state
      //  console.log("ZZZZZZZZZZZZZZZ"+s)
        const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyNmExNTY3NDJmZjNmYjg2N2FjYjgiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MjM0OTM0OTd9.YetA4cph_K6MPU9eDW2frN3ZAwBdkmaGGFjiyWPkUTw";

        this.setState({ loading: !loading })
       // console.log(this.state.title)
        fetch(`http://192.168.1.4:3000/quizes/getQuiz/${s}/cseii3`,{
            method:"GET",
            headers: {
              "Content-Type" :"application/json",  
              "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            loading:false,  
            quizData: data.questions,
            totalTime:data.time,
            total_marks:data.total_marks,
            quizID:data._id,
          });
     //     console.log("aaaaa"+data.questions[0].grades)  
          console.log("ANSSS"+quizData)          
      }) .catch(error => {
                this.setState({ loading: false });
            })
            
    }

    fetchQuizAnswer(id) {
        const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMyNmExNTY3NDJmZjNmYjg2N2FjYjgiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiaTJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MjM0OTM0OTd9.YetA4cph_K6MPU9eDW2frN3ZAwBdkmaGGFjiyWPkUTw";
        //const id = "60fae17cdbc2101834c1c83e"
        const student_code="i2"
        const course_code="cseii3"
        console.log("My IDD  "+id)
        fetch(`http://192.168.1.4:3000/getAnswers/${id}/${course_code}/${student_code}`,{
            method:"GET",
            headers: {
              "Content-Type" :"application/json",  
              "Authorization": `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
           this.setState({N:data});

      //  console.log((this.state.N))
      }) .catch(error => {
                this.setState({ loading: false });
            })
            this.setState({q:this.state.N[-1]})  
        // console.log(this.state.q)
    }    
 
    _renderQuestion() {
        const { quizData, asked , N } = this.state;
        if (!quizData || quizData.length === 0) {
            this.fetchQuizData()
            this.fetchQuizAnswer()
        } else {
            const currentQuestion = quizData[asked].question; 
            const Correct = quizData[asked].answer;
            let options = []
 
            for(let i=0;i<quizData[asked].choices.length;i++){
                if(quizData[asked].choices[i]===N[(N.length)-1][asked].answer)
                {
            options.push(
                `Correct Answer: ${quizData[asked].choices[i]}`)
            }
                if(quizData[asked].choices[i]===quizData[asked].answer){
                    options.push(
                        `Your Answer: ${quizData[asked].choices[i]}`)
                    }
              }
        
            const currentQuestionOptions = options.map((option, index) => ({
                label: option,
                value: index,
            }))

            this.setState({ Correct,currentQuestion, currentQuestionOptions, showQuiz: true, startTime: new Date().getTime() })
        }
    }

    onPress = userAnswer => {this.setState({ userAnswer})
     console.log(this.state.userAnswer)};

    nextQuestion(last) {
        const { N,Correct,userAnswer, asked, quizData, currentQuestionOptions, totalUserAnswers } = this.state

        const currentQuestion = quizData[asked]
        
         const currentAnswer = {
             question: currentQuestion.question,
    //    correct_answer: currentQuestion.alternatives.filter((obj)=>obj.isCorrect===true)[0].text,
           userAnswer: currentQuestionOptions[userAnswer].label,
             score: currentQuestion.answer === currentQuestionOptions[userAnswer].label,
         }
         totalUserAnswers.push(currentAnswer)
         if(last) this.setState({notstart:true})   
        this.setState({
            totalUserAnswers: totalUserAnswers,
            asked: asked + 1,
            userAnswer: 0,
        }, () => (!last ? this._renderQuestion() : this.calculateResult()))

    }
    backQuestion(last) {
        const { N,Correct,userAnswer, asked, quizData, currentQuestionOptions, totalUserAnswers } = this.state
        if(asked===0)return;
        else{    
        const currentQuestion = quizData[asked]

         const currentAnswer = {
             question: currentQuestion.question,
     //        correct_answer: currentQuestion.alternatives.filter((obj)=>obj.isCorrect===true)[0].text,
             userAnswer: currentQuestionOptions[userAnswer].label,
             score: currentQuestion.answer === currentQuestionOptions[userAnswer].label,
         }

         totalUserAnswers.pop()
        if(last) this.setState({notstart:true})   
        this.setState({
            totalUserAnswers: totalUserAnswers,
            asked: asked - 1,
            userAnswer: 0,
        }, () => (!last ? this._renderQuestion() : this.calculateResult()))
      }
    }
    calculateResult() {
        const { navigate } = this.props.navigation;
        navigate('StudentData')
    }
    render() {
        const {Correct, N,loading, showQuiz, userAnswer, currentQuestion, currentQuestionOptions, quizData, asked } = this.state
        
        console.log(quizData)
        return(
     
            <View style={styles.container}>
                {
                    !showQuiz ? (
                        <View style={styles.container}>
  
                                <FAB
                                    style={styles.fab1}
                                    small
                                    label='Show Answers'
                                    icon="check"
                                    disabled={this.state.notstart}
                                    onPress={() => this._renderQuestion()
                                    }
                             />

                        </View>
                    ) : (
                            <View style={styles.quizContainer}>
                                <Text style={styles.questionCounter}>Question {asked + 1} out of {quizData.length}{"     "}{'('}{quizData[asked%quizData.length].grades}{" "}marks{')'}</Text>
                                <Text style={styles.question}>{currentQuestion}</Text>
                                <RadioForm animation>
                                {currentQuestionOptions.map((obj, i) => (
                                            <RadioButton labelHorizontal key={Math.random()}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    buttonOuterColor={"black"}
                                                    buttonSize={15}
                                                    buttonOuterSize={25}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal
                                                    onPress={()=>{return{}}}
                                                    labelStyle={{ fontSize: 18, }}
                                                    labelWrapStyle={{}}
                                                />
                                        </RadioButton>
                                        ))}                                    
                                </RadioForm>
                                <View style={{ marginTop: 60 }}>
                                    {/* quizData.length === asked + 1 */}
                                  {quizData.length === asked + 1 ? (
                                        <View style={{marginTop:60}}>
                                        <Button
                                            onPress={() => this.nextQuestion('last')}
                                            title="Finish"
                                            color="#28a745"
                                        />
                                        <Text>{'\n'}</Text>
                                         <Button
                                                onPress={() => this.backQuestion()}
                                                title="Back"
                                                color="red"
                                                />
                                        </View>

                                    ) : (
                                        <View>
                                            <View>
                                            <Button
                                                onPress={() => this.nextQuestion()}
                                                title="Next"
                                                color="#007bff"
                                            />
                                            </View>
                                            <Text>{'\n'}</Text>
                                            <View>
                                             <Button
                                                onPress={() => this.backQuestion()}
                                                title="Back"
                                                color="#007bff"
                                            />
                                            </View>
                                         </View>   
                                        )
                                    }
                                </View>
                            </View>
                        )
                }
            </View>
            
        )
}    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    //    justifyContent: 'center',
    },
    container1: {margin: 16},

    text: {
        fontSize: 40,
        color: 'blue',
    },
    warningText: {
        fontSize: 15,
        color: '#ffc107',
        marginBottom: 10,
        marginTop:10,
        marginLeft:10
    },
    errorText: {
        fontSize: 20,
        color: '#dc3545',
    },
    quizContainer: {
        width: "100%",
        padding: 20
    },
    question: {
        fontSize: 20,
        color: '#343a40',
        marginBottom: 10,
    },
    dropdownBox: {width: 100, height: 30, marginBottom: 16,},
    dropdownBoxPlaceholder: {
        color: '#777',
        right:50
},
    questionCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 10,
    },
    fab: {
        backgroundColor: 'blue',
        position: 'relative',
        margin: 20,
        //top:20
    },
    fab1: {
        backgroundColor: 'blue',
        position: 'relative',
        margin: 20,
        top:120
    }
});