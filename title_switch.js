// This script switches the title text in the browser tab back and forth every 1.1 seconds
// between the original text and a newly specified message.
// **You can specify the new title by updating the text value of "newHeaderText_str" ("init variables" section)
// and can also specify the time interval by updating the integer (value in milliseconds)
// at the end of "setInterval" ("run script" section).
// #####################################################################################
// declare variables
// #####################################################################################
let docHeadTitle_element;
let originalHeaderText_str;
let newHeaderText_str;
// #####################################################################################
// init variables
// #####################################################################################
docHeadTitle_element = document.getElementsByTagName("TITLE")[0];
originalHeaderText_str = docHeadTitle_element.innerText;
newHeaderText_str = "New Messages!";
// #####################################################################################
// define functions
// #####################################################################################
function alternateBetweenHeadTexts() {
  let currentHeadText = document.getElementsByTagName("TITLE")[0].innerText;
  switch (currentHeadText) {
    case originalHeaderText_str:
      docHeadTitle_element.innerText = newHeaderText_str;
      break;
    default:
      docHeadTitle_element.innerText = originalHeaderText_str;
  }
}
// #####################################################################################
// run script
// #####################################################################################
setInterval(function () {
  alternateBetweenHeadTexts();
}, 1100);
