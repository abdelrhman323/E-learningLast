import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import UsersTable from '../../Components/UsersTable';
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-simple-toast'
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';
import Colors from '../../Constants/colors';

export default class AdminManageCoursesScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
  }

  render(){

    return(
      <View style={styles.container}>
        <Spinner visible={this.props.loading}/>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            value={this.props.searchInput}
            onChangeText={this.props.handleSearch}
            style={styles.searchBox}
          />
          <View flexDirection='row' style = {styles.dropDownContainer}>
            <DropDownPicker
              items={[
                {label: 'All Courses', value: '0',},
                {label: 'Year 1', value: '1',},
                {label: 'Year 2', value: '2', },
                {label: 'Year 3', value: '3', },
                {label: 'Year 4', value: '4', },
                {label: 'Year 5', value: '5', },
              ]}
              onChangeItem={item => {
                this.props.handleYearChange(item.value)
              }}
              placeholder={'Year'}
              defaultValue={'0'}
              style={styles.menu}
              itemStyle={styles.item}
              dropDownStyle={styles.dropdown}
              containerStyle={styles.box}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.counter}>
              {`${this.props.coursesShownData.length} Courses`}
            </Text>
            {/* <TouchableOpacity
              onPress={() => this.getCourses(this.state.year)}
              style={styles.refreshIcon}
            >
              <Icon 
                name='refresh'
                color={'#fff'}  
              />
            </TouchableOpacity> */}
          </View>
        </View>
        
        <UsersTable 
          userType={'Course'}
          attributes={this.state.attributes} 
          usersShownData={this.props.coursesShownData} 
          users={this.props.coursesByYear}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          deleteUser={this.props.deleteCourse}
          refresh={this.props.getCourses}
          year={this.props.year}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16,},
  fixedView: {marginBottom: 10},
  searchBox: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  dropDownContainer: {justifyContent: 'space-around'},
  menu: {backgroundColor: '#fafafa',},
  item: {justifyContent: 'flex-start'},
  dropdown: {backgroundColor: '#fafafa',},
  box: { width: '100%', height: 40},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
