import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import ToggleableCityForm from './components/ToggleableCityForm';
import Weather from './components/Weather';
import {fetchWeather} from './utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class WeatherMain extends React.Component {

	constructor(props:any) {
		super(props);
		this.state = {
		citys: [
			{
				showSearch: false,
				loading: true,
				error: false,
				location: '南京',
				temperature: 0,
				weather: '',
				weaImg: 'qing',
				update_time: '',
			}
		],
	}
	}
	//cityList = ['南京', '宿迁', '上海','北京','深圳','厦门','天津'];
	cityList = ['南京', '宿迁', '上海'];

	//获取天气信息
	loadWetherInfo = async (city: string) => {
		const {citys}:any = this.state;
		try {
			const {weather, temperature, weaImg, update_time} = await fetchWeather(city);
			this.setState({
				citys: citys.map((item:any) => {
					if (item.location === city) {
						return {
							...item,
							weather,
							weaImg,
							temperature: parseInt(temperature),//默认是字符串不好比较大小
							update_time,
							loading: false,
						};
					}
					return item;
				}),
			})

		} catch (e) {
			this.setState({
				citys: citys.map((item:any) => {
					if (item.location === city) {
						return {
							...item,
							loading: false,
							error: '无法获取到天气信息，请换一个不同的城市在试。'
						};
					}
					return item;
				}),
			})
		}
	}

	initCitys = async () => {
		const initCityList: any[] = [];
		let items: any[] = [];
		try {
			const getData = await this.getData();
			if (getData == null) {
				items = this.cityList;
			} else {
				items = getData;
			}
		} catch (error) {

		}

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			initCityList.push(
				{
					showSearch: false,
					loading: true,
					error: false,
					location: item,
					temperature: 0,
					weather: '',
					weaImg: 'qing',
					update_time: '',
				}
			);
		}

		this.setState({
			citys: [...initCityList]
		}, () => {
			//初始化城市完成以后，加载天气信息
			this.loading();
		});
	}

	componentDidMount() {
		this.initCitys();
	}

	loading = async () => {
		const {citys}:any = this.state;
		//console.log(citys);
		for (let i = 0; i < citys.length; i++) {
			await this.loadWetherInfo(citys[i].location);
		}
		//天气数据已经加载完成，这时候需要按天气进行排序处理
		this.orderCityDesc();
	}

	//冒泡排序法，使用城市的排序处理，温度高的城市在上面
	orderCityDesc() {
		//创建一个新的对象用于数组排序
		const {citys}:any = this.state;
		const newCitys = [...citys];
		for (let a = 0; a < newCitys.length; a++) {
			for (let i = 0; i < newCitys.length; i++) {
				const current = newCitys[i];
				if (i < newCitys.length - 1) {
					const next = newCitys[i + 1];
					if (current.temperature < next.temperature) {
						const temp = {...current};
						newCitys[i] = next;
						newCitys[i + 1] = temp;
					}
				}
			}
		}
		this.setState({citys: newCitys});
	}

	//增加一个新的城市
	addCity = (attrs: any) => {
		const {title}:any = attrs;
		const {citys}:any = this.state;

		const newCity = {
			showSearch: false,
			loading: true,
			error: false,
			location: title,
			temperature: 0,
			weather: '',
			weaImg: 'qing',
			update_time: '',
		};
		this.setState({
			citys: [newCity, ...citys]
		}, () => {
			//获取新增城市的天气信息
			this.loadWetherInfo(title);
			setTimeout(() => {
				this.orderCityDesc();
				//save data
				this.saveCityData();
			}, 200);
		});

	}

	saveCityData = async () => {
		const allCity:any[] = [];
		const {citys}:any = this.state;
		for (let i = 0; i < citys.length; i++) {
			const item = citys[i];
			allCity.push(item.location);
		}
		await this.storeData(allCity);
	}

	handleRemoveCity = (attrs: any) => {
		const {citys}:any = this.state;
		this.setState({
			citys: citys.filter((item:any) => attrs.title === item.location ? false : true)
		},()=>{
			this.saveCityData();
		})
	}

	//点击城市的天气，查询详细信息
	handleCityPress = (location:string)=>{
		const {navigation} = this.props;
		let url = 'https://www.baidu.com/s?word='+location+'天气';
		navigation.navigate('WeatherDetails',{
            url: url,
        });
	}

	storeData = async (value: any) => {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem('@storage_Key', jsonValue)
		} catch (e) {
			// saving error
		}
	}

	getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem('@storage_Key')
			return jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch (e) {
			// error reading value
		}
	}

	render() {
		const {citys}:any = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<ToggleableCityForm
					onFormSubmit={this.addCity}
					onRemoveCity={this.handleRemoveCity}
				/>

				<ScrollView>
					{
						citys.map((item:any, index:number) => (
							<View key={index} style={{flex: 1}}>
								<Weather key={index}
									location={item.location}
									showSearch={item.showSearch}
									weaImg={item.weaImg}
									loading={item.loading}
									temperature={item.temperature}
									weather={item.weather}
									error={item.error}
									update_time={item.update_time}
									onPress={this.handleCityPress}
								/>
							</View>
						))
					}
				</ScrollView>

			</SafeAreaView>
		);

	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
