let tt;

let local_data;


function createPublisherToolTip() {

	// create and append the tooltip to the graph3 elt
	tt = d3.select("#graph3")
	.append("div")
	.attr("id", "tt")
	.style("position", "absolute")
    .style("visibility", "hidden")
	.style("background-color", "white")
	.style("padding", "5px")
	.style("border-radius", "5px")
	.style("opacity", ".8");

	// set up the handlers (mouse over, move, out)
	d3.select("#graph3")
	.on("mouseover", function(){
		return tt.style("visibility", "visible");
	}).on("mousemove", function(){
		offset = 60;
		return tt
		.style("top",  (d3.mouse(this)[1] - offset) + "px")
		.style("left", (d3.mouse(this)[0]) + "px")
	}).on("mouseout", function(){
		return tt.style("visibility", "hidden");
	});
}

function setUpGenreDropDown(data) {
	// access the dropdown
	let input = d3.select("#nInput");

	// adding 1 - 3 to the drop down
	for (let i = 1; i < 4; i++) {
		input.append("option").text(i)
		.attr("class", "number_option");
	}

	// adding 4 seperately and setting it as default
	input.append("option").text("4")
	.attr("class", "number_option")
	.attr("selected", "true");

	input = d3.select("#genreInput");

	// for each genre...
	ALL_GENRES.forEach(function(g) {
		if (g == "Action") {
			// append the Action option and make it the default
			input.append("option").text(g)
			.attr("class", "genre_option")
			.attr("selected", "true");
		} else {
			// append an option with text equal to the genre
			input.append("option").text(g)
			.attr("class", "genre_option");
		}
	});

	input = d3.select("#genreform");

	input.on("change", function(e) {

		let n = d3.select(".number_option:checked").text();
		n = Number(n);

		genre = d3.select(".genre_option:checked").text();

		update_top_publishers(local_data, genre, n);

	});

}

// called once
function createPieChart(data, default_genre) {

	local_data = data;

	// diameter and radius constants
	diameter = 500;
	radius = diameter / 2;

	// access the graph elt and append an svg
	const svg = d3.select("#graph3")
	.append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
	.append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

	// create the tooltip
	createPublisherToolTip();

	// call update just to initialize everything
	update_top_publishers(data, default_genre, 4);
}

function getTopPublishers(n, publisher_global_sales,
	publisher_num_games, publisher_avg_sales) {

	// for now, this is based on global sales, experiment w avg sales
	pubs = Array.from(ALL_PUBLISHERS);

	// sort the array of all publishers based on global sales
	pubs_sorted = pubs.sort(function(x, y) {
   		return publisher_global_sales[y] - publisher_global_sales[x];
	});

	// slice the array to get the top four publishers
	top_publishers = pubs_sorted.slice(0, n);
	all_other_publishers = pubs_sorted.slice(n);
	const number_of_other_pubs = all_other_publishers.length;

	const other = "Other";

	// add an "Other" publisher to the top four publishers list
	top_publishers.push(other);

	// initialize the values in the dict
	publisher_global_sales[other] = 0;
	publisher_num_games[other] = 0;

	// aggregate the data from all_other_publishers
	// into the dicts under the "Other" key
	all_other_publishers.forEach(function(pub) {
		publisher_global_sales[other] += publisher_global_sales[pub];
		publisher_num_games[other] += publisher_num_games[pub];
	});

	publisher_avg_sales[other] = publisher_global_sales[other] / publisher_num_games[other];

	return [top_publishers, number_of_other_pubs];
}

function update_top_publishers(data, genre, n) {

	// a dict to map publishers to their total global sales (for the given genre)
	publisher_global_sales = {};
	// a dict to map publishers with the number of games they've sold (in the given genre)
	publisher_num_games = {};
	// with this info I can later calculate average global sales per game
	publisher_avg_sales = {};

	// for each publisher...
	ALL_PUBLISHERS.forEach(function(p) {
		// initialize the data in the dicts to zero
		publisher_global_sales[p] = 0;
		publisher_num_games[p] = 0;
	});

	// filter the data based on genre
	data = data.filter(function(d){
		return d["Genre"] == genre;
	});

	// for each row from the database...
	data.forEach(function(d) {
		// update the values in the dicts
		publisher = d["Publisher"];
		global_sales = Number(d["Global_Sales"]);
		publisher_global_sales[publisher] += global_sales;
		publisher_num_games[publisher]++;
	});

	// for each publisher...
	ALL_PUBLISHERS.forEach(function(p) {
		// check if the number of games (for the given genre) is zero
		if (publisher_num_games[p] == 0) {
			// avoid division by zero
			publisher_avg_sales[p] = 0;
		} else {
			// calculate the average global sales per game released by the given
			// publisher in the given genre
			publisher_avg_sales[p] = publisher_global_sales[p] / publisher_num_games[p];
		}

	});

	tuple = getTopPublishers(n, publisher_global_sales, publisher_num_games, publisher_avg_sales);
	top_publishers = tuple[0];
	num_other_pubs = tuple[1];
	updatePieChart(top_publishers, publisher_global_sales, publisher_num_games, publisher_avg_sales, genre, num_other_pubs);

}

// called multiple times
function updatePieChart(top_publishers, publisher_global_sales, publisher_num_games, publisher_avg_sales, genre, num_other_pubs) {

	d3.selectAll(".slice").remove();

	diameter = 500;
	radius = diameter / 2;

	const svg = d3.select("#graph3 g"); // select g?

	// creating the color scale
	const color = d3.scaleOrdinal()
	.domain(top_publishers)
	.range(COLORS);

	const pie = d3.pie()
	.value(function(d) {
		// d.value is the publisher
		return publisher_global_sales[d.value];
	});

	var arc = d3.arc()
	.innerRadius(0)
	.outerRadius(radius)

	const data = pie(d3.entries(top_publishers));

	svg.selectAll('slices')
	.data(data)
	.enter()
	.append('path')
	.attr("class", "slice")
	.attr("id", function(d){
		return d.data.value;
	})
	.attr('d', d3.arc()
    	.innerRadius(0)
    	.outerRadius(radius)
  	)
	.attr('fill', function(d){
		return(color(d.data.key));
	});

	svg.selectAll('slices')
	.data(data)
	.enter()
	.append('text')
	.text(function(d){ return d.data.value})
	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
	.style("text-anchor", "middle");

	// getting the total sales so we can calc a percentage later
	sum = 0;
	ALL_PUBLISHERS.forEach(function(pub){
		sum += publisher_global_sales[pub];
	});

	// adding a mouseover function for each slice of the graph
	d3.selectAll(".slice")
	.on("mouseover", function(){ // updating the tooltip here
		let pub = this.id;
		s = (pub != "Other") ? "s" : "";
		global_sales = Math.round(publisher_global_sales[pub]);
		percent = Math.round(publisher_global_sales[pub] * 100 / sum);

		if (pub == "Other") {
			pub = num_other_pubs + " other publishers";
		}

		content = `<b>${pub}</b> account${s} for <b>%${percent}</b> (${global_sales}M) of global <b>${genre}</b> sales`;
		tt.html(content);
		return;
	});
}
