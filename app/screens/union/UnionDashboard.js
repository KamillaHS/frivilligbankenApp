import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const UNION_URL = 'http://kamilla-server.000webhostapp.com/app/union/getUnionName.php';
const JOBSWITHAPPLICATIONS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getJobsWithApplications.php';
const UNIONREQUESTS_URL = 'http://kamilla-server.000webhostapp.com/app/union/unionRequests.php'

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
        union: [],
        jobs: [],
        memberRequests: [],
    }

    async getUnion() {
        try {
            const response = await fetch(UNION_URL)

            this.setState({ union: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getJobsWithApplications() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(JOBSWITHAPPLICATIONS_URL + '?id=' + id)

        this.setState({ jobs: await response.json() });
        //console.log( await response.text() );
    }

    async getNewRequests() {
        try {
            const response = await fetch(UNIONREQUESTS_URL);

            this.setState({ memberRequests: await response.json() });
        } catch(error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getUnion();
    }

    render() {
        const { union, jobs, memberRequests } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getJobsWithApplications() }/>
                <NavigationEvents onWillFocus={ () => this.getNewRequests() }/>

                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Velkommen {union.UnionName}</Text>
                    <Text style={[styles.text, {fontSize: 15}]}>Hvad har du lyst til at foretage dig?</Text>
                </View>
                <View style={styles.noBGarea}>
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 20}]}
                        title='Opret Job'
                        onPress={() => this.props.navigation.navigate('PostJob')}
                    />

                    <View style={{position: 'relative'}}>
                        <Button 
                            buttonStyle={[styles.blueButton, {marginBottom: 20}]}
                            title='Frivillige Medlemmer'
                            onPress={() => this.props.navigation.navigate('UnionMembers')}
                        />

                        <View style={memberRequests.length > 0 ? styles.newRequests : {display: 'none'}}>
                            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{memberRequests.length}</Text>
                        </View>
                    </View>

                    <View style={{position: 'relative'}}>
                        <Button 
                            buttonStyle={[styles.blueButton, {marginBottom: 20}]}
                            title='Godkend/Afvis Job Ansøgere'
                            onPress={() => this.props.navigation.navigate('JobApplications')}
                        />

                        <View style={jobs.length > 0 ? styles.newRequests : {display: 'none'}}>
                            <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{jobs.length}</Text>
                        </View>
                    </View>

                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 20}]}
                        title='Tildel Arbejdstimer'
                        onPress={() => this.props.navigation.navigate('AssignHours')}
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
        height: '100%'
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        marginBottom: 20
    },
    text:{
        color: '#4c4c4c',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    newRequests:{
        position: 'absolute',
        marginTop: -15,
        right: -5,
        backgroundColor: '#E84335', 
        paddingVertical: 10,
        paddingHorizontal: 13, 
        borderRadius: 50
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