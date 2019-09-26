import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';

class UnionProfile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Forenings Profil',
            headerTitleStyle: {
                color: 'white',
              },
              headerStyle: {
                backgroundColor: '#517BBE',
              },
              headerBackTitle: null,
              headerRight: (
                <Button
                  onPress={() => navigation.navigate('UnionSettings')}
                  icon={
                    <Icon
                      name="settings"
                      type='material'
                      size={30}
                      color="white"
                    />
                  }
                  type="clear"
                />
              ),
        }
    };

    render() {
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Forenings profil</Text>
            </ScrollView>
        )
    }
}

export default UnionProfile;

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