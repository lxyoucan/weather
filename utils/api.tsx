//获取天气数据
export const fetchWeather = async (inputCity:string) => {
  const response = await fetch(
	  `https://www.tianqiapi.com/free/day?appid=88847557&appsecret=Na9HoYEC&city=${inputCity}`,
	  //`http://1.15.68.90:8088/weather?city=${inputCity}`,
  );
  const { city, wea,tem,wea_img,air,update_time } = await response.json();

  return {
    location: city,
    weather: wea +' | '+'空气质量'+air,
    temperature: tem,
	weaImg:wea_img,
	  update_time
  };
};
