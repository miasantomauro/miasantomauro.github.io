function setUpYearDropDown(data) {

	input = d3.select("#yearInputs");
	input.append("option")
	.text("All Time")
	.attr("class", "year_option");;
	for (let i = 1980; i < 2017; i++) {
		input.append("option")
		.text(i)
		.attr("class", "year_option");
	}

	input.on("input", function(event){
		year = d3.select(".year_option:checked").text();
		update_top_games(data, year);
	})
}

function update_top_games(data, year) {

	// TODO:
	// 1. remove duplicates... see 2012 and 2016
	//		keep the higher rater and display the platform
	// 		Doom has two years? 2016 x 2
	// 2. show platform and overall rank on hover

	message = d3.select("#topGamesDisplayMessage");

	// if a year was selected (rather than "All Time")...
	if (year != "All Time") {
		// filter the data based on the selected year
		data = data.filter(function(d) {
			return d["Year"] == year;
		});

		message.text("Displaying the top games released in");
	} else {
		message.text("Displaying the top games of");
	}

	// the data is already in order....
	// but just in case I am sorting it by rank!
	data = data.sort(function(x, y) {
   		return x["Rank"] < y["Rank"];
	});



	// truncate the data to only include the top ten
	data1 = data.slice(0, 5)
	data2 = data.slice(5, 10)

	d3.selectAll(".card").remove();

	appendGames(data1, 1)
	appendGames(data2, 2)

}

function appendGames(data, col) {

	let i;
	let selector;
	if (col == 1) {
		i = 0;
		selector = "#graph1 #col1";
	} else if (col == 2) {
		i = 5;
		selector = "#graph1 #col2";
	} else {
		console.log("col should be one or two")
	}


	d3.select(selector)
		.selectAll("div")
		.data(data)
		.enter()
		.append("div")
		.attr("class", "card")
		.html(function(d){
			i++;
			n = d["Name"]
			r = d["Rank"]
			p = d["Platform"]
			inner = `
			<div class="card-header" style="background-color:#F4D35E;"><b>${i}: ${n}</b></div>
			<div class="card-body">
				<p class="card-text"><b>Platform:</b> ${p} &emsp; <b>Overall Rank:</b> ${r}</p>
			</div>`
			return inner;
		});

}
