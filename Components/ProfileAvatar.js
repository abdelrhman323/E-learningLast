import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Colors from '../Constants/colors';

export default class ProfileAvatar extends React.Component{
  title = this.props.name.substring(0, 2).toUpperCase()
  render(){
    return(
      <View style={styles.container}>
        <Avatar 
          rounded 
          title={this.title}
          overlayContainerStyle={styles.avatar}
          size={this.props.size === 'small' ? 35 : 80} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 10
  },
  avatar:{
    backgroundColor: Colors.primary_color,
    
  }
})