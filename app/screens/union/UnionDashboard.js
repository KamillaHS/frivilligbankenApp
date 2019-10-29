import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';

const UNION_URL = 'http://kamilla-test.000webhostapp.com/app/union/getUnionName.php';

class UnionDashboard extends Component {

    static navigationOptions = {
        title: 'Forside',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#517BBE',
        },
        headerBackTitle: null,
      };


    state = { 
        union: []
    }

    async getUnion() {
        try {
            const response = await fetch(UNION_URL)

            this.setState({ union: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getUnion();
    }

    render() {
        const { union } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Velkommen {union.UnionName}</Text>
                    <Text style={[styles.text, {fontSize: 15}]}>Hvad har du lyst til at foretage dig?</Text>
                </View>
                <View style={styles.noBGarea}>
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Opret Job'
                    />
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Frivillige Medlemmer'
                        onPress={() => this.props.navigation.navigate('UnionMembers')}
                    />
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Godkend/Afvis Ansøgere'
                    />
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Tildel Arbejdstimer'
                    />
                </View>
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
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
        width: '100%',
    },
});