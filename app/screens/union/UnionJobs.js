import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';

const UNION_JOBS_URL = 'http://kamilla-server.000webhostapp.com/app/union/getUnionJobs.php';

class UnionJobs extends Component {

    static navigationOptions = {
        title: 'Mine Oprettede Jobs',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerBackTitle: null,
      };

    state = { 
        jobsData: [] 
    }

    async getJobs() {
        try {
            const response = await fetch(UNION_JOBS_URL)

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

        //const encodedPicture = jobsData.UnionLogo;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.noBGarea}>
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Opret Job'
                        onPress={() => this.props.navigation.navigate('PostJob')}
                    />
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Se Alle Jobs'
                        onPress={() => this.props.navigation.navigate('UnionAllJobs')}
                    />
                </View>

                <View style={ styles.area }>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>
                        <Text style={styles.text}>Mine Oprettede Jobs</Text>
                        <Text style={styles.text}>Nye Ansøgere</Text>
                    </View>

                    {
                        jobsData.map((item, key) => (
                            <TouchableWithoutFeedback key={key.JobID} onPress={() => this.props.navigation.navigate('UnionJobDescription', {id: item.JobID})}>
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
                                        <Text style={{color: '#4c4c4c' }} >1</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}

export default UnionJobs;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        paddingBottom: 10,
        width: '90%',
    },
    jobListItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        padding: 5,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    text:{
        color: '#4c4c4c',
        fontSize: 15,
    },
    jobLogo:{
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 25,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
});