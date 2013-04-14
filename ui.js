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

		//Replace the element to clear old listeners
		var old_element = document.getElementById("source");
		var sourceButton = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(sourceButton, old_element);
		sourceButton.addEventListener("click", function(e) {
			ui.loadURL(qaitem.url);
		});	

		//Replace the element to clear old listeners
		var old_element = document.getElementById("remove");
		var removeButton = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(removeButton, old_element);
		removeButton.addEventListener("click", function(e) {
			api.forget(qaitem.id, function() { 
				console.log("Forgot "+qaitem.id);
				api.resetQaListCache(function() {
					ui.goToNextQuestion();
				});
			});
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
			ui.goToNextQuestion();
		});

		rightButton.addEventListener("click", function(e) {
			e.preventDefault();
			ui.goToNextQuestion();
		});

	},

	renderNoQuestions: function() {
		document.getElementById('noQuestionsContainer').style.display = "block";
		document.getElementById('registrationContainer').style.display = "none";
		document.getElementById('loggedInUserContainer').style.display = "none";
		document.getElementById('loadingContainer').style.display = "none";
		document.getElementById('actionContainer').style.display = "none";
	},

	goToNextQuestion: function() {
		ui.getNewQuestion(function(response){
			if (response.success === true) {
				ui.renderQuestion(response.qaitem);
			} else {
				ui.renderNoQuestions();
			}
		});
	},

	getNewQuestion: function(callback) {
		api.resetQaListCache(function() {
			api.getRandomQa(user.currentUser(), function(response) {
				callback(response);
			});
		});
	},

	switchToNormal: function() {
		ui.getNewQuestion(function(response){
			if (response.success === true) {
				document.getElementById('noQuestionsContainer').style.display = "none";
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
		document.getElementById('noQuestionsContainer').style.display = "none";
		document.getElementById('loadingContainer').style.display = "none";
		document.getElementById('registrationContainer').style.display = "block";
		document.getElementById('loggedInUserContainer').style.display = "none";
		document.getElementById('actionContainer').style.display = "none";
	},

	loadURL: function(url) {
		try { // If we're in phone gap, launch in the browser
	    	navigator.app.loadUrl(url, { openExternal:true });
	    	return false;
	    } catch (e) {
	    	window.open(url,'_blank');
	    }
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
