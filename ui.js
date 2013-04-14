var ui = {

	renderQuestion: function(qaitem) {
		var qaInner = document.getElementById("qaInner");
		qaInner.innerHTML = qaitem.question;

		var buttonContainer = document.getElementById("buttonContainer");
		buttonContainer.innerHTML = '';
		var qaButton = document.createElement("div");
		qaButton.id = 'qaButton';
		qaButton.className ='revealButton';
		qaButton.innerHTML = 'Reveal Answer';
		buttonContainer.appendChild(qaButton);

		qaButton.addEventListener("click", function(e) {
			e.preventDefault();
			ui.renderAnswer(qaitem);
		});

	},

	renderAnswer: function(qaitem) {

		var qaInner = document.getElementById("qaInner");
		qaInner.innerHTML = qaitem.answer;

		var buttonContainer = document.getElementById("buttonContainer");
		buttonContainer.innerHTML = '';
		var rightButton = document.createElement("div");
		rightButton.id = 'qaButton';
		rightButton.className ='rightButton';
		rightButton.innerHTML = 'Correct';
		buttonContainer.appendChild(rightButton);
		var wrongButton = document.createElement("div");
		wrongButton.id = 'qaButton';
		wrongButton.className ='wrongButton';
		wrongButton.innerHTML = 'Incorrect';
		buttonContainer.appendChild(wrongButton);

		wrongButton.addEventListener("click", function(e) {
			e.preventDefault();
			ui.newQuestion();
		});

		rightButton.addEventListener("click", function(e) {
			e.preventDefault();
			ui.newQuestion();
		});

	},

	newQuestion: function() {

		api.getRandomQa("1", function(response) {
			console.log("hi");
			if (response.success === true) {
				ui.renderQuestion(response.qaitem);
			} else {
				console.log("You have no questions.");
			}
		});

	},

	switchToNormal: function() {
		document.getElementById('registrationContainer').style.display = "none";
		document.getElementById('loggedInUserContainer').style.display = "block";
		document.getElementById('actionContainer').style.display = "block";
		
	},

	switchToLogin: function() {
		document.getElementById('registrationContainer').style.display = "block";
		document.getElementById('loggedInUserContainer').style.display = "none";
		document.getElementById('actionContainer').style.display = "none";
	},
};

window.addEventListener('load', function () {
	//check here
	if (user.isLoggedIn()){
		ui.switchToNormal();
		ui.newQuestion();
	}
	else
	{
		//register
		ui.switchToLogin();
	}
		
});
