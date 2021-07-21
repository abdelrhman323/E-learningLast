<<<<<<< HEAD
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Quiz from '../../Screens/StudentScreens/Quiz'
import Result from '../../Screens/StudentScreens/Result'
import StudentCourseQuizzesScreen from '../../Screens/StudentScreens/StudentCourseQuizzesScreen'

const StackNavigator = createStackNavigator({
Quiz: {
    screen: Quiz
},
Result: {
    screen: Result
},

StudentCourseQuizzesScreen: {
    screen: StudentCourseQuizzesScreen
},
},
{
    initialRouteName: 'Quiz',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)
||||||| (empty tree)
=======
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import CreateShow from '../../Screens/InstructorScreens/CreateShow'
import CreateQuiz from '../../Screens/InstructorScreens/CreateQuiz'
import Quizzes from '../../Screens/InstructorScreens/Quizzes'
import QuizTeacher from '../../Screens/InstructorScreens/QuizTeacher'
import InstructorCourseQuizzesScreen from '../../Screens/InstructorScreens/InstructorCourseQuizzesScreen'

const StackNavigator = createStackNavigator({
CreateShow:{
screen:CreateShow
},
CreateQuiz: {
    screen: CreateQuiz
},
Quizzes: {
    screen: Quizzes
},
QuizTeacher: {
    screen: QuizTeacher

},

InstructorCourseQuizzesScreen: {
    screen: InstructorCourseQuizzesScreen
},
},
{
    initialRouteName: 'CreateShow',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)
>>>>>>> 4e55b32 (LAST-Modified)
