#!/usr/bin/env node

const Web3 = require("web3");
const readline = require("readline");

const web3 = new Web3(`${process.argv[2]}`);
console.log(`Establishing connection to ${process.argv[2]}...`);

web3.eth
  .getBlock("latest")
  .catch((err) => {
    console.log(`Connection could not be established. ${err.message}`);
    process.exit(0);
  })
  .finally(() => {
    console.log(`Connected to ${process.argv[2]}`);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", (line) => {
      if (line === "quit") rl.close();
      try {
        var result = eval(line);
        if (result != null) {
          console.log(result);
        }
      } catch (ex) {
        console.log("Error during execution of script.");
        console.log(ex);
      }

      rl.prompt();
    }).on("close", function () {
      process.exit(0);
    });
  });
