import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput, } from 'react-native-gesture-handler';
import DropdownMenus from '../../Components/DropdownMenus';
import UsersTable from '../../Components/UsersTable';
import Spinner from 'react-native-loading-spinner-overlay'
import Colors from '../../Constants/colors';
import { compareByName } from '../../Constants/Functions';
import { url } from '../../Constants/numbers';

export default class AdminManageAdminsAccountsScreen extends React.Component{
  
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
              {`${this.props.adminsShownData.length} Admins`}
            </Text>
            {/* <TouchableOpacity
              onPress={this.getAdmins}
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
          userType={'Admin'}
          attributes={this.state.attributes} 
          usersShownData={this.props.adminsShownData} 
          users={this.props.admins}
          userToken={this.props.userToken}
          navigation={this.props.navigation} 
          refresh={this.props.getAdmins}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff',},
  fixedView: {marginBottom: 20},
  searchBox: {alignSelf: 'center', borderBottomWidth: 1, width: '100%', paddingLeft: 8},
  row: {flexDirection: 'row', marginTop: 20, alignItems: 'center' ,justifyContent: 'space-between'},
  counter: {fontSize: 16, color: '#000'},
  refreshIcon: {backgroundColor: Colors.primary_color, borderRadius: 40, width: 30, height: 30, justifyContent: 'center'}
});
