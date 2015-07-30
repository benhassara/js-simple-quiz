
var randQuestions = shuffle(questions);
//set with func
var activeQuestions = [];


$(document).on('ready', function() {

  selectQuestions(5);
  var elems = genQuestions(5);

  for (var i = 0; i < elems.length; i++){
    $(elems[i]).appendTo($("#js-quiz"));
  }

  $('#js-quiz').append(addSubmit());

  $('#js-quiz').on('submit', function(e){
    e.preventDefault();
    var answersGiven = [];

    $('input:checked').each(function(){
      answersGiven.push(this.value);
    });

    populateModal(answersGiven, $('.modal-body'));

    $("#ansModal").modal('show');
  });

  $('#ansModal').on('hide.bs.modal', function(){location.reload();});

});

function populateModal(answers, modal){
  var wrngAns = [];
  var wrngQs = [];

  for (var i = 0; i < answers.length; i++){
    if (answers[i] !== activeQuestions[i].ans) {
      wrngAns.push(i);
    }
  }
  wrngQs = wrngAns.map(function(n){return n+1;});

  $('<p>').html(scoreText(answers.length, answers.length-wrngAns.length)).appendTo(modal);

  if (wrngAns.length > 0){
    var expls = showExpl(wrngAns);
    $(modal).append(showWrongs(wrngQs));
    for (var a = 0; a < expls[0].length; a++) {
      modal.append(expls[0][a]).append(expls[1][a]);
    }
  }
}

function showExpl(wrongAs){
  var fails = wrongAs.map(function(n){return activeQuestions[n];});
  var prompts = [];
  var expls = [];

  for (var i = 0; i < wrongAs.length; i++){
    prompts.push($(parsePrompt(wrongAs[i]+1, fails[i].prompt)));
    expls.push(parseExpl(fails[i]));
  }
  return [prompts, expls];
}

function showWrongs(wrongQs){
  var showWrong = $('<p>').html('Questions answered incorrectly: ' + wrongQs.join(", "));
  return showWrong;
}

function addSubmit(){
  var btn = $('<button>').attr({'type': 'submit', 'class': 'btn btn-primary', 'id': 'btn-submit'});
  var div = $("<div class='text-center'>").css({'margin-top': '15px', 'margin-bottom': '15px'});

  btn.html('Submit');
  div.append(btn);

  return div;
}

function scoreText(total, numRight){
  var output = "You answered " + numRight + " of " + total + " questions correctly. ";
  output += "A score of " + ((numRight / total) * 100).toFixed(2) + "%.";

  return output;
}

function parseExpl(question){
  //question is a question obj
  var div = $('<div class="expl">');
  var ans = $('<h5>').html('Answer: ' + question.ans).css('color', 'darkgreen');
  var expl = $('<p>').html(question.explanation);

  if (question.explanation.startsWith('http')) {
    var src = $('<source>').attr('src', question.explanation);
    expl = $('<video>').prop({'autoplay': true, 'loop': true});
    expl.attr({'width': '239', 'height': '191'}).append(src);
  }

  return div.append(ans).append(expl);
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
  return $.parseHTML("<div class='prompt'><p><strong>" + text + "</strong></p></div>")[0];
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
