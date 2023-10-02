const fs = require('fs');
const path = require('path');
const { parseComponent } = require('vue-template-compiler');

// Function to extract text from a Vue file
function extractTextFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');  //Change encoding here
  const { template } = parseComponent(fileContent);

  const extractedText = [];

  if (template && template.content) {
    const textMatches = template.content.match(/(?<=>)([^<]*)(?=<)/g); //Change regular expression here

    if (textMatches) {
      textMatches.forEach((match) => {
        const text = match.trim();
        extractedText.push(text);
      });
    }
  }

  return extractedText;
}


// Function to recursively find Vue files in a directory
function findVueFilesInDirectory(directory) {
  const vueFiles = [];
  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.join(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      vueFiles.push(...findVueFilesInDirectory(itemPath));
    } else if (item.endsWith('.vue')) {
      vueFiles.push(itemPath);
    }
  });

  return vueFiles;
}

// Main function to extract text from Vue files in a project directory
function extractTextFromProject(rootDirectory) {
  const vueFiles = findVueFilesInDirectory(rootDirectory);
  const extractedText = [];

  vueFiles.forEach((vueFilePath) => {
    const text = extractTextFromFile(vueFilePath);
    extractedText.push(...text);
  });

  return extractedText;
}

// Specify the root directory of your project here
const rootDirectory = '/path/to/root/here';  // Define your project root path here

// Run the extraction
const extractedText = extractTextFromProject(rootDirectory);

// Save the extracted text to a JSON file, you can change output format here
const outputPath = path.join(__dirname, 'extracted-text.json');
fs.writeFileSync(outputPath, JSON.stringify(extractedText, null, 2), 'utf8');

console.log(`Text extraction completed. Extracted text saved to ${outputPath}`);
