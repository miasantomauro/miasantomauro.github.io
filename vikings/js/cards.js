$(document).ready(function(){
	appendCard("Test Card");
	appendCard("Test Card");
	appendCard("Test Card");
	appendCard("Test Card");
	appendCard("Test Card");
	appendCard("Test Card");
	appendCard("Test Card");

	$(".myCard").on("mouseenter", function(e){
		$(this).find(".cardFront").css("visibility", "hidden");
		$(this).find(".cardBack").css("visibility", "visible");
	});

	$(".myCard").on("mouseleave", function(e){
		$(this).find(".cardFront").css("visibility", "visible");
		$(this).find(".cardBack").css("visibility", "hidden");
	});

});

function appendCard(title) {
	console.log("appending " + title);
	const newElt = `
	<div class="card shadow border-bottom-info m-1 myCard">
		<div class="card-header py-3">
			<h3 class="font-weight-bold text-info">
				${title}
			</h3>
		</div>
		<div class="card-body cardFront">
			<p>front</p>
		</div>

		<div class="card-body cardBack" style="visibility: hidden;">
			<p>back</p>
		</div>

	</div>
	`

	$(".cardContainer").append(newElt);
}
