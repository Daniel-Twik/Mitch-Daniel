
// init variables:

let search_icon_original_top;
let target;



// init functions:

function init_doc() {
	// create and add icon cdn to document head
	let icon_link = document.createElement("LINK");
	icon_link.setAttribute("rel", "stylesheet");
	icon_link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
	document.head.appendChild(icon_link);

	// init css for recording icon
	let css = document.createElement("STYLE");
	css.innerText = `
	  .loader-container {
		position: relative;
		height: 10px;
		width: 160px;
		margin: auto;
		margin-top: 15px;
	  }
	  
	  .loader-container > div {
		position: relative;
		display: inline-block;
		background: black;
		height: 100%;
		width: 10px;
		margin: 0;
		-webkit-animation: load 3s ease-in-out infinite;
		animation: load 3s ease-in-out infinite;
	  }
	  
	  .loader-container .rectangle-2 {
		-webkit-animation-delay: 0.1s;
		animation-delay: 0.1s;
	  }
	  
	  .loader-container .rectangle-3 {
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	  }
	  
	  .loader-container .rectangle-4 {
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	  }
	  
	  .loader-container .rectangle-5 {
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	  }
	  
	  .loader-container .rectangle-6 {
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	  }
	  
	  @-moz-keyframes load {
		0%,
		100% {
		  -moz-transform: scaleY(1);
		  background: black;
		}
		16.67% {
		  -moz-transform: scaleY(3);
		  background: black;
		}
		33.33% {
		  -moz-transform: scaleY(1);
		  background: black;
		}
		50% {
		  -moz-transform: scaleY(3);
		  background: black;
		}
		66.67% {
		  -moz-transform: scaleY(1);
		  background: black;
		}
		83.34% {
		  -moz-transform: scaleY(3);
		  background: black;
		}
	  } 
	  
	  @-webkit-keyframes load {
		0%,
		100% {
		  -webkit-transform: scaleY(1);
		  background: black;
		}
		16.67% {
		  -webkit-transform: scaleY(3);
		  background: black;
		}
		33.33% {
		  -webkit-transform: scaleY(1);
		  background: black;
		}
		50% {
		  -webkit-transform: scaleY(3);
		  background: black;
		}
		66.67% {
		  -webkit-transform: scaleY(1);
		  background: black;
		}
		83.34% {
		  -webkit-transform: scaleY(3);
		  background: black;
		}
	  } 
	  
	  @keyframes load {
		0%,
		100% {
		  transform: scaleY(1);
		  background: black;
		}
		16.67% {
		  transform: scaleY(3);
		  background: black;
		}
		33.33% {
		  transform: scaleY(1);
		  background: black;
		}
		50% {
		  transform: scaleY(3);
		  background: black;
		}
		66.67% {
		  transform: scaleY(1);
		  background: black;
		}
		83.34% {
		  transform: scaleY(3);
		  background: black;
		}
	  } 
	`;
	document.head.appendChild(css);

}


function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function find_search_box_potentials() {
	let all_els = document.querySelectorAll("*");
	let exclude_tags = {
		'HTML': 0,
		'HEAD': 0,
		'BODY': 0,
		'STYLE': 0,
		'SCRIPT': 0,
		'HEADER': 0,
		'A': 0,
		'MAIN': 0,
		'UL': 0,
		'LI': 0,		
		'P': 0,		
	};
	let potentials = [];
	let filtered_potentials = [];
	let filtered_2 = [];

	// filter out unwanted tag types
	for (let el of all_els) {
		if (el.innerHTML.includes("search")) {
			if (exclude_tags[el.tagName.toUpperCase()] != 0) {
				if (elementInViewport(el) == true) {
					if (el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0)
					potentials.push(el);
				}
			}
		}
	}

	// filter out parent items
	for (let pot in potentials) {
		pot = parseInt(pot);
		let valid = true;
		for (let i = pot + 1; i < potentials.length; i++) {
			if (potentials[pot].contains(potentials[i]) == true) {
				valid = false;
			}
		}
		if (valid == true) {
			filtered_potentials.push(potentials[pot]);
		}
	}

	// filter non text boxes
	for (let pot of filtered_potentials) {
		if (pot.tagName.toUpperCase() == "INPUT" || pot.tagName.toUpperCase() == "SVG" || pot.tagName.toUpperCase() == "IMG" || pot.tagName.toUpperCase() == "SPAN" || pot.tagName.toUpperCase() == "BUTTON" || pot.tagName.toUpperCase() == "DIV" || pot.tagName.toUpperCase() == "FORM") {
			filtered_2.push(pot);
		} else {
			for (let kid of pot.children) {
				if (kid.tagName.toUpperCase() == "INPUT" && kid.type == "text") {
					filtered_2.push(kid);
				}
			}
		}
	}

	console.log("[+] First filter: ");
	for (let f of filtered_2) {
		console.log(f);
	}
	return filtered_2;
}


