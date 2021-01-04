import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const JOBSWITHAPPLICATIONS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getJobsWithApplications.php';

class JobApplications extends Component {

    static navigationOptions = {
        title: 'Job Ansøgere',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
        },
        headerTintColor: 'white',
        headerBackTitle: null,
      };


    state = { 
        jobs: []
    }

    async getJobsWithApplications() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(JOBSWITHAPPLICATIONS_URL + '?id=' + id)

        this.setState({ jobs: await response.json() });
        //console.log( await response.text() );
    }


    componentDidMount() {
        //this.getJobsWithApplications();
    }

    render() {
        const { jobs } = this.state;

        //const encodedPicture = jobs.UnionLogo;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getJobsWithApplications() }/>

                <View style={styles.area}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.text}>Mine Oprettede Jobs</Text>
                        <Text style={styles.text}>Nye Ansøgere</Text>
                    </View>

                    {/*
                        jobs.map((item, i) => (
                            <TouchableOpacity key={i.JobID}>
                                <Text>{item.Title}</Text>
                            </TouchableOpacity>
                        ))
                    */}

                    {
                    jobs.map((item, i) => (
                        <TouchableOpacity key={i.JobID} onPress={() => this.props.navigation.navigate('UnionJobDescription', {id: item.JobID, route: 'application'})}>
                                <View style={styles.jobListItem}>
                                    <View style={styles.jobLogo}>
                                        <Image
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                            //source={{uri: item.UnionLogo}}
                                            source={{uri: `data:image/gif;base64,${item.UnionLogo}`}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    </View>
                                    <View style={{ width: 20, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                        <Text style={{color: '#4c4c4c' }} >{item.num}</Text>
                                    </View>
                                </View>
                        </TouchableOpacity>
                    ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default JobApplications;

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
    jobListItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginTop: 10,
        borderRadius: 10,
    },
    jobLogo:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
});