import React, { Component } from 'react';
import { Image } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import * as navigationPersistence from './navigation-persistence';

import LoginScreen from './app/screens/LoginScreen';

import SignUpScreen from './app/screens/signUp/SignUp';
import SignUpMessage from './app/screens/signUp/SignUpMessage';
import VolunteerSignUp from './app/screens/signUp/VolunteerSignUp';

import Jobs from './app/screens/volunteer/Jobs';
import JobDescription from './app/screens/volunteer/JobDescription';
import History from './app/screens/volunteer/History';
import VolunteerDashScreen from './app/screens/volunteer/VolunteerDashScreen';
import GiftcardShop from './app/screens/volunteer/GiftcardShop';
import Giftcard from './app/screens/volunteer/Giftcard';
import VolunteerProfile from './app/screens/volunteer/VolunteerProfile';
import VolunteerSettings from './app/screens/volunteer/VolunteerSettings';
import ChangeProfile from './app/screens/ChangeProfile';

import UnionDashboard from './app/screens/union/UnionDashboard';
import UnionJobs from './app/screens/union/UnionJobs';
import UnionProfile from './app/screens/union/UnionProfile';
import UnionSettings from './app/screens/union/UnionSettings';
import UnionMembers from './app/screens/union/UnionMembers';

import SponsorDashboard from './app/screens/sponsor/SponsorDashboard';
import SponsorGiftcards from './app/screens/sponsor/SponsorGiftcards';
import SingleGiftcard from './app/screens/sponsor/SingleGiftcard';
import AllGiftcards from './app/screens/sponsor/AllGiftcards';
import SponsorProfile from './app/screens/sponsor/SponsorProfile';
import SponsorSettings from './app/screens/sponsor/SponsorSettings';

import Debug from './app/screens/DebugScreen'

/* Volunteer Tabs */
const JobTab = createStackNavigator({
  Jobs: { screen: Jobs },
  JobDescription: { screen: JobDescription}
})
JobTab.navigationOptions = {
  tabBarIcon: <Icon name="work" type='material' size={35} color="white" />
}

const HistoryTab = createStackNavigator({
  History: { screen: History },
  JobDescription: { screen: JobDescription},
})
HistoryTab.navigationOptions = {
  tabBarIcon: <Icon name="restore" type='material' size={35} color="white" />
}

const HomeTab = createStackNavigator({
  Home: { screen: VolunteerDashScreen },
  JobDescription: { screen: JobDescription},
  Debug: { screen: Debug},
})
HomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const ShopTab = createStackNavigator({
  Shop: { screen: GiftcardShop },
  Giftcard: { screen: Giftcard }
})
ShopTab.navigationOptions = {
  tabBarIcon: <Icon name="shopping-cart" type='material' size={35} color="white" />
}

const VolunteerProfileTab = createStackNavigator({
  VolunteerProfile: { screen: VolunteerProfile },
  VolunteerSettings: { screen: VolunteerSettings },
  ChangeProfile: { screen: ChangeProfile },
})
VolunteerProfileTab.navigationOptions = {
  tabBarIcon: <Icon name="person" type='material' size={35} color="white" />
}

const VolunteerTabs = createBottomTabNavigator(
  {
  JobTab,
  HistoryTab,
  HomeTab,
  ShopTab,
  VolunteerProfileTab,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#517BBE',
      },
      showLabel: false,
      showIcon: true,
    },
    initialRouteName: 'HomeTab',
  }
)

/* Union Tabs */

const UnionJobsTab = createStackNavigator({
  UnionJobs: { screen: UnionJobs },
  JobDescription: { screen: JobDescription},
})
UnionJobsTab.navigationOptions = {
  tabBarIcon: <Icon name="work" type='material' size={35} color="white" />
}

const UnionHomeTab = createStackNavigator({
  UnionHome: { screen: UnionDashboard },
  UnionMembers: { screen: UnionMembers },
})
UnionHomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const UnionProfileTab = createStackNavigator({
  UnionProfile: { screen: UnionProfile },
  UnionSettings: { screen: UnionSettings },
  ChangeProfile: { screen: ChangeProfile },
})
UnionProfileTab.navigationOptions = {
  tabBarIcon: <Icon name="person" type='material' size={35} color="white" />
}

const UnionTabs = createBottomTabNavigator(
  {
  UnionJobsTab,
  UnionHomeTab,
  UnionProfileTab,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#517BBE',
      },
      showLabel: false,
      showIcon: true,
    },
    initialRouteName: 'UnionHomeTab',
  }
)

/* Sponsor Tabs */

const SponsorGiftcardTab = createStackNavigator({
  SponsorGiftcards: { screen: SponsorGiftcards },
  AllGiftcards: { screen: AllGiftcards },
  SingleGiftcard: { screen: SingleGiftcard },
})
SponsorGiftcardTab.navigationOptions = {
  tabBarIcon: <Icon name="loyalty" type='material' size={35} color="white" />
}

const SponsorHomeTab = createStackNavigator({
  SponsorHome: { screen: SponsorDashboard },
})
SponsorHomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const SponsorProfileTab = createStackNavigator({
  SponsorProfile: { screen: SponsorProfile },
  SponsorSettings: { screen: SponsorSettings },
  ChangeProfile: { screen: ChangeProfile },
})
SponsorProfileTab.navigationOptions = {
  tabBarIcon: <Icon name="person" type='material' size={35} color="white" />
}

const SponsorTabs = createBottomTabNavigator(
  {
  SponsorGiftcardTab,
  SponsorHomeTab,
  SponsorProfileTab,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#517BBE',
      },
      showLabel: false,
      showIcon: true,
    },
    initialRouteName: 'SponsorHomeTab',
  }
)

/* SignUp */

const SignUp = createStackNavigator({
  SignUp: { screen: SignUpScreen },
  SignUpMessage: { screen: SignUpMessage },
  VolunteerSignUp: { screen: VolunteerSignUp },
  },
  {
    headerMode: 'none',
  }
)

/* Collection */

const RootStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp,
    Debug: { screen: Debug},
    VolunteerTabs,
    UnionTabs,
    SponsorTabs,
  },
  {
    headerMode: 'none', 
  }, 
)

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return <AppContainer {...navigationPersistence}/>;
  }
};

export default App;
