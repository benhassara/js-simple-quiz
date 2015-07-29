var questions = [
  {
    prompt: "Which of the following is a primitive data type?",
    choices: ["object", "logical operator", "number", "prototype"],
    ans: "number",
    explanation: "Write an explanation."
  },
  {
    prompt: "Conditional statements ___________",
    choices: [
      "control the flow of the program.",
      "are about the weather.",
      "repeat code.",
      "prevent hoisting."],
    ans: "control the flow of the program.",
    explanation: "Write an explanation."
  },
  {
    prompt: "A <code>switch</code> statement is a: ",
    choices: ["conditional structure", "looping strucuture",
              "logical operator", "string method"],
    ans: "conditional structure",
    explanation: "Write an explanation."
  },
  {
    prompt: "Which of the following is not a string method?",
    choices: ["<code>trim</code>", "<code>toUpperCase</code>", "<code>splice</code>", "<code>slice</code>"],
    ans: "<code>splice</code>",
    explanation: "The <code>splice</code> function is a method of arrays, not strings."
  },
  {
    prompt: "Variables declared inside of a function are:",
    choices: ["part of the function's local scope",
              "descendants of the function",
              "part of the global scope",
              "don't need to be declared with <code>var</code>"],
    ans: "part of the function's local scope",
    explanation: "Write an explanation."
  },
  {
    prompt: "You can avoid hoisting by:",
    choices: ["using the <code>var</code> keyword", "writing functions",
              "using ternary operators", "fishing"],
    ans: "using the <code>var</code> keyword",
    explanation: "Write an explanation."
  },
  {
    prompt: "What do you call the process of joining two strings?",
    choices: ["string concatenation", "string coercion",
              "string inception", "string conjunction"],
    ans: "string concatenation",
    explanation: "Write an explanation"
  },
  {
    prompt: "What does <code>'this is a string'.split()</code> return?",
    choices: ["<code>['this is a string']</code>",
              "<code>['t', 'h', 'i', 's', 'i', 's', 'a', 's', 't', 'r', 'i', 'n', 'g']</code>",
              "<code>['this', 'is', 'a', 'string']</code>",
              "<code>['this', ' ', 'is', ' ', 'a', ' ', 'string']</code>"],
    ans: "<code>['this is a string']</code>",
    explanation: "When you call <code>str.split</code> without the argument for the delimiter, it returns an array with a single element whose value is equal to <code>str</code>."
  },
  {
    prompt: "What value does a function return if it contains no <code>return</code> statement?",
    choices: ["<code>null</code>", "<code>undefined</code>", "it doesn't return anything", "<code>42</code>"],
    ans: "<code>undefined</code>",
    explanation: "A function will return <code>undefined</code> if you don't put a <code>return</code> statement in the function body."
  },
  {
    prompt: "What do you call a loop that runs forever?",
    choices: ['an infinite loop', 'a singularity', 'a jerk', 'Groundhog Day with Bill Murray'],
    ans: "an infinite loop",
    explanation: "http://media.giphy.com/media/G8xwi3ghEd02c/giphy.mp4"
  }
];
