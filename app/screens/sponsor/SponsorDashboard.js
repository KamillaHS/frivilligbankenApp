import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const SPONSOR_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/getSponsorName.php';
const SIMPLESTATS_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/getSimpleStats.php';

class SponsorDashboard extends Component {

    static navigationOptions = {
        title: 'Forside',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
            height: 60
          },
          headerBackTitle: null,
      };

    state = { 
        sponsor: [],
        simpleStats: []
    }

    async getSponsor() {
        try {
            const response = await fetch(SPONSOR_URL)

            this.setState({ sponsor: await response.json() })

        } catch (error) {
            console.error(error)  
        }
    }

    async getSimpleStats() {
        try {
            const response = await fetch(SIMPLESTATS_URL)

            this.setState({ simpleStats: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getSponsor();
        //this.getSimpleStats();
    }

    render() {
        const { sponsor, simpleStats } = this.state;

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getSimpleStats() }/> 

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

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]} onPress={() => this.props.navigation.navigate('GiftcardStatsMade')}>
                    <View style={{width: '60%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Oprettede Gavekort</Text>
                    </View>
                    <View style={{width: '40%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>{simpleStats.Made}</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={40}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]} onPress={() => this.props.navigation.navigate('GiftcardStatsBought')}>
                    <View style={{width: '60%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Købte Gavekort</Text>
                    </View>
                    <View style={{width: '40%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>{simpleStats.Bought}</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={40}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]} onPress={() => this.props.navigation.navigate('GiftcardStatsUsed')}>
                    <View style={{width: '60%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Brugte Gavekort</Text>
                    </View>
                    <View style={{width: '40%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>{simpleStats.Used}</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={40}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]} onPress={() => this.props.navigation.navigate('GiftcardStatsUnused')}>
                    <View style={{width: '60%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Ubrugte Gavekort</Text>
                    </View>
                    <View style={{width: '40%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>{simpleStats.Unused}</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={40}
                          color='#4c4c4c'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.dividedArea, {position: 'relative'}]} onPress={() => this.props.navigation.navigate('GiftcardStatsExpired')}>
                    <View style={{width: '60%', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                        <Text style={styles.text}>Udløbne Gavekort</Text>
                    </View>
                    <View style={{width: '40%', backgroundColor: 'rgba(255,255,255,0.6)', padding: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10}}>
                        <Text style={styles.text}>{simpleStats.Expired}</Text>
                    </View>
                    <View style={{position: 'absolute', width: '100%', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Icon
                          type='material' 
                          name="chevron-right" 
                          size={40}
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
        //backgroundColor: '#E7EBF0',
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
        fontSize: 18,
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