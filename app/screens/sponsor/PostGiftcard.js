import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, Picker, TouchableOpacity, TouchableHighlight, Modal, DatePickerIOS, Platform } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const POSTGIFTCARD_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/postGiftcard.php';

class PostGiftcard extends Component {

    static navigationOptions = {
        title: 'Opret Gavekort',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    constructor(props) {
        super(props);

        this.state= {
            title: '',
            description: '',
            requirements: '',
            amount: '',
            valueP: '',
            valueM: '',
        };
    }

    async createGiftcard() {
        const { title, amount, valueP, valueM, description, requirements } = this.state;

        try {
            if(this.state.title != '' && this.state.amount != '' && this.state.value != '') {
                const response = await fetch(POSTGIFTCARD_URL, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({ title, amount, valueP, valueM, description, requirements }),
                })
                
                const data = await response.json();
                
            } else {
                Alert.alert('Tomme felter', 'Venligst udfyld alle felter.');
            }
        } catch(error) {
            console.error(error);
        }
        this.props.navigation.navigate('SponsorDashboard');
    }

    render() {
        const { title, amount, valueP, valueM, description, requirements } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 

                    <Text>Titel på Gavekort</Text>
                    <TextInput
                        value={title}
                        onChangeText={(title) => this.setState({title})}
                        placeholder={'Eks. 100kr til badetøjsafdelingen'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        style={styles.input}
                    />

                    <Text>Antal Gavekort</Text>
                    <TextInput
                        value={amount}
                        onChangeText={(amount) => this.setState({amount})}
                        placeholder={'Maks antal gavekort, der kan "købes"'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='number-pad'
                        style={styles.input}
                    />

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text>Pris i Point</Text>
                        <Text style={{color: 'rgba(0,0,0,0.5)', paddingLeft: 5}}>(OBS 1 time = 60 point)</Text>
                    </View>
                    <TextInput
                        value={valueP}
                        onChangeText={(valueP) => this.setState({valueP})}
                        placeholder={'Værdien som man skal "købe" gavekortet for'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='number-pad'
                        style={styles.input}
                    />

                    <Text>Værdi i DKK</Text>
                    <TextInput
                        value={valueM}
                        onChangeText={(valueM) => this.setState({valueM})}
                        placeholder={'Gavekortets værdi, eks. 100kr'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='number-pad'
                        style={styles.input}
                    />

                    <Text>Beskrivelse af Gavekort</Text>
                    <TextInput
                        value={description}
                        onChangeText={(description) => this.setState({description})}
                        placeholder={'Beskrivelse'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                    />

                    <Text>Krav for brug af Gavekort</Text>
                    <TextInput
                        value={requirements}
                        onChangeText={(requirements) => this.setState({requirements})}
                        placeholder={'Krav'}
                        placeholderTextColor='#4c4c4c'
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={10}
                        style={styles.textArea}
                    />

                    <Button 
                        buttonStyle={styles.greenButton}
                        title='Opret Gavekort'
                        onPress={this.createGiftcard.bind(this)}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default PostGiftcard;

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
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 44,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#4c4c4c'
    },
    textArea: {
        width: '100%',
        height: 100,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
        color: '#4c4c4c'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});