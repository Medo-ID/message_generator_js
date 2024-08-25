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
const generateGreeting = (recipient, occasion) => {
    
    // Find the occasion object in the greetings array
    const occasionDta = greetings.find(item => item.occasion === occasion);
    if (!occasionDta) {
        return `Sorry, we don't have messages for the occasion: ${occasion}`;
    }

    // Get random message from the selected occasion
    const randomIndex = Math.floor(Math.random() * occasionDta.messages.length);
    const randomMessage = occasionDta.messages[randomIndex];

    // Replace placeholders with actual names
    return randomMessage.replace('[recipient]', recipient);
};

// Ask for recipient name
rl.question("What is the recipient's name: ", (recipient) => {
    // Ask for the occasion
    rl.question("What is the occasion (e.g., Birthday)? ", (occasion) => {
        const greeting = generateGreeting(recipient, occasion);
        console.log(`\n${greeting}`);

        // close the readline interface
        rl.close();
    });
});

