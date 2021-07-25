import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Quiz from '../../Screens/StudentScreens/Quiz'
import Result from '../../Screens/StudentScreens/Result'
import ViewAnswers from '../../Screens/StudentScreens/ViewAnswers'
import StudentCourseQuizzesScreen from '../../Screens/StudentScreens/StudentCourseQuizzesScreen'


const StackNavigator = createStackNavigator({
Quiz: {
    screen: Quiz
},
Result: {
    screen: Result
},
ViewAnswers: {
    screen: ViewAnswers
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