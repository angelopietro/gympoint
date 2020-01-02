import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

/* -----COMPONENTS----- */
import Header from '~/components/Header';
import SignOut from '~/components/SignOut';

/* -----USER AUTH----- */
import SignIn from '~/pages/SignIn';

/* -----USER CHECKIN----- */
import Checkin from '~/pages/Checkin';

/* -----USER HELP----- */
import Help from '~/pages/Help/List';
import HelpNew from '~/pages/Help/New';
import HelpDetail from '~/pages/Help/Detail';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            CheckIns: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Check-ins',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="check" size={26} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerTitle: () => <Header />,
                  },
                }
              ),
            },
            Help: {
              screen: createStackNavigator(
                {
                  Help,
                  HelpNew,
                  HelpDetail,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="question" size={26} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerTitle: () => <Header />,
                    headerTitleContainerStyle: {
                      left: 0,
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 10,
                    },
                  },
                }
              ),
            },
            Logout: {
              screen: SignOut,
              navigationOptions: {
                tabBarLabel: 'Logout',
                tabBarIcon: () => <SignOut />,
                tabBarOnPress: () => {},
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              labelStyle: {
                backgroundColor: '#FFF',
                fontSize: 14,
              },
              tabStyle: {
                marginTop: 15,
                height: 55,
              },
              style: {
                height: 75,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
