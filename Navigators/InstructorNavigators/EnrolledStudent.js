import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import StudentData from '../../Screens/InstructorScreens/StudentData'
import Enrollers from '../../Screens/InstructorScreens/Enrollers'
import ViewAnswers from '../../Screens/InstructorScreens/ViewAnswers'
import InstructorCourseGradesScreen from '../../Screens/InstructorScreens/InstructorCourseGradesScreen'

const StackNavigator = createStackNavigator({
    
Enrollers:{
screen:Enrollers
},

StudentData: {
    screen: StudentData
},
ViewAnswers: {
    screen: ViewAnswers
},

InstructorCourseGradesScreen: {
    screen: InstructorCourseGradesScreen
},
},
{
    initialRouteName: 'Enrollers',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)