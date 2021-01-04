import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

import moment from 'moment';
import 'moment/locale/da';
moment.locale('da');

const JOB_URL = 'http://kamilla-server.000webhostapp.com/app/singleJob.php';
const APPLY_URL = 'http://kamilla-server.000webhostapp.com/app/jobApplication.php';

class JobDescription extends Component {

    static navigationOptions = {
        title: 'Job Beskrivelse',
        headerTitleStyle: {
            color: 'white',
          },
        headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
        },
        headerTintColor: 'white',
    };

    
    state = { 
        jobData: [] 
    }

    async getJob() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(JOB_URL + '?id=' + id)

            this.setState({ jobData: await response.json() })
            //alert(await response.text())

        } catch (error) {
            console.error(error)  
        }
    }

    async apply() {
        const id = this.props.navigation.getParam('id');
        const response = await fetch(APPLY_URL + '?id=' + id, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })

        const data = await response.json()
    }

    componentDidMount() {
        this.getJob();
    }

    

    render() {
        const { jobData } = this.state;

        const encodedPicture = jobData.UnionLogo;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.jobLogo}>
                            <Image
                                style={{flex:1, width: undefined, height: undefined, borderRadius: 50}}
                                //source={{uri: jobData.UnionLogo}}
                                source={{uri: `data:image/gif;base64,${encodedPicture}`}}
                            />
                        </View>
                        <View style={{ padding: 10, maxWidth: '70%'}}>
                            <Text style={{fontSize: 20, color: '#4c4c4c'}}>{jobData.Title}</Text>
                            <Divider style={{ backgroundColor: '#4c4c4c', height: 2 }} />
                            <Text style={{fontSize: 15, color: '#4c4c4c'}}>{jobData.AreaName}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Udbyder</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.UnionName}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Startdato</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{moment(jobData.StartDate).format('L')}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Slutdato</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{moment(jobData.EndDate).format('L')}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Kategori</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.CategoryName}</Text></View>
                        </View>
                        <Text style={styles.titles}>Beskrivelse</Text>
                        <Text style={styles.values}>{jobData.Description}</Text>
                        <Text style={styles.titles}>Krav</Text>
                        <Text style={styles.values}>{jobData.Requirements}</Text>
                    </View>

                    <Button
                        buttonStyle={jobData.Status == null ? styles.greenButton : {display: 'none'}} 
                        title='Søg Job'
                        onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil søge jobbet ' + jobData.Title +'?', 
                        [
                            {
                            text: 'Ja, fortsæt',
                            onPress: () => {this.apply(); this.props.navigation.navigate('History')},
                            style: 'default',
                            },
                            {
                            text: 'Nej, luk',
                            style: 'cancel',
                            },
                        ],
                        )}
                    />

                    <Button 
                        title='Godkendt'
                        buttonStyle={jobData.Status == 'Godkendt' ? styles.confirmedButton : {display: 'none'}}
                    />

                    <Button 
                        title='Afventer'
                        buttonStyle={jobData.Status == 'Afventer' ? styles.waitingButton : {display: 'none'}}
                    />

                    <Button 
                        title='Afvist'
                        buttonStyle={jobData.Status == 'Afvist' ? styles.rejectedButton : {display: 'none'}}
                    />

                    <Button 
                        title='Afsluttet'
                        buttonStyle={jobData.Status == 'Afsluttet' ? styles.endedButton : {display: 'none'}}
                        disabled={true}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default JobDescription;

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
        padding: 10,
    },
    infoBox:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    jobLogo:{
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 50,
    },
    rows:{
        flex:1, 
        flexDirection: 'row', 
        marginBottom: 3
    },
      titles: {
        fontSize: 16,
        color: '#4c4c4c'
    },
      values:{
        fontSize: 16,
        color: 'rgba(76,76,76,0.5)'
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
        width: '100%',
    },
    confirmedButton:{
        backgroundColor:"rgba(48, 164, 81, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    waitingButton:{
        backgroundColor:"rgba(255, 128, 0, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    rejectedButton:{
        backgroundColor:"rgba(232, 67, 53, 0.5)",
        borderRadius:10,
        width: '100%',
    },
    endedButton:{
        backgroundColor:"grey",
        borderRadius:10,
        width: '100%',
    }
});