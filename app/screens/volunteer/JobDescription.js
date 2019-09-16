import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

/*
const JOB_URL = 'http://192.168.0.22:8080/frivilligbanken/app/singleJob.php';
*/
class VolunteerDashScreen extends Component {

    static navigationOptions = {
        title: 'Job Beskrivelse',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
          backTitle: null,
    };

    /*
    state = { 
        jobData: [] 
    }

    async getJob() {
        try {
            const response = await fetch(JOB_URL)

            this.setState({ jobData: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getJob();
    }

    */

    render() {
        const id = this.props.navigation.getParam('id');
        /*
        const { jobData } = this.state;
        */
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Hello World!</Text>
                
                <Text>{id}</Text>
            </ScrollView>
        )
    }
}

export default VolunteerDashScreen;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
      },
      blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
      },
});