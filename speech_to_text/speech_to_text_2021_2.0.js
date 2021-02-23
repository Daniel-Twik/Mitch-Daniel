
// init variables:

// *THIS selector must be updated for each client
let search_input_selector = "#navSearchInput";

let search_input_original_top = document.querySelectorAll(search_input_selector)[0].getBoundingClientRect().top;



// init functions:

function init_cdn() {
	// create and add icon cdn to document head
	let icon_link = document.createElement("LINK");
	icon_link.setAttribute("rel", "stylesheet");
	icon_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
	document.head.appendChild(icon_link);
}


function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function find_target_input_coordinates(input_selector) {
	let target_input = document.querySelectorAll(input_selector)[0];
	let left = target_input.getBoundingClientRect().left;
	let top = target_input.getBoundingClientRect().top;
	return [left, top];
}


function create_mic(left, top) {
	let btn = document.createElement("BUTTON");
	btn.setAttribute("CLASS", "dictate_btn");
	btn.style.zIndex = 100;
	btn.style.borderRadius = '50%';
	btn.style.backgroundColor = 'white';
	btn.style.border = '0px';
	btn.style.position = "fixed";
	btn.style.left = String(left - 70) + "px";
	btn.style.top = String(top - 15) + "px";
	btn.style.width = "60px";
	btn.style.height = "60px";
	btn.style.boxShadow = '1px 1px 9px 1px #000000';
	btn.setAttribute("ID", "tw-mic");
	let microphone = document.createElement("i");
	microphone.classList.add("fa");
	microphone.classList.add("fa-microphone");
	microphone.style.fontSize = '24px';
	microphone.style.color = 'red';
	btn.appendChild(microphone);
	return btn;
}



// execute script:

init_cdn();

let input_left = find_target_input_coordinates(search_input_selector)[0];
let input_top = find_target_input_coordinates(search_input_selector)[1];

let mic = create_mic(input_left, input_top);

document.body.appendChild(mic);

// adjust mic position for absolute vs fixed headers:
window.onscroll = function(){
	if (document.querySelectorAll(search_input_selector)[0].getBoundingClientRect().top != search_input_original_top) {
		mic.style.position = 'absolute';
	}
};

mic.addEventListener('click', function() {
	mic.style.display = "none";

	let textBox = document.createElement("DIV");

	textBox.innerHTML = `
		<h5 style="text-align: center; color: red;">Speak to enter your search query:</h5>
		<hr>
		<p id="tw-search-text" style="margin-left: 5px;"></p>
	`;

	textBox.setAttribute("CLASS", "dictate_textBox");
	textBox.style.zIndex = 100;
	textBox.style.backgroundColor = 'white';
	textBox.style.position = "fixed";
	textBox.style.left = String(input_left - 250) + "px";
	textBox.style.top = String(input_top - 30) + "px";
	textBox.style.width = "240px";
	textBox.style.height = "120px";
	textBox.style.boxShadow = '1px 1px 9px 1px #000000';

	document.body.appendChild(textBox);

	recognition.start();

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
	var last = event.results.length -1;
	var command = event.results[last][0].transcript;
	message = command;
	document.getElementById("tw-search-text").innerText = message;
	window.open("/search?q=" + message, "_self");
}


recognition.onspeechend = function() {
	recognition.stop();
}


recognition.onerror = function(event) {
	message = 'Error occurred in recognition: ' + event.error;
}
