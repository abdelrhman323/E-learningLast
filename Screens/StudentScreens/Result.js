<<<<<<< HEAD
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Result extends Component {
    state = {
        totalScore: '',
        totalUserAnswers: [],
    }

    componentDidMount() {
        const { navigation } = this.props;
        console.log("navigation ==>> ", navigation)
        const totalUserAnswers = navigation.getParam('totalUserAnswers', []);
        const totalScore = navigation.getParam('totalScore', 0)
        const time = navigation.getParam('time', 0)
        const total_marks = navigation.getParam('total_marks', 0)
        this.setState({ totalUserAnswers,totalScore,time ,total_marks })
    }

    render() {
        const { navigate } = this.props.navigation
        const { totalUserAnswers,totalScore,time ,total_marks }= this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Image Processing Quiz Result</Text>
                <Text style={styles.text}>Correct answer {totalScore/10} out {total_marks} </Text>
                <Text style={styles.text}>Total time {time/100} min 
                </Text>
                <Button
                    onPress={() => navigate('StudentCourseQuizzesScreen')}
                    title='Go Back'
                    color="#007bff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        color: '#343a40',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#343a40',
        marginBottom: 5,
    },
});
||||||| (empty tree)
=======
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Result extends Component {
    state = {
        totalScore: '',
        totalUserAnswers: [],
    }

    componentDidMount() {
        const { navigation } = this.props;
        //console.log("navigation ==>> ", navigation)
        const totalUserAnswers = navigation.getParam('totalUserAnswers', []);
        const totalScore = navigation.getParam('totalScore', 0)
        const time = navigation.getParam('time', 0)
        const total_marks = navigation.getParam('total_marks', 0)
        this.setState({ totalUserAnswers,totalScore,time ,total_marks })
    }

    render() {
        const { navigate } = this.props.navigation
        const { totalUserAnswers,totalScore,time ,total_marks }= this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Quiz Result</Text>
                <Text style={styles.text}>Correct answer {totalScore} out {total_marks} </Text>
                <Text style={styles.text}>Total time {time/100} sec 
                </Text>
                <Button
                    onPress={() => navigate('StudentCourseQuizzesScreen')}
                    title='Go Back'
                    color="#007bff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        color: '#343a40',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#343a40',
        marginBottom: 5,
    },
});
>>>>>>> 4e55b32 (LAST-Modified)
