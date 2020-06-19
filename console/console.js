#!/usr/bin/env node

const Web3 = require("web3");
const readline = require("readline");

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:4444"));

var rl = null;

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.setPrompt("RSK > ");
rl.prompt();

rl.on("line", (line) => {
  if (line === "quit") rl.close();
  try {
    if (!web3.eth.net.isListening())
      console.log("Connection could not be established. Please try again.");
    else {
      var result = eval(line);
      if (result != null) {
        console.log(result);
      }
    }
  } catch (ex) {
    console.log("Error during execution of script.");
    console.log(ex);
  }

  rl.prompt();
}).on("close", function () {
  process.exit(0);
});
