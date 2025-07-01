import { inngest } from "./client";

// Function to retrieve the ID
export const getClientId = () => inngest.config.id;

// Log the ID to the console
console.log("Your Inngest client ID is:", getClientId());