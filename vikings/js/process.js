$(document).ready(function(){
	setUpProcess();
	setUpMotivation();
});

function setUpProcess() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="overViewCard">
		<div class="card-body cardFront">
			${getProcessContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);
}

function setUpMotivation() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="overViewCard">
		<div class="card-body cardFront">
			${getMotivationContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);
}
