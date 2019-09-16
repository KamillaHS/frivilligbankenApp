import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

const JOB_URL = 'http://192.168.0.22:8080/frivilligbanken/app/singleJob.php';

class VolunteerDashScreen extends Component {

    static navigationOptions = {
        title: 'Job Beskrivelse',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
          backTitle: null,
    };

    
    state = { 
        jobData: [] 
    }

    async getJob() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(JOB_URL + '?id=' + id)

            this.setState({ jobData: await response.json() })
        } catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getJob();
    }

    

    render() {
        const { jobData } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.jobLogo}>
                            <Image
                                style={{flex:1, width: undefined, height: undefined, borderRadius: 50}}
                                source={{uri: jobData.UnionLogo}}
                            />
                        </View>
                        <View style={{ padding: 10}}>
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
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.StartDate}</Text></View>
                        </View>
                        <View style={styles.rows}>
                            <View style={{width: '50%'}}><Text style={styles.titles}>Slutdato</Text></View>
                            <View style={{width: '50%'}}><Text style={styles.values}>{jobData.EndDate}</Text></View>
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
                        buttonStyle={styles.greenButton} 
                        title='Søg Job'
                        onPress={() => Alert.alert('Bekræft', 'Er du sikker på at du vil søge jobbet ' + jobData.Title +'?', 
                        [
                        {
                        text: 'Ja, fortsæt',
                        onPress: () => Alert.alert('Godkendt', 'Du har nu søgt jobbet ' + jobData.Title +''),
                        style: 'default',
                        onPress: () => this.props.navigation.navigate('History')
                        },
                        {
                        text: 'Nej, luk',
                        style: 'cancel',
                        },
                        ],
                        )}
                    />
                </View>
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
});