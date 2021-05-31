import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import WeatherButton from './WeatherButton';
export default class CityForm extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.string,
		project: PropTypes.string,
		onFormSubmit: PropTypes.func.isRequired,
		onFormClose: PropTypes.func.isRequired,
		onRemoveCity: PropTypes.func.isRequired,
	};
	static defaultProps = {
		id: null,
		title: '',
		project: '',
	};
	constructor(props:any) {
		super(props);

		const {id, title} = props;
		this.state = {
			title: id ? title : '',
		}
	}

	handleTitleChange = (title:string) => {
		this.setState({title});
	}


	handleSubmit = () => {
		const {onFormSubmit, id}:any = this.props;
		const {title}:any = this.state;

		onFormSubmit({
			id,
			title,
		});
	};

	handleRemoveCity = () => {
		const {onRemoveCity, id}:any = this.props;
		const {title}:any = this.state;

		onRemoveCity({
			id,
			title,
		});
	};
	render() {
		const {id, onFormClose}:any = this.props;
		const {title}:any = this.state;

		const submitText = id ? '更新' : '添加';
		return (
			<View style={styles.formContainer}>
				<View style={styles.attributeContainer}>
					<Text style={styles.textInputTitle}>城市</Text>
					<View style={styles.textInputContainer}>
						<TextInput
							style={styles.textInput}
							underlineColorAndroid="transparent"
							onChangeText={this.handleTitleChange}
							value={title}
						/>
					</View>
				</View>

				<View style={styles.buttonGroup}>
					<WeatherButton
						small
						color="#21BA45"
						title={submitText}
						onPress={this.handleSubmit}
					/>
					<WeatherButton
						small
						color="#DB2828"
						title="删除"
						onPress={this.handleRemoveCity}
					/>
					<WeatherButton
						small
						color="black"
						title="取消"
						onPress={onFormClose}
					/>
				</View>

			</View>
		)
	};
}

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: 'white',
		borderColor: '#D6D7DA',
		borderWidth: 2,
		borderRadius: 10,
		padding: 15,
		margin: 15,
		marginBottom: 0,
	},
	attributeContainer: {
		marginVertical: 8,
	},
	textInputTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	textInputContainer: {
		borderColor: '#D6D7DA',
		borderRadius: 2,
		borderWidth: 1,
		marginBottom: 5,
	},
	textInput: {
		height: 30,
		padding: 5,
		fontSize: 12,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
});