function find_search_icon(searchBox_potentials) {
	let all_els = document.querySelectorAll("*");
	let search_icon_tags = {
		'SVG': 0,
		'SPAN': 0,
		'IMG': 0,
		'BUTTON': 0,	
	};

	let potentials = [];

	for (let el of all_els) {
		// filter for specified tags (that could be the search icon)
		if (search_icon_tags[el.tagName.toUpperCase()] == 0) {
			switch(el.tagName.toUpperCase()) {
				case 'SVG':
					if (el.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentNode.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentElement.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					}
					break;
				case 'IMG':
					if (el.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentNode.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentElement.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					}
					break;
				case 'BUTTON':
					if (el.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentNode.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentElement.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					}
					break;
				case 'SPAN':
					if (el.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentNode.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					} else if (el.parentElement.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					}
					break;
				default:
					if (el.innerHTML.toLowerCase().includes("search")) {
						potentials.push(el);
					}
			}
		}
	}
	console.log("[+] Second filter: ");
	for (let f of potentials) {
		console.log(f);
	}

	return potentials;

	// for (let sBp of searchBox_potentials) {
	// 	for (let kid of sBp.children) {
	// 		if (potentials.includes(kid) || potentials.includes(sBp)) {
	// 			if (kid.getBoundingClientRect().y >= 0) {
	// 				console.log("[+] Target found: " + kid);
	// 				return kid;
	// 			}
	// 		}
	// 	}
	// }
}


function match_icon_and_search(searches, icons) {
	for (let icon of icons) {
		if (searches.includes(icon)) {
			if (icon.offsetWidth > 0) {
				return icon;
			}
		} else {
			for (let search of searches) {
				if (search.parentElement.contains(icon) || search.parentNode.contains(icon)) {
					if (icon.offsetWidth > 0) {
						return icon;
					}
				}
			}
		}
	}
}


function elementInViewport(el) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;
  
	while(el.offsetParent) {
	  el = el.offsetParent;
	  top += el.offsetTop;
	  left += el.offsetLeft;
	}
  
	return (
	  top >= window.pageYOffset &&
	  left >= window.pageXOffset &&
	  (top + height) <= (window.pageYOffset + window.innerHeight) &&
	  (left + width) <= (window.pageXOffset + window.innerWidth)
	);
}


function find_target_input_coordinates(icon) {
	let left = icon.getBoundingClientRect().left;
	let top = icon.getBoundingClientRect().top;
	return [left, top];
}


function create_mic(left, top) {
	let btn = document.createElement("BUTTON");
	btn.setAttribute("CLASS", "dictate_btn");
	btn.style.zIndex = 1000;
	btn.style.borderRadius = '50%';
	btn.style.backgroundColor = 'white';
	btn.style.border = '0px';
	btn.style.position = "fixed";
	btn.style.left = String(left - 70) + "px";
	btn.style.top = String(top - 15) + "px";
	btn.style.width = "40px";
	btn.style.height = "40px";
	btn.style.boxShadow = '1px 1px 9px 1px #000000';
	btn.setAttribute("ID", "tw-mic");
	let microphone = document.createElement("i");
	microphone.classList.add("fa");
	microphone.classList.add("fa-microphone");
	microphone.style.fontSize = '24px';
	microphone.style.color = 'black';
	btn.appendChild(microphone);
	return btn;
}


function get_css_path(el){
	var names = [];
	while (el.parentNode){
	  if (el.id){
		names.unshift('#'+el.id);
		break;
	  }else{
		if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
		else{
		  for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
		  names.unshift(el.tagName+":nth-child("+c+")");
		}
		el=el.parentNode;
	  }
	}
	return names.join(" > ");
}



// execute script:

init_doc();

let search_potentials = find_search_box_potentials();

if (search_potentials.length == 1) {
	target = search_potentials[0];
} else {
	let icon_potentials = find_search_icon(search_potentials);
	target = match_icon_and_search(search_potentials, icon_potentials);
}


let input_left;
let input_top;
if (target) {
	// input found
	let target_path = get_css_path(target);
	console.log("[+] Twik target: " + target_path);
	search_icon_original_top = target.getBoundingClientRect().top;

	input_left = find_target_input_coordinates(target)[0];
	input_top = find_target_input_coordinates(target)[1];

} else {
	// not found - create button at bottom left of page
	console.log("[-] Twik could not find search target");
	console.log("[+] Creating custom screen placement...");

	input_left = 80;
	input_top = window.innerHeight - 150;
}


console.log("[+] Generating speech-to-text...");

let mic = create_mic(input_left, input_top);

document.body.appendChild(mic);

console.log("[+] Speech-to-text ready");

// adjust mic position for absolute vs fixed headers:
window.onscroll = function(){
	if (target.getBoundingClientRect().top != search_icon_original_top) {
		mic.style.position = 'absolute';
	}
};

mic.addEventListener('click', function() {
	mic.style.display = "none";

	let textBox = document.createElement("DIV");

	textBox.innerHTML = `
		<div class="loader-container">
			<div class="rectangle-1"></div>
			<div class="rectangle-2"></div>
			<div class="rectangle-3"></div>
			<div class="rectangle-4"></div>
			<div class="rectangle-5"></div>
			<div class="rectangle-6"></div>
			<div class="rectangle-5"></div>
			<div class="rectangle-4"></div>
			<div class="rectangle-3"></div>
			<div class="rectangle-2"></div>
			<div class="rectangle-1"></div> 
		</div>
		<p id="tw-search-text" style="text-align: center; margin-top: 30px;"></p>
	`;

	textBox.setAttribute("CLASS", "dictate_textBox");
	textBox.style.zIndex = 100;
	textBox.style.backgroundColor = 'white';
	textBox.style.position = "fixed";
	textBox.style.width = "240px";
	textBox.style.height = "120px";
	textBox.style.boxShadow = '1px 1px 9px 1px #000000';

	if (target) {
		textBox.style.left = String(input_left - 250) + "px";
		textBox.style.top = String(input_top - 30) + "px";
	} else {
		textBox.style.left = mic.style.left;
		textBox.style.top = mic.style.top;
	}

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
