// add scripts
var randQuestions = shuffle(questions);
//set with func
var activeQuestions = [];


$(document).on('ready', function() {
  console.log('sanity check!');
});

function parsePrompt(num, prompt) {
  //take in question obj's prompt, return label for input
  var text = num + ". " + prompt;
  return $.parseHTML("<label>" + text + "</label>")[0];
}

function createQuestion(qObj) {
  //create HTML for a question from a question obj
  // var container =
}

function selectQuestions(num) {
  activeQuestions = randQuestions.slice(0, num);
}

function shuffle(array) {
  //shuffle array elements, return shuffled version of the array
  var workArray = array.slice(0); //shallow copy
  var shuffled = [];
  while (workArray.length > 0) {
    if (workArray.length === 1) {
      shuffled.push(workArray[0]);
      break;
    }
    else {
      var i = Math.floor(Math.random() * workArray.length);
      shuffled.push(workArray.splice(i, 1)[0]);
    }
  }
  return shuffled;
}
