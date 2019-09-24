import { AsyncStorage } from 'react-native';

const key = 'nav2'
// const key = null

export const loadNavigationState = key
    ? async() => JSON.parse( await AsyncStorage.getItem(key) )
    : null

export const persistNavigationState = key 
    ? async state => await AsyncStorage.setItem(key, JSON.stringify(state))
    : null
