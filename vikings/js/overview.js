$(document).ready(function(){
	setUpOverview();
	setUpBib();
});

function setUpOverview() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="overViewCard">
		<div class="card-body cardFront">
			${getOverviewContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);

}

function setUpBib() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="bibCard">
		<div class="card-body cardFront">
			${getBibContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);
	$("#bibCard").css("width", "70vw");
}
