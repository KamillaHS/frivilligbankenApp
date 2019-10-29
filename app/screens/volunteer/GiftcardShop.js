import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { stringify } from "qs";

const GIFTCARD_URL = 'http://kamilla-test.000webhostapp.com/app/allGiftcards.php';

class GiftcardShop extends Component {
    static navigationOptions = {
        title: 'Gavekorts Butik',
        headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#517BBE',
          },
          headerBackTitle: null,
    };

    state = { 
        giftCardData: [] 
    }

    async getGiftCards() {
        try {
            const response = await fetch(GIFTCARD_URL)

            this.setState({ giftCardData: await response.json() })

        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getGiftCards();
    }
    
    render() {
        const { giftCardData } = this.state;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.area}>
                    <View style={{flex:1, flexDirection: 'row', padding: 10}}>
                        <Icon
                            type='material' 
                            name="control-point" 
                            size={30}
                            color='#4c4c4c'
                        />
                        <Text style={{color: '#4c4c4c', fontSize: 18, padding: 3}}>
                            55
                        </Text>
                        { /* number is supposed to come from db */}
                    </View>
                </View>
                {
                    giftCardData.map((item, i) => (
                        <TouchableOpacity style={styles.giftcard} key={i} onPress={() => this.props.navigation.navigate('Giftcard', {id: item.GiftcardID})}>
                            <ImageBackground source={{uri: item.SponsorPic}} style={styles.cardImg} imageStyle={{ borderRadius: 10 }} />
                            <View style={styles.cardInfo}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{color: 'white', fontSize: 18, paddingTop: 3 }}>{ item.Title }</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                                        <Icon
                                            type='material' 
                                            name="control-point" 
                                            size={25}
                                            color='white'
                                        />
                                        <Text style={{color: 'white', fontSize: 18, padding: 1}}>{ item.Value }</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))    
                }
            </ScrollView>
        )
    }
}

export default GiftcardShop;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
    area:{
        backgroundColor: 'rgba(81,123,190,0.3)',
        borderRadius: 10,
        marginBottom: 10,
        width: '90%',
    },
    giftcard:{
        height: 200,
        width: '90%',
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        borderColor: '#4c4c4c',
        borderRadius: 10,
        marginBottom: 10,
    },
    cardImg:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    cardInfo:{
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        marginBottom: 0,
        marginTop: 'auto',
        padding: 5,
    }
});