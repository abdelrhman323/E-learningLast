import React from 'react'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StudentCourseContentScreen from '../../Screens/StudentScreens/StudentCourseContentScreen'
import StudentCourseQuizzesScreen from '../../Screens/StudentScreens/StudentCourseQuizzesScreen'
import StudentCourseGradesScreen from '../../Screens/StudentScreens/StudentCourseGradesScreen'
import StudentCourseAssignmentsScreen from '../../Screens/StudentScreens/StudentCourseAssignmentsScreen'
import Colors from '../../Constants/colors';
import StudentCourseChatScreen from '../../Screens/StudentScreens/StudentCourseChatScreen'

const StudentCourseNavigator = createBottomTabNavigator();

export default class StudentCourseNav extends React.Component{
  
  render(){
    return(
      <StudentCourseNavigator.Navigator
        initialRouteName='overview'
        backBehavior='none'
        
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: true
        }}  
      >
        
        <StudentCourseNavigator.Screen
          name='content'
          children={() => <StudentCourseContentScreen 
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
                size={size} />),
            title: 'Content'
          }}
        />
        <StudentCourseNavigator.Screen
          name='quizzes'
          children={() => <StudentCourseQuizzesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.route.params.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='clipboard-list'
                type='font-awesome-5' 
                color={color} 
                size={size} />),
            title: 'Quizzes'
          }}
          
        />
        <StudentCourseNavigator.Screen
          name='assignments'
          children={() => <StudentCourseAssignmentsScreen 
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
                size={size} />),
            title: 'Assignments'
          }}
        />
        <StudentCourseNavigator.Screen
          name='grades'
          children={() => <StudentCourseGradesScreen 
            navigation={this.props.navigation} 
            userToken={this.props.route.params.userToken}
            course={this.props.route.params.course}
            instructorName={this.props.route.params.instructorName}
          />}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='mix'
                type='font-awesome-5' 
                color={color} 
                size={size} />),
            title: 'Grades'
          }}
        />
        <StudentCourseNavigator.Screen
          name='studentCourseChatScreen'
          children={() => <StudentCourseChatScreen 
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
                size={size} />),
            title: 'Chat'
          }}
        />
      </StudentCourseNavigator.Navigator>
    );
  }
}
