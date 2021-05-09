import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Image } from "react-native";
import { Button, Icon, Divider } from 'react-native-elements';
import { HeaderBackButton } from "react-navigation-stack";
import { NavigationEvents } from 'react-navigation';

const GIFTCARD_URL = 'http://kamilla-server.000webhostapp.com/app/sponsor/giftcardView.php';

class SingleGiftcard extends Component {

    static navigationOptions = {
        title: 'Gavekort',
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
        const encodedPicture = giftcardData.SponsorPic;

        return(
            <ScrollView style={{backgroundColor: '#E7EBF0'}} contentContainerStyle={styles.container}>
                <View style={styles.area}> 
                    <View style={styles.giftCardLogo}>
                        <Image
                            style={{flex:1, width: undefined, height: undefined, borderRadius: 10}}
                            //source={{uri: giftcardData.SponsorPic}}
                            source={{uri: `data:image/gif;base64,${encodedPicture}`}}
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
                                <Text style={{color: '#4c4c4c', fontSize: 18, padding: 1}}>{ giftcardData.ValueP }</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row'}}>
                            <Text style={styles.text}>Oprettet af:</Text>
                            <Text style={styles.text}>{giftcardData.SponsorName}</Text>
                        </View>

                        <Text style={{color: '#4c4c4c', fontSize: 15, marginTop: 5}}>{giftcardData.Description}</Text>

                    </View>
                    <View style={ giftcardData.SponsorID == giftcardData.sponsorID ? {padding:10} : {display: 'none'}}>
                        <View style={[styles.infoLight, {borderTopLeftRadius: 10, borderTopRightRadius: 10}]}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Oprettede: </Text>
                            <Text style={[styles.text, {marginRight: 0, marginLeft: 'auto'}]}>{giftcardData.Made}</Text>
                        </View>
                        <View style={styles.infoDark}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Købte: </Text>
                            <Text style={[styles.text, {marginRight: 0, marginLeft: 'auto'}]}>{giftcardData.Bought}</Text>
                        </View>
                        <View style={styles.infoLight}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Brugte: </Text>
                            <Text style={[styles.text, {marginRight: 0, marginLeft: 'auto'}]}>{giftcardData.Used}</Text>
                        </View>
                        <View style={styles.infoDark}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Ubrugte: </Text>
                            <Text style={[styles.text, {marginRight: 0, marginLeft: 'auto'}]}>{giftcardData.Unused}</Text>
                        </View>
                        <View style={[styles.infoLight, {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>Udløbne: </Text>
                            <Text style={[styles.text, {marginRight: 0, marginLeft: 'auto'}]}>{giftcardData.Expired}</Text>
                        </View>
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
        //backgroundColor: '#E7EBF0',
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
    infoLight:{
        flex: 1, 
        flexDirection: "row", 
        backgroundColor: "rgba(255,255,255,0.6)",
        padding: 10
    },
    infoDark:{
        flex: 1, 
        flexDirection: "row", 
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 10
    },
    greenButton:{
        backgroundColor:"#30A451",
        borderRadius:10,
    },
});