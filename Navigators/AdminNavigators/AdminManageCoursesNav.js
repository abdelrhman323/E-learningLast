import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageCoursesScreen from '../../Screens/AdminScreens/AdminManageCoursesScreen';
import AdminCreateCoursesScreen from '../../Screens/AdminScreens/AdminCreateCoursesScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';
import { url } from '../../Constants/numbers';
import { compareByName } from '../../Constants/Functions';

const AdminManageCoursesNavigator = createBottomTabNavigator()

export default class AdminManageCoursesNav extends React.Component{

  state={
    searchInput: '',
    year: '0',
    coursesBasicData: [],
    coursesShownData: [],
    courses: [],
    coursesByYear: [],
    loading: true,
  }

  
  componentDidMount(){
    this.getCourses()
  }

  init = () => {
    this.setState({
      coursesByYear: [...this.state.courses.filter((course) => {
        if(this.state.year==='0'){
          return true
        }
        else{
          return this.state.year===course.year
        }
      })]
    }, () => {
      const arr = []
      let obj = {}
      this.state.coursesByYear.map((item) => {
        Object.keys(item).map((key) => {
          key === 'name' || key === 'code' || key === 'year' ? obj[key] = item[key]
          : null
        })
        arr.push(obj)
        obj={}
      })
      this.setState({
        coursesShownData: [...arr.sort(compareByName)], 
        coursesBasicData: [...arr.sort(compareByName)],
        courses: [...this.state.courses.sort(compareByName)],
        coursesByYear: [...this.state.coursesByYear.sort(compareByName)],
      })
    })  
  }

  getCourses = async () => {
    try{
      this.setState({loading: true})
      const response = await fetch(
        `${url}/admins/courses`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      if(response.status === 200){
        this.setState({courses: [...results]}, this.init)
      }
      else if(response.status === 404){
        this.setState({courses: []}, this.init)
        Toast.show(results)
      }
      else if(response.status === 403){
        this.setState({courses: []}, this.init)
        Toast.show('Unauthorithed')
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      this.setState({loading: false})

    } catch (err){
      console.log(err.message)
    }
  }

  handleSearch = input => {
    this.setState({searchInput: input})
    if(input === null){
      this.setState({
        coursesShownData: this.state.coursesBasicData
      })
    } else{
      this.setState({
        coursesShownData: [...this.state.coursesBasicData
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })]
      })
    }
  }

  filterByYear = (year) => {
    this.setState({loading: true})
    this.init()
    this.setState({
      coursesShownData: [...this.state.coursesBasicData.filter(function(course){
        if(year === '0'){
          return true
        }
        else{
          return course.year===year
        }
      })],
      coursesByYear: [...this.state.courses.filter(function(course){
        if(year === '0'){
          return true
        }
        else{
          return course.year===year
        }
      })]
    }, () => {
      this.setState({loading: false})
    })
  }

  handleYearChange = (year) => {
    if(year!=='0'){
      this.setState({year: year, searchInput: ''}, () => this.filterByYear(year))
    }
    else{
      this.setState({year: year, searchInput: ''},this.getCourses)
    }
  }

  deleteCourse = (code) => {
    this.setState({
        courses: [...this.state.courses.filter(function(course){return course.code !== code})]
      },
      this.init
    )
  }



  render(){
    return(
      <AdminManageCoursesNavigator.Navigator
        initialRouteName='adminManageCoursesScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true',
        }}
        
        
      >
        
        <AdminManageCoursesNavigator.Screen 
          name='adminManageCoursesScreen'
          children={() => 
            <AdminManageCoursesScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              handleSearch={this.handleSearch}
              handleYearChange={this.handleYearChange}
              deleteCourse={this.deleteCourse}
              getCourses={this.getCourses}
              searchInput={this.state.searchInput}
              year={this.state.year}
              coursesShownData={this.state.coursesShownData}
              coursesByYear={this.state.coursesByYear}
              loading={this.state.loading}
            />
          }
          options={{
            title: 'Courses List',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='list'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />

        <AdminManageCoursesNavigator.Screen 
          name='adminCreateCoursesScreen'
          children={() => 
            <AdminCreateCoursesScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              getCourses={this.getCourses}
            />
          }
          options={{
            title: 'Create New Course',
            tabBarIcon: ({color, size}) =>(
              <Icon 
                name='plus'
                type='font-awesome-5' 
                color={color} 
                size={size} 
              />
            ),
          }}
        />
      </AdminManageCoursesNavigator.Navigator>
    );
  }
}