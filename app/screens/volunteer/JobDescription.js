import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

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

    render() {
        const id = this.props.navigation.getParam('id')
        
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