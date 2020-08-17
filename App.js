import React, { Component } from 'react';
import { Image, AsyncStorage } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import * as navigationPersistence from './navigation-persistence';

import LoginScreen from './app/screens/LoginScreen';

import SignUpScreen from './app/screens/signUp/SignUp';
import SignUpMessage from './app/screens/signUp/SignUpMessage';
import VolunteerSignUp from './app/screens/signUp/VolunteerSignUp';
import UnionEasySignUp from './app/screens/signUp/UnionEasySignUp';
import UnionSignUp from './app/screens/signUp/UnionSignUp';
import SponsorEasySignUp from './app/screens/signUp/SponsorEasySignUp';
import SponsorSignUp from './app/screens/signUp/SponsorSignUp';

import ChangeProfile from './app/screens/ChangeProfile';
import AddNewProfile from './app/screens/AddNewProfile';

import Jobs from './app/screens/volunteer/Jobs';
import JobDescription from './app/screens/volunteer/JobDescription';
import History from './app/screens/volunteer/History';
import VolunteerDashScreen from './app/screens/volunteer/VolunteerDashScreen';
import GiftcardShop from './app/screens/volunteer/GiftcardShop';
import Giftcard from './app/screens/volunteer/Giftcard';
import VolunteerProfile from './app/screens/volunteer/VolunteerProfile';
import VolunteerSettings from './app/screens/volunteer/VolunteerSettings';
import EditInterests from './app/screens/volunteer/EditInterests';
import EditVolunteer from './app/screens/volunteer/EditVolunteer';
import EditMemberships from './app/screens/volunteer/EditMemberships';
import BoughtGiftcard from './app/screens/volunteer/BoughtGiftcard';

import UnionDashboard from './app/screens/union/UnionDashboard';
import UnionJobs from './app/screens/union/UnionJobs';
import UnionAllJobs from './app/screens/union/UnionAllJobs';
import UnionProfile from './app/screens/union/UnionProfile';
import UnionSettings from './app/screens/union/UnionSettings';
import UnionMembers from './app/screens/union/UnionMembers';
import NewRequests from './app/screens/union/NewRequests';
import VolunteerView from './app/screens/union/VolunteerView';
import PostJob from './app/screens/union/PostJob';
import UnionJobDescription from './app/screens/union/UnionJobDescription';
import JobApplications from './app/screens/union/JobApplications';
import AssignHours from './app/screens/union/AssignHours';
import EditUnion from './app/screens/union/EditUnion';

import SponsorDashboard from './app/screens/sponsor/SponsorDashboard';
import SponsorGiftcards from './app/screens/sponsor/SponsorGiftcards';
import SingleGiftcard from './app/screens/sponsor/SingleGiftcard';
import AllGiftcards from './app/screens/sponsor/AllGiftcards';
import SponsorProfile from './app/screens/sponsor/SponsorProfile';
import SponsorSettings from './app/screens/sponsor/SponsorSettings';
import PostGiftcard from './app/screens/sponsor/PostGiftcard';
import GiftcardStatsMade from './app/screens/sponsor/GiftcardStatsMade';
import GiftcardStatsBought from './app/screens/sponsor/GiftcardStatsBought';
import GiftcardStatsUsed from './app/screens/sponsor/GiftcardStatsUsed';
import GiftcardStatsUnused from './app/screens/sponsor/GiftcardStatsUnused';
import GiftcardStatsExpired from './app/screens/sponsor/GiftcardStatsExpired';
import EditSponsor from './app/screens/sponsor/EditSponsor';

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
  EditInterests: { screen: EditInterests },
  EditMemberships: { screen: EditMemberships},
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
  EditInterests: { screen: EditInterests },
  EditMemberships: { screen: EditMemberships},
  EditVolunteer: { screen: EditVolunteer},
  ChangeProfile: { screen: ChangeProfile },
  AddNewProfile: { screen: AddNewProfile },
  SponsorEasySignUp: { screen: SponsorEasySignUp },
  SponsorSignUp: { screen: SponsorSignUp },
  UnionEasySignUp: { screen: UnionEasySignUp },
  UnionSignUp: { screen: UnionSignUp },
  BoughtGiftcard: { screen: BoughtGiftcard }
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
  UnionJobDescription: { screen: UnionJobDescription},
  VolunteerView: { screen: VolunteerView },
  PostJob: { screen: PostJob },
  UnionAllJobs: { screen: UnionAllJobs },
})
UnionJobsTab.navigationOptions = {
  tabBarIcon: <Icon name="work" type='material' size={35} color="white" />
}

const UnionHomeTab = createStackNavigator({
  UnionHome: { screen: UnionDashboard },
  UnionMembers: { screen: UnionMembers },
  NewRequests: { screen: NewRequests },
  VolunteerView: { screen: VolunteerView },
  PostJob: { screen: PostJob },
  UnionJobDescription: { screen: UnionJobDescription},
  JobApplications: { screen: JobApplications },
  AssignHours: { screen: AssignHours },
})
UnionHomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const UnionProfileTab = createStackNavigator({
  UnionProfile: { screen: UnionProfile },
  UnionSettings: { screen: UnionSettings },
  ChangeProfile: { screen: ChangeProfile },
  UnionJobDescription: { screen: UnionJobDescription},
  EditUnion: { screen: EditUnion},
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
  PostGiftcard: { screen: PostGiftcard },
  GiftcardStatsMade: { screen: GiftcardStatsMade },
  GiftcardStatsBought: { screen: GiftcardStatsBought },
  GiftcardStatsUsed: { screen: GiftcardStatsUsed },
  GiftcardStatsUnused: { screen: GiftcardStatsUnused },
  GiftcardStatsExpired: { screen: GiftcardStatsExpired },
})
SponsorHomeTab.navigationOptions = {
  tabBarIcon: <Image source={require('./assets/logo.png')} style={{width: 38, height: 35}} />
}

const SponsorProfileTab = createStackNavigator({
  SponsorProfile: { screen: SponsorProfile },
  SponsorSettings: { screen: SponsorSettings },
  ChangeProfile: { screen: ChangeProfile },
  EditSponsor: { screen: EditSponsor},
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

/* login url */ const CHECKLOGIN_URL = 'http://kamilla-server.000webhostapp.com/app/checkLogin.php';

const AppContainer = createAppContainer(RootStack);

class App extends Component {

  state = { 
    checkLogin: '',
  }

  /* check login */

  async loginCheck() {
    const { checkLogin } = this.state;
    let logInState;

    try {
        const response = await fetch(CHECKLOGIN_URL)
        logInState = await response.text();
        //this.setState({ checkLogin: await response.json() })
    } catch (error) {
        console.error(error)  
    }

    if(!logInState.loggedIn) {
      this.props.navigation.navigate('LoginScreen') 
    }

  }

  componentDidMount() {
    this.loginCheck();
}

  render() {
    return <AppContainer {...navigationPersistence}/>;
  }
};

export default App;
