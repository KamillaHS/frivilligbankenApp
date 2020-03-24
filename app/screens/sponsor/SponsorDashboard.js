import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';

const SPONSOR_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/getSponsorName.php';

class SponsorDashboard extends Component {

    static navigationOptions = {
        title: 'Forside',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
      };

    state = { 
        sponsor: []
    }

    async getSponsor() {
        try {
            const response = await fetch(SPONSOR_URL)

            this.setState({ sponsor: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getSponsor();
    }

    render() {
        const { sponsor } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Velkommen {sponsor.SponsorName}</Text>
                </View>

                <View style={styles.noBGarea}>
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Opret Gavekort'
                        onPress={() => this.props.navigation.navigate('PostGiftcard')}
                    />
                </View>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Oprettede Gavekort</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>0</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={35}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Brugte Gavekort</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>0</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={35}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Ubrugte Gavekort</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>0</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={35}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]}>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Udløbne Gavekort</Text>
                    </View>
                    <View style={{width: '50%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>0</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={35}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default SponsorDashboard;

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
    dividedArea:{
        width: '90%', 
        flex: 1, 
        flexDirection: 'row', 
        borderRadius: 10, 
        backgroundColor: '#517BBE',
        marginBottom: 10,
    },
    greenButton: {
        backgroundColor:"#30A451",
        borderRadius:10,
        width: 100,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
});