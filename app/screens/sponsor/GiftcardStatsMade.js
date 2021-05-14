import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const GIFTCARDSMADE_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/giftcardStatsMade.php';
const GIFTCARDSMADETOTALS_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/giftcardStatsMadeTotals.php';

class GiftcardStatsMade extends Component {

    static navigationOptions = {
        title: 'Gavekort Statistik',
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
        giftcards: [],
        totals: [],
        giftcardTotalMade: 0,
    }

    async getGiftcardsMade() {
        try {
            const response = await fetch(GIFTCARDSMADE_URL)

            this.setState({ giftcards: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    async getTotals() {
        try {
            const response = await fetch(GIFTCARDSMADETOTALS_URL)

            this.setState({ totals: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getGiftcardsMade();
        this.getTotals();
    }

    render() {
        const { giftcards, totals } = this.state;
        let { giftcardTotalMade } = this.state;

        giftcards.forEach(element => (giftcardTotalMade += element.Amount * element.ValueM));
        console.log(giftcardTotalMade);

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <Text style={[styles.text, {fontSize: 18}]}>Statistik over oprettede gavekort</Text>
                </View>

                <View style={styles.area}>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                        <Text style={[styles.text, {width: '55%', fontSize: 18}]}>Titel</Text>
                        <Text style={[styles.text, {width: '20%', textAlign: 'right'}]}>Mængde</Text>
                        <Text style={[styles.text, {width: '25%', textAlign: 'right'}]}>Værdi Kr.</Text>
                    </View>

                    {
                        giftcards.map((item, i) => (
                            <View key={i.GiftcardID} style={i % 2 == 1 || i % 2 == 2 ? [styles.giftcardListItem, {backgroundColor: 'rgba(255,255,255,0.3)'}] : [styles.giftcardListItem, {backgroundColor: 'rgba(255,255,255,0.6)'}]}>
                                <Text style={[styles.text], {width: '55%'}} numberOfLines={1} ellipsizeMode='tail'>{item.Title}</Text>
                                <Text style={[styles.text], {width: '20%', textAlign: 'right'}}>{item.Amount}</Text>
                                <Text style={[styles.text], {width: '25%', textAlign: 'right'}}>{item.ValueM}</Text>
                            </View>
                        ))
                    }

                    <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                        <Text style={[styles.text, {width: '55%', fontSize: 18}]}>Total:</Text>
                        <Text style={[styles.text, {width: '20%', textAlign: 'right'}]}>{totals.TotalA}</Text>
                        <Text style={[styles.text, {width: '25%', textAlign: 'right'}]}>{totals.TotalM}</Text>
                    </View>

                    <View style={{marginTop: 5}}>
                        <Text style={[styles.text, {fontSize: 15}]}>Der er i alt blevet oprettet gavekort til en værdi af:</Text>
                        <Text style={[styles.text, {fontSize: 18}]}>{giftcardTotalMade} DKK</Text>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default GiftcardStatsMade;

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
        fontSize: 15,
    },
    noBGarea:{
        width: '90%',
        marginBottom: 10
    },
    giftcardListItem:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
        //alignItems: 'center',
        //justifyContent: 'center'
    }
});