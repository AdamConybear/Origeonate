import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

	let catLoc = [
		[52.37, 21.548],
		[49.497, -70.56],
		[18.14, 102.056],
		[31.2, 1.86],
		[8.23, -65.99],
	];

	return (
		<div>
			<h1 style={{ textAlign: "center" }}>Home Page</h1>
			<Link
				to={{
					pathname: "/Guess",
					state: {
						locations: catLoc,
					},
				}}
			>
				Go to Map
			</Link>
		</div>
	);
};

export default Home;
