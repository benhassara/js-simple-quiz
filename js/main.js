// add scripts
var randQuestions = shuffle(questions);
//set with func
var activeQuestions = [];


$(document).on('ready', function() {
  // console.log('sanity check!');
  selectQuestions(5);
  var elems = genQuestions(5);
  // var $btnSubmit = $('<button>').attr({'type': 'submit', 'class': 'btn btn-primary'});
  // var $btnDiv = $('<div>').addClass('text-center');

  // $btnDiv.css('margin-top', '15px');

  // $btnSubmit.html('Submit');
  // $btnSubmit.attr('id', 'btn-submit');
  // $btnSubmit.appendTo($btnDiv);


  for (var i = 0; i < elems.length; i++){
    $(elems[i]).appendTo($("#js-quiz"));
  }
  // $btnDiv.appendTo($("#js-quiz"));
  $('#js-quiz').append(addSubmit());

  $('#js-quiz').on('submit', function(e){
    e.preventDefault();
    var answersGiven = [];
    var wrngAns = [];
    var wrngQs = [];

    $('input:checked').each(function(){
      answersGiven.push(this.value);
    });

    for (var i = 0; i < answersGiven.length; i++){
      if (answersGiven[i] !== activeQuestions[i].ans)
        wrngAns.push(i);
    }

    wrngQs = wrngAns.map(function(n){return n+1;});

    $('<p>').html(scoreText(answersGiven.length, answersGiven.length - wrngAns.length)).appendTo($('.modal-body'));

    if (wrngAns.length > 0) {
      var $showWrong = $('<p>').html('Questions answered incorrectly: ' + wrngQs.join(", "));
      $showWrong.appendTo($('.modal-body'));
    }

    $("#ansModal").modal('show');

  });

});

function addSubmit(){
  var btn = $('<button>').attr({'type': 'submit', 'class': 'btn btn-primary', 'id': 'btn-submit'});
  var div = $("<div class='text-center'>").css('margin-top', '15px');

  btn.html('Submit');
  div.append(btn);

  return div;
}

function scoreText(total, numRight){
  var output = "You answered " + numRight + " of " + total + " questions correctly. ";
  output += "A score of " + ((numRight / total) * 100).toFixed(2) + "%.";

  return output;
}

function parseChoices(num, choices) {
  //choices is an array of just for multiple choice
  //return choices parsed into collection of radio buttons
  //labeled and wrapped in div
  var shuffledChoices = shuffle(choices);
  var radios = [];

  for (var i = 0; i < shuffledChoices.length; i++) {
    var label = $('<label>')[0];
    var input = $('<input>').attr({type: 'radio', name: "q" + num, 'value': shuffledChoices[i]})[0];
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
