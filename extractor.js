const fs = require('fs').promises; // Use fs.promises for asynchronous file operations
const path = require('path');
const { parseComponent } = require('vue-template-compiler');

// Function to extract text from a Vue file
async function extractTextFromFile(filePath) {
  try {
    // Read the file content asynchronously
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { template } = parseComponent(fileContent);

    const extractedText = [];

    if (template && template.content) {
      // Use regular expression to match and extract text from the template content
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
    return [];
  }
}

// Function to recursively find Vue files in a directory
async function findVueFilesInDirectory(directory) {
  try {
    // Read the directory contents asynchronously
    const items = await fs.readdir(directory);
    const vueFiles = [];

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = await fs.stat(itemPath);

      if (stat.isDirectory()) {
        // Recursively search for Vue files in subdirectories
        vueFiles.push(...await findVueFilesInDirectory(itemPath));
      } else if (item.endsWith('.vue')) {
        // Add Vue files to the list
        vueFiles.push(itemPath);
      }
    }

    return vueFiles;
  } catch (error) {
    console.error(`Error reading directory: ${directory}\n${error}`);
    return [];
  }
}

// Main function to extract text from Vue files in a project directory
async function extractTextFromProject(rootDirectory) {
  try {
    // Find all Vue files in the project directory and its subdirectories
    const vueFiles = await findVueFilesInDirectory(rootDirectory);
    const extractedText = [];

    for (const vueFilePath of vueFiles) {
      // Extract text from each Vue file and accumulate it
      const text = await extractTextFromFile(vueFilePath);
      extractedText.push(...text);
    }

    return extractedText;
  } catch (error) {
    console.error(`Error extracting text from project: ${rootDirectory}\n${error}`);
    return [];
  }
}

const rootDirectory = '/path/to/root/here'; // Define your vue project root path here
const outputPath = path.join(__dirname, 'extracted-text.json');

// Execute the text extraction process
(async () => {
  const extractedText = await extractTextFromProject(rootDirectory);

  try {
    // Write the extracted text to a JSON file
    await fs.writeFile(outputPath, JSON.stringify(extractedText, null, 2), 'utf8');
    console.log(`Text extraction completed. Extracted text saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error writing to file: ${outputPath}\n${error}`);
  }
})();
