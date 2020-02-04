import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, } from "react-native";
import { Button } from 'react-native-elements';

const DEBUG_URL = 'http://kamilla-server.000webhostapp.com/app/debug.php';

class DebugScreen extends Component {
    state = { 
        data: [],
    }
    
    async debug() {
        const response = await fetch(DEBUG_URL, {
            credentials: 'include',
        })
        const data = await response.json();
        this.setState({data})
    }

    componentDidMount() {
        this.debug();
    }

    render() {
        const { data } = this.state;

        return( 
            <View style={styles.container}>
                <Text>{JSON.stringify(data)}</Text>

                <Button 
                    title="Tilbage" 
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }

}

export default DebugScreen;

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#E7EBF0',
    },
});