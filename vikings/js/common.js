$(document).ready(function(){
	setUpNavBar();
});

function setUpNavBar() {
	//fa-rainbow Overview
	addNavElt("fa-rainbow", "Overview", "overview.html", "overviewButton");
	addNavElt("fa-hat-wizard", "Cards", "cards.html", "cardsButton"); //consider: address-book, sticky-note
	addNavElt("fa-pencil-alt", "Process and Motivation", "process.html", "processButton"); //consider: sticky-note
	addNavElt("fa-lightbulb", "Analysis", "analysis.html", "analysisButton"); //consider: sticky-note

}

function addNavElt(icon, label, href, id) {
	newElt = `
	<a href="${href}" class="btn btn-primary btn-icon-split m-2" id="${id}">
		<span class="icon text-white-50">
			<i class="fas ${icon}"></i>
		</span>
		<span class="text">${label}</span>
	</a>
	`

	$("#navBar").append(newElt);
}
