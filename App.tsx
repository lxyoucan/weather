import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WeatherMain from './WeatherMain';
import WeatherDetails from './WeatherDetails';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(["Can't open url:"]);
const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="WeatherMain">
				<Stack.Screen 
					name="WeatherMain" 
					component={WeatherMain} 
					options={{title: '返回', headerShown: false}}
				/>
				<Stack.Screen
					name="WeatherDetails" 
					component={WeatherDetails} 
					options={{title: '天气详情'}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

