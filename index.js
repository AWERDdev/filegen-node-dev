#!/usr/bin/env node

// Variables
const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');

// File content

// Node.js file content
const codenode = `
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin, stdout } = require("process");
const rl = readline.createInterface({input: stdin, output: stdout});
`;


// Command line codes
const commands = ['npm init -y'];

// Functions
function runcommands(callback) {
    function executecommands(index) {
        if (index >= commands.length) {
            return callback();
        }
        exec(commands[index], (err, stdout, stderr) => {
            if (err) {
                console.error("Failed running command: " + commands[index] + " Error: " + err);
                return;
            }
            console.log(`Output: ${stdout}`);
            executecommands(index + 1);
        });
    }
    executecommands(0);
}

function createDirectories(dirs, callback) {
    let index = 0;

    function createDir() {
        if (index >= dirs.length) {
            return callback();
        }
        fs.mkdir(dirs[index], { recursive: true }, (err) => {
            if (err) {
                console.error("Failed creating directory: " + dirs[index] + " Error: " + err);
                return;
            }
            console.log("Directory created: " + dirs[index]);
            index++;
            createDir();
        });
    }
    createDir();
}

function genfilenode() {
    // Create JavaScript files
    const nodefiles = [
        { path: path.join(process.cwd(), "js", "index.js"), content: "// main js file" },
        { path: path.join(process.cwd(), "js", "server.js"), content: "// server js file\n" + codenode },
        { path: path.join(process.cwd(), "js", "test.js"), content: "// test js file" },
    ];
    nodefiles.forEach(file => {
        fs.writeFile(file.path, file.content, (err) => {
            if (err) {
                console.error("Failed creating the node/js files: " + err);
                return;
            }
            console.log("Node files created successfully");
        });
    });
}


// Execute functions
createDirectories([path.join(process.cwd(), "js"), path.join(process.cwd(), "styles")], () => {
    runcommands(() => {
        genfilenode();
    });
});
