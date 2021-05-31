import React from "react";
import {View,Text} from "react-native";
import { WebView } from 'react-native-webview';

export default function DetailsScreen({ route, navigation }:any) {
	const {url} = route.params;
	return (
		<View style={{flex: 1}}>
			<WebView source={{ uri: url }}/>
		</View>
	);
}


