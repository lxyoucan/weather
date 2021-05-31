import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import CityForm from './CityForm';
import WeatherButton from './WeatherButton';

export default class ToggleableCityForm extends React.Component {
	constructor(props:any) {
		super(props);
		this.state = {
			isOpen: false
		}
	}
	static propTypes = {
		onFormSubmit: PropTypes.func.isRequired,
		onRemoveCity: PropTypes.func.isRequired,
	};
	handleFormOpen = () => {
		this.setState({isOpen: true});
	};

	handleFormClose = () => {
		this.setState({isOpen: false});
	};
	handleFormSubmit = (city: any) => {
		const {onFormSubmit}:any = this.props;
		onFormSubmit(city);
		this.setState({isOpen: false});
	}

	handleRemoveCity = (city:any) => {
		const {onRemoveCity}:any = this.props;
		onRemoveCity(city);
		this.setState({isOpen: false});
	}
	render() {
		const {isOpen}:any = this.state;
		return (
			<View style={[styles.container, !isOpen && styles.buttonPadding]}>
				{isOpen ? (
					<CityForm
						onFormSubmit={this.handleFormSubmit}
						onFormClose={this.handleFormClose}
						onRemoveCity={this.handleRemoveCity}
					/>
				) : (
						<WeatherButton
							title="设置城市"
							color="green"
							small={true}
							onPress={this.handleFormOpen}
						/>
					)
				}
			</View>
		);
	}

}
const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
	},
	buttonPadding: {
		paddingHorizontal: 15,
	}
});
