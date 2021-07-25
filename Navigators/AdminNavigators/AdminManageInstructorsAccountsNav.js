import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminManageInstructorsAccountsScreen';
import AdminCreateInstructorsAccountsScreen from '../../Screens/AdminScreens/AdminCreateInstructorsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';

const AdminManageInstructorsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageInstructorsAccountsNav extends React.Component{

  state={
    searchInput: '',
    instructorsBasicData: [],
    instructorsShownData: [],
    instructors: [],
    loading: true,
  }

  componentDidMount(){
    this.getInstructors()
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.instructors.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'role' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      instructorsShownData: [...arr.sort(compareByName)], 
      instructorsBasicData: [...arr.sort(compareByName)],
      instructors: [...this.state.instructors.sort(compareByName)],
    })
  }

  getInstructors = async () => {
    try{
      this.setState({loading: true})
      const response = await fetch(
        `${url}/admins/getAllInstructors`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })

      const results = await response.json()
      if(response.status === 200){
        this.setState({instructors: results}, this.init)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        this.setState({instructors: []}, this.init)
        Toast.show(results)
      }
      this.setState({loading: false})

    } catch (err){
      console.log(err.message)
    }
  }

  handleSearch = input => {
    this.setState({searchInput: input})
    if(input === ''){
      this.setState({
        instructorsShownData: this.state.instructorsBasicData
      })
    } else{
      this.setState({
        instructorsShownData: this.state.instructorsBasicData
          .filter(function(item) {
            return !(item.name.indexOf(input) && item.code.indexOf(input))
          })
      })
    }
  }

  deleteInstructor = (code) => {
    this.setState({
        instructors: [...this.state.instructors.filter(instructor => instructor.code !== code)]
      },
      this.init
    )
  }


  render(){
    return(
      <AdminManageInstructorsAccountsNavigator.Navigator
        initialRouteName='adminManageInstructorsAccountsScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true'
        }}
        
      >
        
        <AdminManageInstructorsAccountsNavigator.Screen 
          name='adminManageInstructorsAccountsScreen'
          children={() => 
            <AdminManageInstructorsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              handleSearch={this.handleSearch}
              deleteInstructor={this.deleteInstructor}
              getInstructors={this.getInstructors}
              searchInput={this.state.searchInput}
              instructorsShownData={this.state.instructorsShownData}
              instructors={this.state.instructors}
              loading={this.state.loading}
            />
          }
          options={{
            title: 'Instructors List',
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

        <AdminManageInstructorsAccountsNavigator.Screen 
          name='adminCreateInstructorsAccountsScreen'
          children={() => 
            <AdminCreateInstructorsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              getInstructors={this.getInstructors}
            />
          }
          options={{
            title: 'Create New Accounts',
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
      </AdminManageInstructorsAccountsNavigator.Navigator>
    );
  }
}