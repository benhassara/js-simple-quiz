// add scripts
var randQuestions = shuffle(questions);
//set with func
var activeQuestions = [];


$(document).on('ready', function() {
  console.log('sanity check!');
});

function parseChoices(num, choices) {
  //choices is an array of just for multiple choice
  //return choices parsed into collection of radio buttons
  //labeled and wrapped in div
  var shuffledChoices = shuffle(choices);
  var radios = [];

  for (var i = 0; i < shuffledChoices.length; i++) {
    var label = $('<label>')[0];
    var input = $('<input>').attr({type: 'radio', name: "q" + num})[0];
    var newDiv = $('<div>').addClass("radio")[0];

    $(input).appendTo(label);
    $("<span>" + shuffledChoices[i] + "</span>").appendTo(label);
    $(label).appendTo(newDiv);

    radios.push(newDiv);
  }

  return radios;
}

function parsePrompt(num, prompt) {
  //take in question obj's prompt, return div
  var text = num + ". " + prompt;
  return $.parseHTML("<div class='prompt'><p>" + text + "</p></div>")[0];
}

function genQuestions(num) {
  var qstns = [];
  selectQuestions(num);

  for (var i = 0; i < num; i++) {
    qstns.push(createQuestion(i+1, activeQuestions[i]));
  }

  return qstns;
}

function createQuestion(num, qObj) {
  //create HTML for a question from a question obj
  var container = $('<div>').addClass('question');
  var radios = parseChoices(num, qObj.choices);
  $(parsePrompt(num, qObj.prompt)).appendTo(container);

  for (var i = 0; i < qObj.choices.length; i++) {
    $(radios[i]).appendTo(container);
  }

  return container[0];
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
