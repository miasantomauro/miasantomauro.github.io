let region_tt;

/**
 * A function to add an element to the key for the top genres bar graph.
 * @param {String} label The label to display for this element
 * @param {String} color The hexcode of the color corresponding to this element
 */
function addKeyElt(label, color) {
	// adds the colored square
	d3.select("#key")
	.append("div")
	.style("width", "30px")
	.style("height", "30px")
	.style("background-color", color);
	// adds the label
	d3.select("#key")
	.append("span")
	.attr("class", "keyLabel")
	.text(label);
}

/**
 * a function to create the key for the top genres bar graph.
 */
function createKey() {
	addKeyElt("North America", COLORS[1]);
	addKeyElt("Europe", COLORS[2]);
	addKeyElt("Japan", COLORS[3]);
	addKeyElt("Other", COLORS[0]);
}

/**
 * a function to create the tooltip for the top genres bar graph.
 */
function createRegionToolTip() {

	// create and append the tooltip to the graph3 elt
	region_tt = d3.select("#graph2")
	.append("div")
	.attr("id", "region_tt")
	.style("position", "absolute")
    .style("visibility", "hidden")
	.style("background-color", "white")
	.style("padding", "5px")
	.style("border-radius", "5px")
	.style("opacity", ".8");

	// set up the handlers (mouse over, move, out)
	d3.selectAll(".region_bar")
	.on("mousemove", function(){
		const offsetx = 90;
		const offsety = -10;
		return region_tt
		.style("top",  (d3.mouse(this)[1] + offsety) + "px")
		.style("left", (d3.mouse(this)[0] + offsetx) + "px")
	}).on("mouseleave", function(){
		return region_tt.style("visibility", "hidden");
	});
}

/**
 * a function to calculate all of the data needed to display the top
 * genres bar graph. This includes aggregations for all regional sales.
 * @param {???} data The raw data from the d3 csv parsing
 * @return A tuple where the first element is a list of maps with the keys:
 * genre, sales_NA, sales_EU, sales_JP, sales_other, sales_global, num_games
 * and the second element is a map from keys to region (i.e. "sales_JP" -> "Japan")
 */
function compute_genre_data(data) {
	// will populate this based on csv later
	const sales_NA = {};
	const sales_EU = {};
	const sales_JP = {};
	const sales_other = {};
	const sales_global = {};
	const num_games = {};

	const dicts = [sales_NA, sales_EU, sales_JP, sales_other, sales_global, num_games];

	// initialize all sums for all genres in all dicts
	dicts.forEach(function(d) {
		ALL_GENRES.forEach(function(g) {
			d[g] = 0;
		});
	});

	data.forEach(function(d) {

		genre = d["Genre"];
		sales_NA[genre] += Number(d["NA_Sales"]);
		sales_EU[genre] += Number(d["EU_Sales"]);
		sales_JP[genre] += Number(d["JP_Sales"]);
		sales_other[genre] += Number(d["Other_Sales"]);
		sales_global[genre] += Number(d["Global_Sales"]);
		num_games[genre]++;
	});

	// each row is an object with the following fields:
	// genre, sales_NA, sales_EU, sales_JP, sales_other, sales_global, num_games
	const new_data = [];
	// this is just a map from genre to entry in new_data
	const new_data_map = {};
	ALL_GENRES.forEach(function(g) {
		dict = {};
		dict["genre"] = g;
		dict["sales_NA"] = sales_NA[g];
		dict["sales_EU"] = sales_EU[g];
		dict["sales_JP"] = sales_JP[g];
		dict["sales_other"] = sales_other[g];
		dict["sales_global"] = sales_global[g];
		dict["num_games"] = num_games[g];
		new_data.push(dict);
		new_data_map[g] = dict;
	});

	new_data.sort(function(a, b) {
		return b.sales_global - a.sales_global;
	});

	return [new_data, new_data_map];

}

/**
 * a function create the top genres bar graph.
 * @param {???} data The raw data from the d3 csv parsing
 */
