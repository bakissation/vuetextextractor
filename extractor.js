// Import required Node.js modules
const fs = require('fs').promises; // File system operations with promises
const path = require('path'); // Utilities for working with file paths
const { parseComponent } = require('vue-template-compiler'); // Vue.js template parsing
const yargs = require('yargs'); // Command-line argument parsing

// Define command-line options using yargs
const argv = yargs
  .option('directory', {
    alias: 'd',
    describe: 'Specify the project root directory',
    type: 'string',
    demandOption: true, // Makes it a required argument
  })
  .help()
  .argv;

// Function to extract text from a Vue file
async function extractTextFromFile(filePath) {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf8');
    // Parse the Vue component to extract the template section
    const { template } = parseComponent(fileContent);

    const extractedText = [];

    if (template && template.content) {
      // Use regular expressions to extract text between HTML tags
      const textMatches = template.content.match(/(?<=>)([^<]*)(?=<)/g);

      if (textMatches) {
        textMatches.forEach((match) => {
          const text = match.trim();
          extractedText.push(text);
        });
      }
    }

    return extractedText;
  } catch (error) {
    console.error(`Error reading file: ${filePath}\n${error}`);
    throw error;
  }
}

// Function to recursively find Vue files in a directory
async function findVueFilesInDirectory(directory, filter) {
  try {
    // Read the items (files and subdirectories) in the given directory
    const items = await fs.readdir(directory);
    const vueFiles = [];

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = await fs.stat(itemPath);

      if (stat.isDirectory()) {
        // If the item is a directory, recursively search for Vue files
        vueFiles.push(...await findVueFilesInDirectory(itemPath, filter));
      } else if (item.endsWith(filter)) {
        // If the item is a Vue file (based on the file extension), add it to the list
        vueFiles.push(itemPath);
      }
    }

    return vueFiles;
  } catch (error) {
    console.error(`Error reading directory: ${directory}\n${error}`);
    throw error;
  }
}

// Function to extract text from a project with progress reporting
async function extractTextFromProject(rootDirectory, filter) {
  try {
    // Find all Vue files in the project directory
    const vueFiles = await findVueFilesInDirectory(rootDirectory, filter);
    const extractedText = [];

    for (let i = 0; i < vueFiles.length; i++) {
      const vueFilePath = vueFiles[i];
      // Extract text from each Vue file
      const text = await extractTextFromFile(vueFilePath);
      extractedText.push(...text);

      // Report progress
      console.log(`Progress: ${(i + 1)}/${vueFiles.length} files processed`);
    }

    return extractedText;
  } catch (error) {
    console.error(`Error extracting text from project: ${rootDirectory}\n${error}`);
    throw error;
  }
}

// Main function to run the text extraction process
async function main() {
  try {
    // Get the project directory from command-line arguments
    const rootDirectory = argv.directory;
    // Define the output path for the JSON file
    const outputPath = path.join(__dirname, 'extracted-text.json');

    // Extract text from the project
    const extractedText = await extractTextFromProject(rootDirectory, '.vue');

    if (extractedText.length > 0) {
      // Write the extracted text to a JSON file
      await fs.writeFile(outputPath, JSON.stringify(extractedText, null, 2), 'utf8');
      console.log(`Text extraction completed. Extracted text saved to ${outputPath}`);
    } else {
      console.log('No text extracted. Output file not created.');
    }
  } catch (error) {
    console.error(`Error during text extraction: ${error}`);
  }
}

// Call the main function to start the script
main();
