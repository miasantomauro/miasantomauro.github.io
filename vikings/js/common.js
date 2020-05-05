$(document).ready(function(){
	setUpNavBar();
});

function setUpNavBar() {
	//fa-rainbow Overview
	addNavElt("fa-rainbow", "Overview", "overview.html");
	addNavElt("fa-hat-wizard", "Cards", "cards.html"); //consider: address-book, sticky-note
	addNavElt("fa-pencil-alt", "Process and Motivation", "#"); //consider: sticky-note
	addNavElt("fa-lightbulb", "Analysis", "#"); //consider: sticky-note

}

function addNavElt(icon, label, href) {
	newElt = `
	<a href="${href}" class="btn btn-primary btn-icon-split m-2">
		<span class="icon text-white-50">
			<i class="fas ${icon}"></i>
		</span>
		<span class="text">${label}</span>
	</a>
	`

	$("#navBar").append(newElt);
}
