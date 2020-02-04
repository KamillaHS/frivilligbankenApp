import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider, CheckBox } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

const USERINTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/volunteerInterests.php';
const INTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/getInterests.php';

class Giftcard extends Component {

    static navigationOptions = {
        title: 'Rediger Interesser',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    
    state = { 
        userInterests: [],
        interestsData: [],
        checkedId: -1,
    }

    async getInterests() {
        try {
            const response = await fetch(INTERESTS_URL)

            this.setState({ interestsData: await response.json() })

        } catch (error) {
            console.error(error)
        }
    }

    async getUserInterests() {
        AsyncStorage.getItem('UserID');
  
        const response = await fetch(USERINTERESTS_URL, {
          credentials: 'include',
        })
  
        this.setState({ userInterests: await response.json() })
    }

    handleCheck = (checkedId) => {
        this.setState({checkedId})
    }

    componentDidMount() {
        this.getUserInterests();
        this.getInterests();
    }

    

    render() {
        const { userInterests } = this.state;
        const { interestsData } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <Text style={{fontSize: 20, color: '#4c4c4c'}}>Vælg Interesser</Text>
                    <Text style={styles.text, {paddingBottom: 10}}>(du skal vælge minimum 3 interesser)</Text>

                    <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
                        {
                        interestsData.map((item, i) => (
                            <View style={i % 4 == 1 || i % 4 == 2 ? styles.interestDark : styles.interestLight} key={i}>
                            <Text style={{fontSize: 16, color: '#4c4c4c'}}>{item.InterestName}</Text>

                            <CheckBox
                                title={false}
                                key={item.InterestID}
                                checked={item.InterestID == this.state.checkedId}
                                onPress={() => this.handleCheck(item.InterestID)}
                            />
                            </View>
                        ))
                        }
                    </View>

                    <Button 
                        buttonStyle={styles.greenButton}
                        disabled={false}
                        title='Gem Ændringer'
                        onPress={() => Alert.alert('Fanstastisk', 'Hvis denne knap virkede, ville dine ændringer nu blive gemt, og du ville blive omdirigeret til en anden side...')}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default Giftcard;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        padding: 10,
        width: '90%',
    },
    text:{
        color: '#4c4c4c',
    },
    interestDark:{
        width: '50%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 10,
    },
    interestLight:{
        width: '50%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});