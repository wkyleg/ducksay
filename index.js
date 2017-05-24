#!/usr/bin/env node
"use strict";

const { Requester } = require("node-duckduckgo");
const requester = new Requester("ducksay");
const Box = require("cli-box");

// If no arguments are supplied, exit and display suggested use
if (process.argv.length <= 2) {
  console.log("Error! Usage: " + __filename +
    " <whatever you would like to ask the duck>");
  process.exit(-1);
}

// Create string for requester from command line arguments
let requestString = '';
for (let i = 2; i < process.argv.length; i++) {
  requestString += process.argv[i] + ' ';
}

// Submit request to DuckDuckGo Instant, then handle results
requester.request(requestString, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }

  // Assign "AbstractText" to answer. If empty/null assign to error message
  let answer = JSON.parse(body)["AbstractText"];
  if (answer === null || answer === '') {
    answer = "Sorry, don't know anything about that!"
  }

  // create small message box which will expand with size of response
  const messageBox = Box("2x2", {
    text: answer,
    stretch: true,
    autoEOL: true,
    vAlign: "top",
    hAlign: "left"
  });

  // Print response, then duck
  console.log(messageBox);
  console.log(duckImage);
});


// ANCI art of duck to print
const duckImage =
`
            \\
             \\
              \\
               \\             ▒▒▒▒▒
                \\         ▒▒▒▒▒░░▒▒
                 \\      ▓▒ ░░░░░░░▒
                     ▓▓▓▒▒▓▒▒▒▒░░░░▒▒
                       ▓▓▓▓▓▒▒▒░░░▒▒           ▒
                           ▓▒▒▒▒▒▒▒          ▓▓▒
                          ▒▒▒▒▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒░
                         ▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒▒▒░▒
                       ▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒
                       ▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                        ▓▒▒▒▒▒▒▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                           ▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
`;
