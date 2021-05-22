import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }
  getWeather = async () => {
    return fetch('https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139')
      .then((response) => response.json())
      .then((responseJ) => {
        console.log(responseJ);
        this.setState({
          weather: responseJ,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getWeather();
  }
  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subcontainer}>
            <Text style={styles.title}> Weather Forecast</Text>
            <Image style={styles.image} source={require('./weather.png')} />
            <View style={styles.textcontainer}>
              <Text style={styles.text}>
                Temperature:{this.state.weather.main.temp}&deg;C
              </Text>
              <Text> Humidity: {this.state.weather.main.humidity}</Text>
              <Text> {this.state.weather.weather[0].description}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  subcontainer: { flex: 1, borderWidth: 1, alignItems: 'center' },
  title: { marginTop: 50, fontSize: 30, fontWeight: "bold" },
  image: { width: 200, height: 200, marginTop: 30 },
});
