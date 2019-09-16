import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';

const JOBS_URL = 'http://192.168.0.22:8080/frivilligbanken/app/allJobs.php';

class History extends Component {
    static navigationOptions = {
        title: 'Jobhistorik',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
      };

    state = { 
        jobsData: [] 
    }

    async getJobs() {
        try {
            const response = await fetch(JOBS_URL)

            this.setState({ jobsData: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getJobs();
    }
    
    render() {
        const { jobsData } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Godkendt</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Start dato</Text>
                    </View>
                    {
                        jobsData.map((item, i) => (
                            <View style={styles.jobListItemGreen} key={i}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        source={{uri: item.UnionLogo}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 80, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ item.StartDate }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afventer</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Start dato</Text>
                    </View>
                    {
                        jobsData.map((item, i) => (
                            <View style={styles.jobListItemYellow} key={i}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        source={{uri: item.UnionLogo}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 80, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ item.StartDate }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afvist</Text>
                    </View>
                    {
                        jobsData.map((item, i) => (
                            <View style={styles.jobListItemRed} key={i}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        source={{uri: item.UnionLogo}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={ styles.area }>
                    <View style={{flex:1, flexDirection: 'row', paddingRight: 10, paddingLeft: 10, paddingTop: 10}}>
                        <Text style={{color: '#4c4c4c', fontSize: 18, }}>Afviklet</Text>
                        <Text style={{color: '#4c4c4c', marginRight: 0, marginLeft: 'auto', paddingTop: 3}}>Slut dato</Text>
                    </View>
                    {
                        jobsData.map((item, i) => (
                            <View style={styles.jobListItemGrey} key={i}>
                                <View style={styles.jobLogo}>
                                    <Image
                                        style={{flex:1, width: undefined, height: undefined, borderRadius: 25}}
                                        source={{uri: item.UnionLogo}}
                                    />
                                </View>
                                <View style={{ justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5 }}>
                                    <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                                    <Text style={{color: '#4c4c4c'}}>{ item.AreaName }</Text>
                                </View>
                                <View style={{ width: 80, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                    <Text style={{color: '#4c4c4c' }} >{ item.StartDate }</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default History;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
        marginBottom: 10,
    },
    jobListItemGreen:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(49,168,83,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    jobListItemYellow:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,128,0,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    jobListItemRed:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(232,67,53,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    jobListItemGrey:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(76,76,76,0.4)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
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
    }
});