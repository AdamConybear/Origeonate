import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import ProgressBar from '../components/ProgressBar'
import "./Guess.css";

class Guess extends Component {
	state = {
		actualLocations: [],
		userMarker: null,
		count: 0,
		showActual: false,
		distanceAway: 0.0,
		unit: "",
		userDistResults: [],
		userLatLngResults: [],
		score: 50,
	};

	componentDidMount() {
		const { locations } = this.props.location.state;
		this.setState({ actualLocations: locations });
		console.log(locations);
	}

	getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		var distInMiles = d * 0.621371;
		// var distInYds = distInMiles * 1760;

		// let finalDistance = 0;
		// if (distInMiles < 1.0){
		// 	finalDistance = distInYds;
		// }
		return distInMiles;
	};

	deg2rad = (deg) => {
		return deg * (Math.PI / 180);
	};

	handleGuess = () => {
		//5 rounds
		//if the user did not place a marker and pressed guess, change userMarker to [0,0] and they dont get any points for round

		if (this.state.count < 5) {

			let distInMiles = this.getDistanceFromLatLonInKm(
				this.state.userMarker.lat,
				this.state.userMarker.lng,
				this.state.actualLocations[this.state.count][0],
				this.state.actualLocations[this.state.count][1]
			);
			let tempTotResults = this.state.userDistResults;
			tempTotResults.push(distInMiles.toFixed(1));

			let tempLatLngResults = this.state.userLatLngResults;
			tempLatLngResults.push([this.state.userMarker.lat, this.state.userMarker.lng]);

			this.setState({
				distanceAway: distInMiles.toFixed(1),
				count: this.state.count + 1,
				showActual: true,
				userDistResults: tempTotResults,
				userLatLngResults: tempLatLngResults,
			});

			// console.log(
			// 	"showing guess at: " +
			// 		this.state.actualLocations[this.state.count]
			// );

			if (this.state.count === 4) {
				//show result screen
				console.log("show final results");
			}
		} else {
			//result screen will be showing
		}
	};

	addMarker = (map) => {
		map.target.on("click", (e) => {
			if (!this.state.showActual) {
				document.getElementById('guess').style.pointerEvents = 'auto';
				console.log("clicked: " + e.latlng);
				this.setState({ userMarker: e.latlng });
			}
		});
	};

	resetMarkers = () => {
		this.setState({ showActual: false, userMarker: null });
	};

	viewResults = () => {
		//map through markers and add to map
		console.log(this.state.userDistResults);
		console.log(this.state.userLatLngResults);
	};

	render() {
		// const greenIcon = new L.icon({
		// 	iconUrl:
		// 		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
		// 	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		// 	iconSize: [25, 41],
		// 	iconAnchor: [12, 41],
		// 	popupAnchor: [1, -34],
		// 	shadowSize: [41, 41],
		// });

		return (
			<div style={{ position: "relative" }}>
				<MapContainer
					center={[27.4, -22.5]}
					zoom={3}
					minZoom={2}
					scrollWheelZoom={true}
					style={{ height: "100vh" }}
					whenReady={(map) => this.addMarker(map)}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						//attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						//url="https://api.mapbox.com/styles/v1/aconybear/ckkd7z1x301cf17sbnly3q0sm/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNvbnliZWFyIiwiYSI6ImNra2Q4MmUxNjBtMjkycHFzMWNtcmhyMmQifQ.u43_KNZG9P68YeQwNLt9CA"
					/>
					{this.state.userMarker && <Marker position={this.state.userMarker} interactive={false} />}

					{this.state.showActual && (
						<div>
							<Marker
								position={this.state.actualLocations[this.state.count - 1]}
								interactive={false}
								// icon={redMarker}
							/>
							<Polyline
								positions={[
									[this.state.userMarker.lat, this.state.userMarker.lng],
									[
										this.state.actualLocations[this.state.count - 1][0],
										this.state.actualLocations[this.state.count - 1][1],
									],
								]}
								color={"black"}
								dashArray={"6"}
								weight={2}
								opacity={0.8}
							/>
							<div className="results">
								<p>
									Your guess was <strong>{this.state.distanceAway} miles</strong> away from correct
									location
								</p>
								<ProgressBar bgcolor={"#ef6c00"} completed={this.state.score}/>
								{this.state.count - 1 === 4 ? (
									<div className="next-button" onClick={this.viewResults}>
										View Summary
									</div>
								) : (
									<div className="next-button" onClick={this.resetMarkers}>
										Next Round
									</div>
								)}
							</div>
						</div>
					)}
				</MapContainer>

				{!this.state.showActual && (
					<div className="guess-button" id="guess" onClick={this.handleGuess}>
						GUESS
					</div>
				)}
			</div>
		);
	}
}

export default Guess;
