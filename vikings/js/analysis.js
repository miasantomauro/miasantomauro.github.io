$(document).ready(function(){
	setUpThemes();
	setUpAnalysis();
});

function setUpThemes() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="themesCard">
		<div class="card-body cardFront">
			${getThemesContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);
}

function setUpAnalysis() {
	const newElt = `
	<div class="card shadow border-bottom-primary m-5 myCard" id="themesCard">
		<div class="card-body cardFront">
			${getAnalysisContent()}
		</div>
	</div>`;
	$("#pageContent").append(newElt);
}
