$(document).ready(function(){

	d3.csv("cards.csv").then(function(data) {
		data.forEach(function(d) {
			appendCard(d);
		});
		// initialize all tooltips
		$('[data-toggle="tooltip"]').tooltip();

	});

	/*
	$(".playingCard").on("mouseenter", function(e){
		$(this).find(".cardFront").css("visibility", "hidden");
		$(this).find(".cardBack").css("visibility", "visible");
	});

	$(".playingCard").on("mouseleave", function(e){
		$(this).find(".cardFront").css("visibility", "visible");
		$(this).find(".cardBack").css("visibility", "hidden");
	});*/

});

function appendCard(d) {

	const typeLineToolTipTitle = `ch${d["typelineSource"]}`;
	const typeLineToolTip = `data-toggle="tooltip" data-placement="right" title="${typeLineToolTipTitle}"`;

	let typeline;
	if (d["typeline2"] == "") {
		typeline =`<p>${d["typeline1"]}</p>`;
	} else {
		typeline =`<p ${typeLineToolTip}>${d["typeline1"]} - ${d["typeline2"]}</p>`;
	}

	const lines = d["textbox"].split("|");
	let textbox = "";
	lines.forEach(function(line) {
		// todo: parse pips
		l = `<p>${line}</p>`
		textbox += l;
	});

	const quotationToolTipTitle = `ch${d["quotationSource"]}`;
	const quotationToolTip = `data-toggle="tooltip" data-placement="right" title="${quotationToolTipTitle}"`;

	let quotation = d["quotation"].split("|");
	let inner = "";
	quotation.forEach(function(line) {
		// todo: parse pips
		l = `${line} <br>`
		inner += l;
	});

	if (d["quotation"] == "") {
		quotation = "";
	} else {
		quotation = `<p ${quotationToolTip}><i>${inner}</i></p>`;
	}


	const newElt = `
	<div class="card shadow border-bottom-primary playingCard">
		<div class="card-header py-3">
			<h3 class="font-weight-bold text-primary">
				${d["name"]}
			</h3>
			${typeline}
		</div>
		<div class="card-body cardFront">
			${textbox}
			${quotation}
		</div>

	</div>
	`

	$(".cardContainer").append(newElt);
}
