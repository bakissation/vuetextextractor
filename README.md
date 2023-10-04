### Vue Text Extractor

**Version:** 1.0.0

---

### Table of Contents

- [Vue Text Extractor](#vue-text-extractor)
- [Table of Contents](#table-of-contents)
- [1. Introduction](#1-introduction)
- [2. Usage](#2-usage)
  - [Running the Script](#running-the-script)
  - [Output](#output)
- [3. Command-Line Options](#3-command-line-options)
- [4. Installation](#4-installation)
- [5.  Customization](#5--customization)
- [6.  License](#6--license)
- [7.  Contributions](#7--contributions)

---

### 1. Introduction

Vue Text Extractor is a command-line utility for extracting text content from Vue.js files in a project directory. It is designed to help developers extract translatable text and perform other text-related tasks within Vue.js projects.

I personally made it intially because I was too lazy to do a 5 minutes job manually, now I keep expanding on it for now reason at all...

---

### 2. Usage

To use Vue Text Extractor, follow these steps:

#### Running the Script

1. Open your terminal or command prompt.

2. Navigate to the directory where the `extractor.js` script is located.

3. Run the script with the following command, replacing `[directory]` with the path to your Vue.js project root directory:

   ```
   node extractor.js --directory [directory]
   ```

   For example:

   ```
   node extractor.js --directory /path/to/your/vue/project
   ```

#### Output

- The extracted text will be saved to a JSON file named `extracted-text.json` in the same directory as the `extractor.js` script.
---

### 3. Command-Line Options

Vue Text Extractor supports the following command-line options:

- `--directory (-d)`: Specify the project root directory where Vue files should be searched for. This option is required.

- `--help`: Display help and usage information.

---

### 4. Installation

To install Vue Text Extractor, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/bakissation/vuetextextractor.git
   ```

2. Navigate to the project directory:

   ```
   cd vuetextextractor
   ```

3. Install dependencies using npm:

   ```
   npm install
   ```
---

### 5.  Customization

You can further customize the script to match the structure of your Vue templates if needed. Specifically, you can modify the regular expression pattern used for text extraction in the extractTextFromFile function to better suit your templates:

  

~~~
      const textMatches = template.content.match(/(?<=>)([^<]*)(?=<)/g);
~~~

  

Feel free to adjust the regular expression pattern to accurately capture text content within your Vue templates.

---

### 6.  License

This script is provided under the MIT License. Feel free to modify and use it as needed in your projects.

---

### 7.  Contributions

If you encounter issues or have feedback, please feel free to create an issue in the repository. I welcome contributions and improvements to this script.