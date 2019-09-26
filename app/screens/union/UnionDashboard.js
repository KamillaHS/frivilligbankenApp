import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';

class UnionDashboard extends Component {

    static navigationOptions = {
        title: 'Forside',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
      };

    render() {
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Forenings forside</Text>
            </ScrollView>
        )
    }
}

export default UnionDashboard;

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