function update_top_genres(data) {

	// each entry of data has the following entries:
	// genre, sales_NA, sales_EU, sales_JP, sales_other, sales_global, num_games
	tuple = compute_genre_data(data);
	data = tuple[0];
	data_map = tuple[1];

	// defining some constants for the graph
	const w = 500;
	const h = 300;
	const margin = {top: 20, right: 50, bottom: 100, left: 100};

	// creating the svg and g to contain the graph
	const svg = d3.select("#graph2")
		.append("svg")
		.attr("width", w + margin.left + margin.right)
		.attr("height", h + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.right})`);

	// an array to store the groups each bar is broken down into
	const groups = ["sales_NA", "sales_EU", "sales_JP", "sales_other"]

	// a map used by the tooltip later
	const region_map = {
		"sales_NA":"North America",
		"sales_EU": "Europe",
		"sales_JP": "Japan",
		"sales_other": "Other regions"
	}

	// X AXIS SCALE
	var x = d3.scaleBand()
	.domain(data.map(function(d) { return d.genre; }))
	.range([ 0, w ])
	.padding(0.2);

	// X AXIS
	svg.append("g")
	.attr("transform", `translate(0, ${h})`)
	.call(d3.axisBottom(x))
	.selectAll("text")
	.attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

	// X AXIS LABEL
	svg.append("text")
	.attr("transform", `translate(${w / 2}, ${h + margin.top + 35})`)
	.style("text-anchor", "middle") // centers the text on w / 2
	.text("Genre");

	// Y AXIS SCALE
	const y = d3.scaleLinear()
	.domain([0, 2000])
	.range([h, 0]);

	// Y AXIS
	svg.append("g")
	.call(d3.axisLeft(y));

	// Y AXIS LABEL
	svg.append("text")
	.attr("transform", "rotate(-90)")
	.attr("x", -h/2)
	.attr("y", -50)
	.style("text-anchor", "middle") // centers the text on w / 2
	.text("Sales (Millions of Dollars)");

	// COLOR SCALE
	const color = d3.scaleOrdinal()
    .domain(groups)
    .range(COLORS)

	// OTHER BAR
	bars = svg.selectAll("other_bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("id", function(d){
		// embedding the region and genre into the id of this rect
		const region = "sales_other";
		const genre = d.genre;
		return region + "&" + genre;
	})
	.attr("class", "region_bar")
    .attr("x", function(d) { return x(d.genre); })
    .attr("y", function(d) { return y(d.sales_global); }) // pos of top of bar
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
		return h - y(d.sales_other);
	}).attr("fill", COLORS[0]);

	// JP BAR
	bars = svg.selectAll("JP_bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("id", function(d){
		// embedding the region and genre into the id of this rect
		const region = "sales_JP";
		const genre = d.genre;
		return region + "&" + genre;
	})
	.attr("class", "region_bar")
    .attr("x", function(d) { return x(d.genre); })
    .attr("y", function(d) { return y(d.sales_JP + d.sales_EU + d.sales_NA);}) // leaves space on top for "other"
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
		return h - y(d.sales_JP);
	}).attr("fill", COLORS[3]);

	// EU BAR
	bars = svg.selectAll("EU_bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("id", function(d){
		// embedding the region and genre into the id of this rect
		const region = "sales_EU";
		const genre = d.genre;
		return region + "&" + genre;
	})
	.attr("class", "region_bar")
    .attr("x", function(d) { return x(d.genre); })
    .attr("y", function(d) { return y(d.sales_EU + d.sales_NA); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
		return h - y(d.sales_EU);
	}).attr("fill", COLORS[2]);

	// US BAR
	bars = svg.selectAll("US_bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("id", function(d){
		// embedding the region and genre into the id of this rect
		const region = "sales_NA";
		const genre = d.genre;
		return region + "&" + genre;
	})
	.attr("class", "region_bar")
    .attr("x", function(d) { return x(d.genre); })
    .attr("y", function(d) {return y(d.sales_NA);})
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
		return h - y(d.sales_NA);
	}).attr("fill", COLORS[1]);

	// update the content of the tooltip when hovering over the bars
	d3.selectAll(".region_bar")
	.on("mouseenter", function(test) {
		// parsing the id to extract the region and genre
		const id = this.id;
		const tokens = id.split("&");
		const region = tokens[0];
		const genre = tokens[1];
		// looking up this genre in the data map
		const d = data_map[genre];
		// building the content for this tooltip
		const local_sales = d[region];
		const global_sales = d.sales_global;
		const percent = Math.round(local_sales * 100 / global_sales);
		// a really quick way to determine if I should put an s on the end of "account" lol
		s = (region != "sales_other") ? "s" : "";
		const content = `<b>${region_map[region]}</b> account${s} for <b>${percent}%</b> of <b>${d.genre}</b> sales`
		// displaying the tooltip with the content we just created
		region_tt.html(content)
		region_tt.style("visibility", "visible");
		return;
	});

}
