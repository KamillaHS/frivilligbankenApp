import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';

class UnionJobs extends Component {

    static navigationOptions = {
        title: 'Mine Oprettede Jobs',
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
                <Text>Forenings jobs mm.</Text>
            </ScrollView>
        )
    }
}

export default UnionJobs;

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