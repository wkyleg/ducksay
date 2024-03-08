#!/usr/bin/env node

const USAGE_STRING = `
Usage: ducksay <query>
Displays a duck saying the answer to the query using the DuckDuckGo Instant Answers API.

Options:
  -h, --help    Display this help message and exit.

Example:
  ducksay who is Satoshi Nakamoto

`;

const DUCKDUCKGO_API_URL = "https://api.duckduckgo.com/";

const duckImage = `            \\
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

/**
 * Parses input from CLI and makes sure it is a valid string.
 * If "-h" or "--help" is provided, it displays usage information.
 * @returns {string | null} The input from the command line or null if help is displayed.
 */
function handleAndValidateInput() {
  const args = process.argv.slice(2);
  // Make sure there is at least one argument and it is not the help flag
  if (
    process.argv.length <= 2 ||
    args.includes("-h") ||
    args.includes("--help")
  ) {
    console.warn(USAGE_STRING);
    process.exit(1);
  }
  // Return arguments concatenated into a single string
  return process.argv.slice(2).join(" ");
}

/**
 * @param {string} question The question to ask the DuckDuckGo Instant Anwers API
 * @returns {string} The result from the DuckDuckGo Instant Anwers API
 */
async function getInstantAnswersResponse(question) {
  try {
    const response = await fetch(
      `${DUCKDUCKGO_API_URL}/?q=${encodeURIComponent(question)}&format=json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return (
      data.AbstractText ||
      `I don't know about that, can you reword your question?`
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("There was an error parsing the response.");
    } else if (error.message.startsWith("HTTP error")) {
      console.error(
        "There was an error with the DuckDuckGo API service. You may be rate limited. Please try again later."
      );
    } else {
      console.error(
        "Failed to load data, your network connection may be unstable."
      );
    }
    console.error(`Error: "${error.message}"`);
    process.exit(1);
  }
}

/**
 * Prints the text in readable format for user
 * @param {string} text The text to be printed in the box
 * @returns {void} Prints the text in a box to the console
 */
function printBox(text) {
  const terminalWidth = process.stdout.columns || 80; // Fallback to 80
  const padding = 4; // Adjust for box borders and padding
  const maxWidth = terminalWidth - padding;

  const words = text.split(" ");
  let lines = [];
  let currentLine = "";

  // Make sure words aren't cut off when printing
  words.forEach((word) => {
    if ((currentLine + word).length < maxWidth) {
      currentLine += `${word} `;
    } else {
      lines.push(currentLine.trim());
      currentLine = `${word} `;
    }
  });

  // Push the last line if it has content
  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  const horizontalBorder = "─".repeat(maxWidth + 2);
  console.log(`┌${horizontalBorder}┐`);
  lines.forEach((line) => {
    // Adjust line padding based on the dynamic width
    console.log(`│ ${line.padEnd(maxWidth, " ")} │`);
  });
  console.log(`└${horizontalBorder}┘`);
}

/**
 * Main function to run the program
 * @returns {void} Prints the response from the DuckDuckGo Instant Anwers API
 * and the duck image to the console
 */
async function main() {
  try {
    const input = handleAndValidateInput();
    const response = await getInstantAnswersResponse(input);
    printBox(response);
    console.log(duckImage);
  } catch (error) {
    console.error(`Error: "${error}"`);
    process.exit(1);
  }
}

main();
