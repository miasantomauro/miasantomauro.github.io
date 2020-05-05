function getOverviewContent() {
	return `
	<h3>Overview</h3>
	<p>
		Aside from runic inscriptions, no written sources persist which are both
		from the Viking Age and from Scandinavians themselves.
		The primary sources that inform us about the Vikings during the
		Viking Age belong to two main categories:
		'contemporary external sources' and 'later internal sources'.
	</p>

	<p>
		This project explores one of the most important 'later internal source':
		<b>Njal's Saga</b>. Njal's Saga is believed to have been written in
		the late 12th Century, and recounts events around the year 1000.
		As a result of this separation by time, the text has a tendency to
		take on a nostalgic tone in its construction and maintenence of a
		collective memory. While it does reflect Icelandic values and customs,
		this collective memory is not always historically factual.
	</p>

	<p>
		In order to drive my analysis of the text, I created a series
		of Magic: The Gathering inspired cards. Though my original intent
		was to create hard copies and produce historical simulations through play,
		I thought it best to 'digitize' my project given current global circumstances.
		I'd like to think I am somewhat like Gunnar at the end of chapter 56, who "remained honorably at home".
	</p>
	`;
}

function getBibContent() {
	return `
	<h3>Bibliography</h3>
	<p>
		Please note that all chapter numbers, which appear when hovering over quotes and other cited material, are in reference to Njal's Saga,
		which is cited properly below:
	</p>

	<p>
		<i>Njal’s Saga</i>, Translated with Introduction and Notes by Robert Cook (London: Penguin, 2001).
	</p>
	`;
}

function getProcessContent() {
	return `
	<h3>Process</h3>
	<p>This project had three main development phases:</p>
	<ol>
		<li>Research</li>
		<li>Analysis</li>
		<li>Site Construction</li>
	</ol>

	<p><b>Research</b></p>
	<p>
		I read and annotated Njal's saga. I tracked characters and themes on
		<a href="https://docs.google.com/document/d/1E3dz_geGlzB5X0WOL4LX65U8PC8axMltsZIAgx3ODiU/edit?usp=sharing" target="_blank">this Google Document</a>.
		Note that you must be using a Brown University email to access this link.
	</p>

	<p><b>Analysis</b></p>
	<p>
		I chose for each character a "typeline", quotation, and in some cases,
		additional abilities. This information is located on
		<a href="https://docs.google.com/spreadsheets/d/1XrYCq2hfciVaPHrBvp4HjpkSsGJH0_uSpRQQIGd2ZsM/edit?usp=sharing" target="_blank">this spreadsheet</a>.
		Again, you must be using a Brown University email to access this link.

		In addition to this, I determined which themes I would focus on,
		then used the quotations I compiled to summarize their significance in the text
		on a seperate analysis page of this site.
	</p>

	<p><b>Site Construction</b></p>
	<p>
		I used HTML, CSS, and Javascript to construct this site!
		In order to create the cards, I made a template using javascript and html,
		then fed in the card data from the Google Sheet linked above.

		If you'd like to view any of the scripts that went into making this page,
		you can right click, select "inspect", then select the "sources" tab,
		and navigate the file system.
	</p>

	`;
}

function getMotivationContent() {
	return `<h3>Motivation</h3>
	<p><b>Why Njal's Saga?</b></p>

	<p>I chose to focus on Njal's Saga because of its complexity,
	number of characters, and length.</p>

	<p><b>Why Magic: The Gathering?</b></p>

	<p>
	I was very excited about my original idea (which is outlined in my original proposal
		<a href="https://docs.google.com/document/d/1GpdyXJFWWnye_H7JR-cZvOSTLNL7dEp-hAnaLwtQB1o/edit?usp=sharing" target="_blank">here</a>)
	to simulate history through play. While this idea is no longer feasible, I still
	had fun mapping Saga content to Magic: The Gathering content.
	</p>
	`;
}

function getThemesContent() {
	return `<h3>Themes</h3>
	<p>Here are the major themes I tracked!</p>
	<ul>
		<li>Prophecy</li>
		<li>Blood Vengeance</li>
		<li>Importance and Role of Wisdom</li>
		<li>Importance and Role of Foresight</li>
		<li>Peaceful Settlement and Law</li>
		<li>Gender Roles</li>
		<li>Marriage</li>
		<li>Burning</li>
		<li>Decency vs Meanness</li>
		<li>Honor</li>
	</ul>
	`;
}

function getAnalysisContent() {
	return `<h3>Analysis</h3>

	<p>
	Part of what makes Njal’s Saga so rich, and such a worthwhile read, is it’s complicated characters and events. The complexity of Njal’s saga lies in the many binaries it creates, and challenges, throughout the text.
	</p>

	<p>
	One of the most pertinent binaries in the text is the categorization of
	characters as either decent or indecent. Most characters are introduced
	with a few adjectives that are seemingly drawn from a bank of positive,
	and negative words (these are the words I chose to display below each
		character’s name on their card). Right as each character is introduced,
		they are judged as being good, decent, honorable, or bad, indecent,
		malicious. Take Njal’s introduction, in chapter 20, for example. The
		author uses phrases such as: “well-intentioned”, “modest”, and
		“noble-spirited” to immediately inform the reader that Njal is looked
		at as moral and decent. This can be contrasted with Mord’s
		(re)introduction in chapter 46, where he is referred to as “cunning”,
		“malicious”, and “envious”.  These value judgements, which accompany
		the characters immediately upon introduction to the text, create a
		world where there are “good guys” and “bad guys.” This division however,
		is not so simple. Characters are not bound by their initial descriptions.
		Honorable characters, like Njal, act dishonorably by giving bad advice
		later (ch97). And dishonorable Flosi proves himself as a hospitable host
		to Kari at the end of the text (ch159). Some events are also of mixed
		moral significance, the primary one being the burning of Njal.
		The text sets this up to be one of the most shameful and dishonorable actions,
		however a different perspective is made apparent when Flosi states
		that “men will call this both a mighty and an evil deed” (ch130).
	</p>

	<p>
	The association of morality to honor and gender further complicates the
	decent/indecent binary. It is often the case that actions which are noble,
	are also masculine, and also moral. However, it would be an oversimplification
	to assume that this is the case for all actions, and all characters.
	</p>

	<p>
	Gender plays a central role in the motivations of the plot in Njal’s Saga.
	One of the primary roles of women in the Saga is to incite their family members
	to take blood vengeance for slain kin. Another cause of violence, and
	thus much of the action in the saga, is the presence of emasculating
	taunts and verses. It’s these fulfillments of gender roles, as well as
	attacks on gender itself, that drive the action forward and create a
	complex and multifaceted narrative.
	</p>
	`;
}
