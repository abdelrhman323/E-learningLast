import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import UsersTable from '../../Components/UsersTable';
import Spinner from 'react-native-loading-spinner-overlay'
import Colors from '../../Constants/colors';
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';

export default class AdminManageInstructorsAccountsScreen extends React.Component{
  
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
          <View style={styles.row}>
            <Text style={styles.counter}>
              {`${this.props.instructorsShownData.length} Instructors`}
            </Text>
            {/* <TouchableOpacity
              onPress={this.getInstructors}
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
          userType={'Instructor'}
          attributes={this.state.attributes} 
          usersShownData={this.props.instructorsShownData}
          users={this.props.instructors}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          deleteUser={this.props.deleteInstructor}
          refresh={this.props.getInstructors}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff'},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
