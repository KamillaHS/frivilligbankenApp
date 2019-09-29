import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, AsyncStorage } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

const USERSTATUS_URL = 'http://kamilla-test.000webhostapp.com/app/checkUserStatus.php';

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

    state = {
        userStatus: []
    }

    async getUserStatus() {
        AsyncStorage.getItem('UserID')
        const response = await fetch(USERSTATUS_URL, {
            credentials: 'include',
        });
        
        this.setState({ userStatus: await response.json() })
    }

    componentDidMount() {
        this.getUserStatus();
    }

    render() {
        const { userStatus } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Velkommen Navn</Text>
                </View>

                <View style={{width: '100%'}}>
                    <TouchableOpacity style={userStatus.interests > 0 ? styles.fillInterest : styles.fillInterest}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.text, {fontSize: 18}]}>Din Profil er Inaktiv</Text>
                        <Icon
                            name='clear'
                            type='material'
                            size={25}
                            color='#4c4c4c'
                            
                        />
                    </View>
                    <Text style={[styles.text, {fontSize: 15}]}>For at aktivere din profil skal du tilføje dine interesser. Klik her for at tilføje dine interesser.</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={userStatus.memberships > 0 ? {display: 'none'} : styles.fillMemberships}>

                    </TouchableOpacity>

                    <View style={userStatus.memberships > 0 ? styles.job : {display: 'none'}}>
                        <Text>map af job her</Text>
                    </View>
                </View>

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
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        marginBottom: 10
    },
    text:{
        color: '#4c4c4c',
    },
    fillInterest:{
        backgroundColor: 'rgba(232,67,53,0.3)',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        alignSelf: 'center'
    },
    job:{

    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
      },
      blueButton:{
        backgroundColor:"#517BBE",
        borderRadius:10,
      },
});