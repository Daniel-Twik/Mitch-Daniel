

// init variables:

// *THIS will be the selector for the outer div that contains target input box (input box's parent element)
// Will host the microphone icon
let div_selector = "#shopify-section-header > div.header-container > div.header-wrapper > header > div.header__inner > div.header__search > form > div";
let target_div = document.querySelectorAll(div_selector)[0];



// init functions:

function init_cdn() {
	// create and add icon cdn to document head
	let icon_link = document.createElement("LINK");
	icon_link.setAttribute("rel", "stylesheet");
	icon_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
	document.head.appendChild(icon_link);
}


function find_target_input(div_target) {
	return div_target.getElementsByTagName("input")[0];
}


function create_mic() {
	let btn = document.createElement("BUTTON");
	btn.setAttribute("CLASS", "dictate_btn");
	btn.style.zIndex = 100;
	btn.style.borderRadius = '50%';
	btn.style.backgroundColor = 'none';
	btn.style.border = '0px';
	btn.style.position = "fixed";
	btn.style.left = calc_left(target_div).toString() + "px";
	btn.style.top = calc_top(target_div).toString() + "px";
	btn.setAttribute("ID", "tw-mic");
	let microphone = document.createElement("i");
	microphone.classList.add("fa");
	microphone.classList.add("fa-microphone");
	microphone.style.fontSize = '24px';
	microphone.style.color = 'red';
	btn.appendChild(microphone);
	return btn;
}


function calc_left(div_target) {
	let right = div_target.getBoundingClientRect().right;
	return right - 100;
}


function calc_top(div_target) {
	let top = div_target.getBoundingClientRect().top;
	return top + 5;
}



// execute script:

init_cdn();

// find the target search input from within the target div (selector for the script)
let target_input = find_target_input(target_div);

let mic = create_mic();

target_div.appendChild(mic);

mic.addEventListener('click', function() {
    recognition.start();
	let tw_mic = document.getElementsByClassName("fa-microphone")[0];
	tw_mic.style.color = '#8b0000'
	
    container.addEventListener("click", function(event){
        event.returnValue = false;
    });
});




// speech-to-text
var message = "";
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;';

var recognition = new SpeechRecognition();
var SpeechRecognitionGrammarList = new SpeechGrammarList();
SpeechRecognitionGrammarList.addFromString(grammar, 1);

recognition.grammars = SpeechRecognitionGrammarList;
recognition.lang = 'en-US';
recognition.interimResults = false;


recognition.onresult = function(event) {
	let tw_mic = document.getElementsByClassName("fa-microphone")[0];
	tw_mic.style.color = 'red';

	var last = event.results.length -1;
	var command = event.results[last][0].transcript;
	message = command;
	target_input.value = message;
	console.log(message);






// WORKS BUT user must press space bar after text is entered to regain search functionality
	// target_input.click();
	// var e = new KeyboardEvent('keydown',{'keyCode':32,'which':32});
	// target_input.dispatchEvent(e);

	
//SOLUTION?: site.com/search?q=hats
// works on most shopify sites but doesnt on a few






	// reactivate form submission capability
	for (let el of target_div.children) {
		if (el['type'] == 'submit') {
			el.addEventListener("click", function(event){
				target_div.parentElement.submit();
			});
		}
	}
	target_input.addEventListener("keypress", function(event){
		if (event.keyCode == 13) {
			console.log("YES");
			target_input.parentElement.submit();
		}
	});
}


recognition.onspeechend = function() {
	recognition.stop();
}


recognition.onerror = function(event) {
	message = 'Error occurred in recognition: ' + event.error;
}
