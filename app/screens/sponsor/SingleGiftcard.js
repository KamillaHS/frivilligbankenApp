import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";

const GIFTCARD_URL = 'http://kamilla-test.000webhostapp.com/app/singleGiftcard.php';

class SingleGiftcard extends Component {

    static navigationOptions = {
        title: 'Gavekort',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerTintColor: 'white',
    };

    
    state = { 
        giftcardData: [] 
    }

    async getGiftcard() {
        try {
            const id = this.props.navigation.getParam('id');
            const response = await fetch(GIFTCARD_URL + '?id=' + id)

            this.setState({ giftcardData: await response.json() })
        } catch (error) {
            console.error(error)  
        }
    }

    componentDidMount() {
        this.getGiftcard();
    }

    

    render() {
        const { giftcardData } = this.state;
        const myPoints = 55;

        const left = myPoints - giftcardData.Value;

        if(left >= 0) {
            canBuy = true;
        } else {
            canBuy = false
        }

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <View style={styles.giftCardLogo}>
                        <Image
                            style={{flex:1, width: undefined, height: undefined, borderRadius: 10}}
                            source={{uri: giftcardData.SponsorPic}}
                        />
                    </View>
                    <View style={{padding: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }}>{ giftcardData.Title }</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                                <Icon
                                    type='material' 
                                    name="control-point" 
                                    size={25}
                                    color='#4c4c4c'
                                />
                                <Text style={{color: '#4c4c4c', fontSize: 18, padding: 1}}>{ giftcardData.Value }</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row'}}>
                            <Text style={styles.text}>Oprettet af:</Text>
                            <Text style={styles.text}>{giftcardData.SponsorName}</Text>
                        </View>

                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>Beskrivelse kommer her. Ikke sat i db endnu.</Text>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default SingleGiftcard;

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
    },
    giftCardLogo:{
        height: 200,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    lightArea:{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10, 
    },
    text:{
        color: '#4c4c4c',
        fontSize: 15,
    },
    textGreen:{
        color: '#30A451',
    },
    textRed: {
        color: '#E84335',
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});