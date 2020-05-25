import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { Button, Icon, Divider, CheckBox } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
//import { TouchableOpacity } from "react-native-gesture-handler";

const USERINTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/volunteerInterests.php';
const INTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/getInterests.php';
const UPDATEINTERESTS_URL = 'http://kamilla-server.000webhostapp.com/app/updateInterests.php';

class EditInterests extends Component {

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
        interests: [1, 2, 3, 4, 5],
        newInterests: [],
        checkedId: -1,
    }

    async getInterests() {
        try {
            const response = await fetch(INTERESTS_URL)
            
            const data = await response.json()
            const interestsData = data.map((item) => {
                const userInterests = this.state.userInterests
             const index = userInterests.findIndex((itm) =>( itm.InterestID === item.InterestID) ) 
             return { ...item, checked: index != -1}
             })
            
            //const interestsData = await response.json();
            console.log('interestsData', interestsData);
            
            this.setState({ interestsData })

        } catch (error) {
            console.error(error)
        }
    }

    async getUserInterests() {
        AsyncStorage.getItem('UserID');
  
        const response = await fetch(USERINTERESTS_URL, {
          credentials: 'include',
        })

        const userInterests = await response.json();
        console.log('userInterests', userInterests);
        
  
        this.setState({ userInterests })
        console.log('userInterests', response.json())
    }

    handleCheck = (index) => {
        const data = this.state.interestsData;
        const curRowData = {...data[index], checked: !data[index].checked};
        data.splice(index, 1, curRowData);
        this.setState({interestsData: data});
    }

    saveChanges = async() => {
        const checkedItems = this.state.interestsData.filter((item) => {return item.checked});

        const response = await fetch(UPDATEINTERESTS_URL, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ checkedItems }),
        })

        const data = await response.json();
        this.props.navigation.navigate('VolunteerProfile');
    }

    componentDidMount() {
        this.getUserInterests();
        this.getInterests();
    }

    

    render() {
        const { userInterests } = this.state;
        const { interestsData } = this.state;
        const { newInterests } = this.state;
        const { interests} = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <Text style={{fontSize: 20, color: '#4c4c4c'}}>Vælg Interesser</Text>
                    <Text style={styles.text, {paddingBottom: 10}}>(du skal vælge minimum 3 interesser)</Text>

                    <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
                        {
                        interestsData.map((item, i) => (
                            <View style={i % 4 == 1 || i % 4 == 2 ? styles.interestDark : styles.interestLight} key={i}>
                                <Text style={{flex: 1, fontSize: 16, color: '#4c4c4c'}}>{item.InterestName}</Text>

                                <CheckBox
                                    //title={false}
                                    key={item.InterestID}
                                    checked={item.checked}
                                    onPress={() => this.handleCheck(i)}
                                    checkedIcon={'check-square'}
                                    size={30}
                                    checkedColor={'#517BBE'}
                                />
                            </View>
                        ))
                        }
                    </View>

                    <Button 
                        buttonStyle={styles.greenButton}
                        disabled={false}
                        title='Gem Ændringer'
                        onPress={this.saveChanges.bind(this)}
                        //onPress={() => Alert.alert('Fanstastisk', 'Hvis denne knap virkede, ville dine ændringer nu blive gemt, og du ville blive omdirigeret til en anden side...')}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default EditInterests;

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    interestLight:{
        width: '50%',
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});