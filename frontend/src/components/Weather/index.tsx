import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  desc: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WEATHER_ICONS: Record<string, string> = {
  '113': '☀️', '116': '⛅', '119': '☁️', '122': '☁️',
  '143': '🌫️', '176': '🌦️', '179': '🌨️', '182': '🌧️',
  '185': '🌧️', '200': '⛈️', '227': '🌨️', '230': '❄️',
  '248': '🌫️', '260': '🌫️', '263': '🌦️', '266': '🌧️',
  '281': '🌧️', '284': '🌧️', '293': '🌦️', '296': '🌧️',
  '299': '🌧️', '302': '🌧️', '305': '🌧️', '308': '🌧️',
  '311': '🌧️', '314': '🌧️', '317': '🌨️', '320': '🌨️',
  '323': '🌨️', '326': '🌨️', '329': '❄️', '332': '❄️',
  '335': '❄️', '338': '❄️', '350': '🌧️', '353': '🌦️',
  '356': '🌧️', '359': '🌧️', '362': '🌨️', '365': '🌨️',
  '368': '🌨️', '371': '❄️', '374': '🌧️', '377': '🌧️',
  '386': '⛈️', '389': '⛈️', '392': '⛈️', '395': '❄️',
};

function getWeatherIcon(code: string): string {
  return WEATHER_ICONS[code] || '🌤️';
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 尝试获取定位
        let city = 'Beijing'; // 默认城市
        try {
          const location = await Taro.getLocation({ type: 'wgs84' });
          // 用经纬度请求天气
          const res = await Taro.request({
            url: `https://wttr.in/${location.latitude},${location.longitude}?format=j1&lang=zh`,
            method: 'GET',
          });
          if (res.data) {
            parseWeather(res.data);
            return;
          }
        } catch (locErr) {
          console.log('定位失败，使用默认城市', locErr);
        }

        // 定位失败，用默认城市
        const res = await Taro.request({
          url: `https://wttr.in/${city}?format=j1&lang=zh`,
          method: 'GET',
        });
        if (res.data) {
          parseWeather(res.data);
        }
      } catch (e) {
        console.error('天气获取失败', e);
        setError('天气获取失败');
        setLoading(false);
      }
    };

    const parseWeather = (data: any) => {
      try {
        const current = data.current_condition?.[0];
        const area = data.nearest_area?.[0];
        if (!current || !area) {
          setError('天气数据异常');
          setLoading(false);
          return;
        }

        const cityName = area.areaName?.[0]?.value || '未知';
        const weatherDesc = current.lang_zh?.[0]?.value || current.weatherDesc?.[0]?.value || '';

        setWeather({
          city: cityName,
          temp: parseInt(current.temp_C) || 0,
          feelsLike: parseInt(current.FeelsLikeC) || 0,
          desc: weatherDesc,
          humidity: parseInt(current.humidity) || 0,
          windSpeed: parseInt(current.windspeedKmph) || 0,
          icon: getWeatherIcon(current.weatherCode),
        });
        setLoading(false);
      } catch (e) {
        setError('天气解析失败');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View className="weather">
        <Text className="weather-loading">获取天气中...</Text>
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View className="weather">
        <Text className="weather-error">{error || '天气不可用'}</Text>
      </View>
    );
  }

  return (
    <View className="weather">
      <View className="weather-main">
        <Text className="weather-icon">{weather.icon}</Text>
        <View className="weather-temp-wrap">
          <Text className="weather-temp">{weather.temp}</Text>
          <Text className="weather-unit">°C</Text>
        </View>
      </View>
      <View className="weather-info">
        <Text className="weather-desc">{weather.desc}</Text>
        <Text className="weather-city">📍 {weather.city}</Text>
      </View>
      <View className="weather-detail">
        <View className="weather-detail-item">
          <Text className="detail-label">体感</Text>
          <Text className="detail-value">{weather.feelsLike}°C</Text>
        </View>
        <View className="weather-detail-item">
          <Text className="detail-label">湿度</Text>
          <Text className="detail-value">{weather.humidity}%</Text>
        </View>
        <View className="weather-detail-item">
          <Text className="detail-label">风速</Text>
          <Text className="detail-value">{weather.windSpeed}km/h</Text>
        </View>
      </View>
    </View>
  );
}
