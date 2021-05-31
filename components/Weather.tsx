import React, {} from 'react';
import {StyleSheet, View, Text, Platform, KeyboardAvoidingView, ImageBackground, ActivityIndicator, StatusBar, TouchableOpacity} from 'react-native';
import getImageForWeather from '../utils/getImageForWeather';
import SearchInput from './SearchInput';
interface IWeather {
	showSearch: boolean;
	loading: boolean;
	error: boolean;
	location: string;
	temperature: number;
	weather: string;
	weaImg: string;
	update_time: string;
	onPress: any;

}
const Weather = ({
	showSearch,
	loading,
	error,
	location,
	temperature,
	weather,
	weaImg,
	update_time,
	onPress,
}: IWeather) => {
	const handleCityPress = () => {
		onPress(location);
	}
	/**
	 *渲染天气信息
	 **/
	const renderWeatherInfo = () => {
		return (
			<View>
				<Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
				<Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
				<Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}℃ `}</Text>

				<Text style={[styles.textStyle, {fontSize: 12, color: '#ccc'}]}>更新于{update_time}</Text>
			</View>
		)
	}

	/**
	 *渲染报错信息
	 **/
	const renderErroInfo = () => {
		return (
			<Text style={[styles.smallText, styles.textStyle]}>
				无法获取到天气信息，请换一个不同的城市在试。
			</Text>
		);
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<StatusBar barStyle="light-content" />
			<ImageBackground
				source={getImageForWeather(weaImg)}
				style={styles.imageContainer}
				imageStyle={styles.image}
			>
				<TouchableOpacity
					onPress={handleCityPress}
				>


					<View style={styles.detailsContainer}>
						<ActivityIndicator animating={loading} color="white" size="large" />
						{!loading && (
							<View>
								{error && renderErroInfo()}
								{!error && renderWeatherInfo()}
							</View>
						)}
						{showSearch && (
							<SearchInput
								placeholder="搜索城市"
								onSubmit={() => {
									console.log('搜索城市');
								}}
							/>
						)}
					</View>
				</TouchableOpacity>
			</ImageBackground>
		</KeyboardAvoidingView>
	);

}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	textStyle: {
		textAlign: 'center',
		...Platform.select({
			ios: {fontFamily: 'AvenirNext-Regular', },
			android: {fontFamily: 'Roboto', },
		}),
		color: '#fff'
	},
	largeText: {
		fontSize: 44,
	},
	smallText: {
		fontSize: 18,
	},
	textInput: {
		backgroundColor: '#666',
		color: 'white',
		height: 40,
		width: 300,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: 'center'
	},
	imageContainer: {
		flex: 1,
		backgroundColor: 'white',
		borderColor: '#d6d7da',
		borderWidth: 2,
		borderRadius: 10,
	},
	image: {
		flex: 1,
		width: undefined,
		height: undefined,
		resizeMode: 'cover'
	},
	detailsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.3)',
		paddingHorizontal: 20,
	},
});
export default Weather;
