import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
export default function WeatherButton({color, title, small, onPress}:any) {
	return (
		<TouchableOpacity
			style={[styles.button, {borderColor: color}]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.buttonText,
					small ? styles.small : styles.large,
					{color},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

WeatherButton.propTypes = {
	//color: ColorPropType.isRequired,
	color: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	small: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
};
WeatherButton.defaultProps = {
	small: false,
};
const styles = StyleSheet.create({
	button: {
		marginTop: 2,
		minWidth: 100,
		borderWidth: 2,
		borderRadius: 3,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	small: {
		fontSize: 14,
		padding: 5
	},
	large: {

		fontSize: 16,
		padding: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	elapsedTime: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingVertical: 10,
	}
});
