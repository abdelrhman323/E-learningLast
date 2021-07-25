import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import QuizResult from '../../Navigators/StudentNavigators/QuizResult';
import Navigation from '../../Navigators/StudentNavigators/QuizResult'
/*
function WriteToFile(passForm) {
 
    set fso = CreateObject("Scripting.FileSystemObject"); 
    set s   = fso.CreateTextFile("<your Path>/filename.txt", True);
 
   
    s.writeline("First Name :" + FirstName);
    s.writeline("Last Name :" + lastName);
 
    s.writeline("-----------------------------");
    s.Close();
 }
*/
export default function StudentCourseQuizzesScreen(props) {
const userToken=props.userToken
console.log("USERTOKEEEEN: "+userToken)
return (

    <QuizResult />
    
    );
}
