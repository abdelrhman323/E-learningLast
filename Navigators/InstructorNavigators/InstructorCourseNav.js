import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InstructorCourseContentScreen from '../../Screens/InstructorScreens/InstructorCourseContentScreen'
import InstructorCourseQuizzesScreen from '../../Screens/InstructorScreens/InstructorCourseQuizzesScreen'
import InstructorCourseGradesScreen from '../../Screens/InstructorScreens/InstructorCourseGradesScreen'
import InstructorCourseAssignmentsScreen from '../../Screens/InstructorScreens/InstructorCourseAssignmentsScreen'
import Colors from '../../Constants/colors';
import InstructorCourseChatScreen from '../../Screens/InstructorScreens/InstructorCourseChatScreen'

const InstructorCourseNavigator = createBottomTabNavigator();

export default class InstructorCourseNav extends React.Component{

  componentDidMount(){
    console.log(this.props.route.params)
  }

  render(){
    return(
      <InstructorCourseNavigator.Navigator
        initialRouteName='overview'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13}
        }}  
      >
        
        <InstructorCourseNavigator.Screen
          name='content'
          children={() => <InstructorCourseContentScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
            title: 'Content'
          }}
        />
        <InstructorCourseNavigator.Screen
          name='quizzes'
          children={() => <InstructorCourseQuizzesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='clipboard-list'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
            title: 'Quizzes'
          }}
        />
        <InstructorCourseNavigator.Screen
          name='assignments'
          children={() => <InstructorCourseAssignmentsScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='file-alt'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
            title: 'Assignments'
          }}
        />
        <InstructorCourseNavigator.Screen
          name='grades'
          children={() => <InstructorCourseGradesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='mix'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
            title: 'Grades'
          }}
        />
        <InstructorCourseNavigator.Screen
          name='instructorCourseChatScreen'
          children={() => <InstructorCourseChatScreen 
            navigation={this.props.navigation} 
            user={this.props.route.params.user}
            courseCode={this.props.route.params.course.code}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='comment'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
            title: 'Chat' 
          }}
        />
      </InstructorCourseNavigator.Navigator>
    );
  }
}
