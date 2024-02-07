import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/HomeScreen';
import RecipeScreen from '../screens/MenuItem/MenuItemScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import { Image } from 'react-native';
import AddScreen from '../screens/Add/AddScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let tintColor = 'white';
  if (focused) {
    tintColor = 'black';
  }
  if (route.name === 'Home') {
    return <Image source={require('../../assets/icons/home.png')} style={{ height: 30, width: 30, tintColor: tintColor }} />;
  } else if (route.name === 'Search') {
    return <Image source={require('../../assets/icons/search.png')} style={{ height: 30, width: 30, tintColor: tintColor }} />;
  } else if (route.name === 'Add') {
    return <Image source={require('../../assets/icons/add.png')} style={{ height: 30, width: 30, tintColor: tintColor }} />;
  }
};


function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName='Main'
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route, focused, color, size),
        headerShown: false,
        tabBarActiveBackgroundColor: "white",
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "white",
        tabBarStyle: [
          {
            'backgroundColor': '#6750a4'
          },
          null
        ],
        tabBarLabelStyle: {
          fontWeight: 'bold', // Make the tab label bold
          fontSize: 12
        },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Add' component={AddScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='Recipe' component={RecipeScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  )
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  )
}


console.disableYellowBox = true;