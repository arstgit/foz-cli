#!/usr/bin/env node

let dupR = require("dup-r");
let join = require("path").join;

let helpMsg = `
Usage: 

  foz package example
  foz backend example
  foz c example
`;

let tplName = process.argv[2];

if (!tplName) {
  console.log(helpMsg);
}

let source = join(__dirname, "../pure", tplName);

let name = process.argv[3];
let dest = join(process.cwd(), name);

dupR(source, dest);

console.log(`done! Next, plase cd to ${name} directory`);
