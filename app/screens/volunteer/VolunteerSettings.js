import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';

class VolunteerDashScreen extends Component {

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
                <Text>Hello World!</Text>

                <Button
                    title="Press me"
                    buttonStyle={styles.greenButton}
                    onPress={() => Alert.alert('Godkendt', 'Du har nu søgt jobbet xxx')}
                    />

                <Button
                    title="Press me"
                    buttonStyle={styles.blueButton}
                    onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil søge jobbet xxx?', 
                    [
                        {
                        text: 'Ja, fortsæt',
                        onPress: () => console.log('Ok pressed'),
                        style: 'default'
                        },
                        {
                        text: 'Nej, luk',
                        onPress: () => console.log('Cancel pressed'),
                        style: 'cancel',
                        },
                    ],
                    )}
                    />

                <Button 
                    buttonStyle={styles.blueButton} 
                    icon={
                        <Icon
                        name='account-balance'
                        type='material'
                        size={30}
                        color='white'
                        />
                    } />

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