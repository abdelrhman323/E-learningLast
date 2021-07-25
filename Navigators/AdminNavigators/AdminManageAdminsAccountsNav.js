import React from 'react'
import {createBottomTabNavigator, useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import AdminManageAdminsAccountsScreen from '../../Screens/AdminScreens/AdminManageAdminsAccountsScreen';
import AdminCreateAdminsAccountsScreen from '../../Screens/AdminScreens/AdminCreateAdminsAccountsScreen';
import Colors from '../../Constants/colors';
import { Icon } from 'react-native-elements';
import { url } from '../../Constants/numbers';
import { compareByName } from '../../Constants/Functions';

const AdminManageAdminsAccountsNavigator = createBottomTabNavigator()

export default class AdminManageAdminsAccountsNav extends React.Component{


  state={
    searchInput: '',
    adminsBasicData: [],
    adminsShownData: [],
    admins: [],
    loading: true,
  }

  componentDidMount(){
    this.getAdmins()
  }

  init = () => {
    const arr = []
    let obj = {}
    this.state.admins.map((item) => {
      Object.keys(item).map((key) => {
        key === 'name' || key === 'code' || key === 'createdAt' ? obj[key] = item[key]
        : null
      })
      arr.push(obj)
      obj={}
    })
    this.setState({
      adminsShownData: [...arr.sort(compareByName)], 
      adminsBasicData: [...arr.sort(compareByName)],
      admins: [...this.state.admins.sort(compareByName)],
    })
  }

  getAdmins = async () => {
    try{
      this.setState({loading: true})
      const response = await fetch(
        `${url}/admins/getAdmins`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.props.userToken,        
        }
      })
      
      const results = await response.json()
      this.setState({loading: false})
      if(response.status === 200){
        this.setState({admins: results}, this.init)
      }
      else if(response.status === 500){
        Toast.show('Server Error')
      }
      else{
        this.setState({admins: []}, this.init)
        Toast.show(results)
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
        adminsShownData: this.state.adminsBasicData
      })
    } else{
      this.setState({
        adminsShownData: this.state.adminsBasicData
        .filter(function(item) {
          return !(item.name.indexOf(input) && item.code.indexOf(input))
        })
      })
    }
  }



  render(){
    return(
      <AdminManageAdminsAccountsNavigator.Navigator
        initialRouteName='adminManageAdminsAccountsScreen'
        backBehavior='none'
        tabBarOptions={{
          activeTintColor: Colors.primary_color,
          labelStyle: {fontSize: 13},
          keyboardHidesTabBar: 'true'
        }}
      >
        
        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminManageAdminsAccountsScreen'
          children={() => 
            <AdminManageAdminsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              handleSearch={this.handleSearch}
              getAdmins={this.getAdmins}
              searchInput={this.state.searchInput}
              adminsShownData={this.state.adminsShownData}
              admins={this.state.admins}
              loading={this.state.loading}
            />
          }
          options={{
            title: 'Admins List',
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

        <AdminManageAdminsAccountsNavigator.Screen 
          name='adminCreateAdminsAccountsScreen'
          children={() => 
            <AdminCreateAdminsAccountsScreen 
              navigation={this.props.navigation} 
              userToken={this.props.userToken}
              getAdmins={this.getAdmins}
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
      </AdminManageAdminsAccountsNavigator.Navigator>
    );
  }
}