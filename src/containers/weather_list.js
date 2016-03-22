import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Charts from '../components/charts';
import GoogleMap from '../components/google_map';



class WeatherList extends Component {
	renderWeather (cityData) {
		const cityName = cityData.city.name;
		const temps = cityData.list.map(weather => weather.main.temp);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return (
			<tr key={cityName}>
				<td><GoogleMap lon={lon} lat={lat}/></td>
				<td><Charts data={temps} color="red" units="K" /></td>
				<td><Charts data={pressures} color="orange" units="hPa"/></td>
				<td><Charts data={humidities} color="blue" units="%"/></td>
			</tr>
		);
	}

	render () {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>

				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	};
}

function mapStateToProps({ weather }) {  // (state) ==> ( {weather} )
	return { weather };		// { weather: weather }
}


export default connect(mapStateToProps)(WeatherList)