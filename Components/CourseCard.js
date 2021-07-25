import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { url } from '../Constants/numbers';

export default class CourseCard extends React.Component{


	handleSelect = async() => {

		try{
			const response = await fetch(`${url}/courses/course/${this.props.courseCode}`,{
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + this.props.userToken,        
				},
			})
			const result = await response.json()
			this.props.navigation.navigate(`${this.props.userType}CourseNav`, {
				user: this.props.user,
				userToken: this.props.userToken,
				course: result.course,
				instructorName: result.instructor_name
			})
			
		} catch(e){
			console.log(e)
		}
		
	}

  render(){
    return(
      <TouchableOpacity 
				onPress={this.handleSelect}
			>
				<Card>
					<Card.Title style={styles.title}>
						{`${this.props.courseName} ${this.props.courseCode}`}
					</Card.Title>
					<Card.Image source={require('../assets/login_img1.png')} />
					
      	</Card>
			</TouchableOpacity>
    );      
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 24
  },

	instructor: {
		marginBottom: 10, 
		alignItems: 'center'
	},
	instructorText: {
		fontSize: 18
	}
	
})