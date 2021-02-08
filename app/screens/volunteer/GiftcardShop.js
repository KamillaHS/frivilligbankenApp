import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image, ImageBackground, TouchableOpacity, AsyncStorage } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { stringify } from "qs";
import { NavigationEvents } from 'react-navigation';

const GIFTCARD_URL = 'http://kamilla-server.000webhostapp.com/app/allGiftcards.php';
//const JOBHOURS_URL = 'http://kamilla-server.000webhostapp.com/app/userJobHours.php';
const USERPOINTS_URL = 'http://kamilla-server.000webhostapp.com/app/userPoints.php';

class GiftcardShop extends Component {
    static navigationOptions = {
        title: 'Gavekorts Butik',
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
        giftCardData: [],
        userPoints: 0,
    }

    async getGiftCards() {
        try {
            const response = await fetch(GIFTCARD_URL)

            this.setState({ giftCardData: await response.json() })

        } catch (error) {
            console.error(error)
        }
    }

    async getUserPoints() {
        AsyncStorage.getItem('VolunteerID');
  
        const response = await fetch(USERPOINTS_URL, {
          credentials: 'include',
        })
  
        this.setState({ userPoints: await response.json() })
    }

    componentDidMount() {
        //this.getGiftCards();
        //this.getUserPoints();
    }
    
    render() {
        const { giftCardData, userPoints } = this.state;

        //const encodedPicture = giftCardData.SponsorPic;

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <NavigationEvents onWillFocus={ () => this.getGiftCards() }/>
                <NavigationEvents onWillFocus={ () => this.getUserPoints() }/>

                <View style={styles.area}>
                    <View style={{flex:1, flexDirection: 'row', padding: 10}}>
                        <Image
                            style={{ width: 30, height: 30, marginRight: 5 }}
                            source={require('../../../assets/PointsColor.png')}
                        />
                        <Text style={{color: '#4c4c4c', fontSize: 18, padding: 3}}>
                            {userPoints.Points}
                        </Text>
                    </View>
                </View>
                {
                    giftCardData.map((item, i) => (
                        <TouchableOpacity style={styles.giftcard} key={i} onPress={() => this.props.navigation.navigate('Giftcard', {id: item.GiftcardID})}>
                            <ImageBackground 
                                //source={{uri: item.SponsorPic}} 
                                source={{uri: `data:image/gif;base64,${item.SponsorPic}`}}
                                style={styles.cardImg} 
                                imageStyle={{ borderRadius: 10 }} />
                            <View style={styles.cardInfo}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{color: 'white', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', padding: 2}}>
                                        <Image
                                            style={{ width: 26, height: 26, marginRight: 5 }}
                                            source={require('../../../assets/PointsColor.png')}
                                        />
                                        <Text style={{color: 'white', fontSize: 18, padding: 1}}>{ item.ValueP }</Text>
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
        //backgroundColor: '#E7EBF0',
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