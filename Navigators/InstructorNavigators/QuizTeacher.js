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