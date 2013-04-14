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

		sourceButton = document.getElementById("source");
		sourceButton.addEventListener("click", function(e) {
			ui.loadURL(qaitem.url);
		});	

		removeButton = document.getElementById("remove");
		removeButton.addEventListener("click", function(e) {
			api.forget(qaitem.id, function() {});
			ui.newQuestion();
		});	

	},

	renderNoQuestions: function() {
		document.getElementById('noQuestionsContainer').style.display = "block";
		document.getElementById('registrationContainer').style.display = "none";
		document.getElementById('loggedInUserContainer').style.display = "none";
		document.getElementById('loadingContainer').style.display = "none";
		document.getElementById('actionContainer').style.display = "none";
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
			ui.nextQuestion();
		});

		rightButton.addEventListener("click", function(e) {
			e.preventDefault();
			ui.nextQuestion();
		});

	},

	nextQuestion: function() {
		ui.getNewQuestion(function(response){
			if (response.success === true) {
				ui.renderQuestion(response.qaitem);
			} else {
				ui.renderNoQuestions();
			}
		});
	},

	getNewQuestion: function(callback) {
		api.getRandomQa(user.currentUser(), function(response) {
			callback(response);
		});
	},

	switchToNormal: function() {
		ui.getNewQuestion(function(response){
			if (response.success === true) {
				document.getElementById('registrationContainer').style.display = "none";
				document.getElementById('loggedInUserContainer').style.display = "block";
				document.getElementById('loadingContainer').style.display = "none";
				document.getElementById('actionContainer').style.display = "block";
				ui.renderQuestion(response.qaitem)
			} else {
				ui.renderNoQuestions();
			}
		});
	},

	switchToLogin: function() {
		document.getElementById('loadingContainer').style.display = "none";
		document.getElementById('registrationContainer').style.display = "block";
		document.getElementById('loggedInUserContainer').style.display = "none";
		document.getElementById('actionContainer').style.display = "none";
	},

	loadURL: function(url) {
    	navigator.app.loadUrl(url, { openExternal:true });
    	return false;
	} 
};

window.addEventListener('load', function () {

	//check here
	if (user.isLoggedIn()){
		ui.switchToNormal();
	}
	else
	{
		//register
		ui.switchToLogin();
		user.addListenersToForms();
	}
		
});
