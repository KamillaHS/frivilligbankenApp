import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';

const GIFTCARDS_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/getSponsorGiftcards.php';

class SponsorGiftcards extends Component {

    static navigationOptions = {
        title: 'Mine Oprettede Gavekort',
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#517BBE',
        },
        headerBackTitle: null,
    };

    state = { 
        giftcardsData: [] 
    }

    async getGiftcards() {
        try {
            const response = await fetch(GIFTCARDS_URL)

            this.setState({ giftcardsData: await response.json() })
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount() {
        this.getGiftcards();
    }

    render() {
        const { giftcardsData } = this.state;

        //const encodedPicture = giftcardsData.SponsorPic;

        return(
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.noBGarea}>
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Opret Gavekort'
                        onPress={() => this.props.navigation.navigate('PostGiftcard')}
                    />
                    <Button 
                        buttonStyle={[styles.blueButton, {marginBottom: 10}]}
                        title='Se Alle Gavekort'
                        onPress={() => this.props.navigation.navigate('AllGiftcards')}
                    />
                </View>

                <View style={ styles.area }>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
                        <Text style={styles.text}>Mine Oprettede Gavekort</Text>
                        <Text style={styles.text}>Antal Tilbage</Text>
                    </View>

                    {
                        giftcardsData.map((item, i) => (
                            <TouchableWithoutFeedback key={i} onPress={() => this.props.navigation.navigate('SingleGiftcard', {id: item.GiftcardID})}>
                                <View style={styles.jobListItem}>
                                    <View style={styles.giftcardPic}>
                                        <Image
                                            style={{flex:1, width: undefined, height: undefined, borderRadius: 10}}
                                            //source={{uri: item.SponsorPic}}
                                            source={{uri: `data:image/gif;base64,${item.SponsorPic}`}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', paddingLeft: 5, paddingRight: 5 }}>
                                        <Text style={{color: '#4c4c4c', fontSize: 18, paddingTop: 3 }} numberOfLines={1} ellipsizeMode='tail'>{ item.Title }</Text>
                                    </View>
                                    <View style={{ width: 20, justifyContent: 'center', marginRight: 0, marginLeft: 'auto' }}>
                                        <Text style={{color: '#4c4c4c' }} >{item.Amount}</Text>
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

export default SponsorGiftcards;

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
    text:{
        fontSize: 15,
        color: '#4c4c4c'
    },
    jobListItem:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        color: '#4c4c4c',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    giftcardPic:{
        height: '100%',
        width: 70,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    blueButton: {
        backgroundColor:"#517BBE",
        borderRadius:10,
    },
});