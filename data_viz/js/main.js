// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

function get_publishers(data) {
	const pubs = [];
	data.forEach(function(d) {
		pubs.push(d["Publisher"]);
	});
	return new Set(pubs);
}

function get_genres(data) {
	const genres = [];
	data.forEach(function(d) {
		genres.push(d.Genre);
	});
	return new Set(genres);
}

let ALL_PUBLISHERS;
let ALL_GENRES;
const COLORS = ["#f6db66", "#75457b", "#c85e79", "#f79365", "#73C4CB"]


d3.csv("../data/data_viz/video_games.csv").then(function(data) {

	ALL_PUBLISHERS = get_publishers(data);
	ALL_GENRES = get_genres(data);

	// set up the top ten games visual
	setUpYearDropDown(data);
	// display data with "All Time" as the initial selection
	update_top_games(data, "All Time");
	// create the key for the genre popularity graph
	createKey();
	// set up genre popularity visual
	update_top_genres(data);
	//create the tool tip for the genre popularity graph
	createRegionToolTip();
	// set up the top publishers visual
	setUpGenreDropDown(data);
	// display data with "Action" as the initial selection
	createPieChart(data, "Action");

});

// run server from the directory containing both the data directory and the data_viz directory
// http://localhost:8000/data_viz/dashboard.html
