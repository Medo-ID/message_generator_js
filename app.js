// Import greetings data
import { greetings } from "./greetings.js";

// Import createRequire from 'module' to use CommonJS require
import { createRequire } from 'module';

// Create a require function
const require = createRequire(import.meta.url);

// Import the readline module using the require function
const readline = require('readline');

// Create an interface for reading input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Generate a personalized greeting function
const generateGreeting = (name, recipient, occasion) => {
    // Get random introduction
    const introduction = greetings.introduction[Math.floor(Math.random() * greetings.introduction.length)];
    
    // Get random message from the selected occasion
    const occasionMessage = greetings.personalizedContent[occasion];
    if (!occasionMessage) {
        return `Sorry, we don't have messages for the occasion: ${occasion}`;
    }
    const personalMessage = occasionMessage[Math.floor(Math.random() * occasionMessage.length)];

    // Get random closing remark
    const closing = greetings.closingRemark[Math.floor(Math.random() * greetings.closingRemark.length)]

    // Replace placeholders with actual names
    return `${introduction.replace('[recipient]', recipient).replace('[user]', name)} ${personalMessage.replace('[recipient]', recipient)}\n${closing.replace('[recipient]', recipient)}`;
};

// Ask for user input and generate a personalized greeting
rl.question("What's your name? ", (name) => {
    rl.question("What is the recipient's name: ", (recipient) => {
        rl.question(
            "What is the occasion? choose one. T:\n[Birthday, Anniversary, Graduation, New Job, Wedding, New Baby, Retirement, Get Well, Promotion, Thank You]: ", 
            (occasion) => {
                const greeting = generateGreeting(name, recipient, occasion);
                console.log(`\n${greeting}`);

                // close the readline interface
                rl.close();
            }
        );
    });
});

