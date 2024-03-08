#!/usr/bin/env node

// Behold! The digital incarnation of our quacktastic sage, Sir Quacks-a-Lot.
const sirQuacksALot = `
           \\
            \\
             \\            _
              \\         _(_)_                          wWWWw   _
      @@@@       \\    (_)@(_)   vVVVv     _     @@@@  (___) _(_)_
     @@()@@ wWWWw  \\    (_)\     (___)   _(_)_  @@()@@   Y  (_)@(_)
      @@@@  (___)   \\     Y       Y    (_)@(_)  @@@@   \|/   (_)
       /      Y       \\   \|/     \|/    /(_)    \|      |/      |
    \ |     \ |/       |\\  |// \\ |//  \|/       |/    \|      \|/
jgs \\|//   \\|///  \\\|//\\\|/// \|/// \\\|//  \\\|//  \\\|// \\\|// 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`;

// The Enchanted Pond of DuckDuckGo - where all queries are answered.
const enchantedPondURL = "https://api.duckduckgo.com/";

/**
 * Interprets the mystical runes passed by the seeker (a.k.a. CLI arguments).
 * Enlightens the seeker with usage instructions if they're bewildered.
 * @returns {string} The seeker's question, whispered to the winds.
 */
function decipherRunes() {
  const runes = process.argv.slice(2);
  if (runes.length === 0 || runes.includes("-h") || runes.includes("--help")) {
    console.log(`By the power of the ancient quack, you must summon with purpose:
      \nquacksay 'Reveal the secret of the universe!'`);
    process.exit(1);
  }
  return runes.join(" ");
}

/**
 * Conjures a web of magic to consult the Oracle Duck at the Enchanted Pond.
 * @param {string} quest The seeker's burning question.
 * @returns {Promise<string>} The Oracle Duck's cryptic response, wrapped in mystery and JSON.
 */
async function invokeOracleDuck(quest) {
  try {
    const spellResponse = await fetch(`${enchantedPondURL}/?q=${encodeURIComponent(quest)}&format=json`);
    if (!spellResponse.ok) throw new Error(`The pond is murky today with the code of ${spellResponse.status}. Patience, seeker.`);
    const prophecy = await spellResponse.json();
    return prophecy.AbstractText || "The Duck, in its infinite wisdom, responds only with silence. Perhaps rephrase thy question.";
  } catch (incantationError) {
    console.error(`A pox! The spell failed: ${incantationError}`);
    process.exit(1);
  }
}

/**
 * Engraves the Oracle Duck's wisdom within a sacred ASCII box for the seeker.
 * @param {string} wisdom The words of the Oracle Duck, not to be taken lightly.
 */
function bestowWisdom(wisdom) {
  const scrollWidth = process.stdout.columns || 80;
  console.log(`Behold, the Oracle Duck decrees:\n${sirQuacksALot}\n${wisdom.padStart(scrollWidth / 2)}`);
}

/**
 * Embarks upon the noble quest for knowledge, alongside the seeker.
 */
async function embarkOnNobleQuest() {
  const query = decipherRunes();
  const duckDecree = await invokeOracleDuck(query);
  bestowWisdom(duckDecree);
}

// Onward, to adventure!
embarkOnNobleQuest();
