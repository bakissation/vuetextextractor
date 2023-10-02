# Vue Text Extractor

Vue Text Extractor is a Node.js script that allows you to extract text content from Vue.js files in your project directory. This can be helpful for various purposes, such as preparing text for translation or reviewing the text used in your user interface.

I personally made it because I was too lazy to do a 5 min job manually, it took 2 hours and it's not even perfect...

## Prerequisites

Before using the script, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): JavaScript runtime environment.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/): Package managers usually included with Node.js.

## Usage

1. **Clone or Download:** Clone or download this repository to your local machine.

2. **Navigate to Directory:** Open a terminal and navigate to the directory where the script (`extractor.js`) is located.

3. **Configure Root Directory:** Modify the `rootDirectory` variable in `extractor.js` to specify the root directory of your Vue.js project:

4. **Run the Script:** Run the Script: Execute the script with the F5 button (I prefer easy executions lol)
   
This will initiate the extraction process, and the extracted text will be saved to a JSON file named extracted-text.json in the same directory as the script.


5. **Customization:**
You can further customize the script to match the structure of your Vue templates if needed. Specifically, you can modify the regular expression pattern used for text extraction in the extractTextFromFile function to better suit your templates:

~~~
const textMatches = template.content.match(/(?<=>)([^<]*)(?=<)/g);
~~~

Feel free to adjust the regular expression pattern to accurately capture text content within your Vue templates.

6. **License:**
This script is provided under the MIT License. Feel free to modify and use it as needed in your projects.

7. **Disclaimer**
This script is intended for extracting text content from Vue.js templates and does not include advanced localization or translation management features. If you require more comprehensive translation and localization tools, consider using dedicated libraries and services.
Support and Feedback

8. **Contributions:**
If you encounter issues or have feedback, please feel free to create an issue in the repository. We welcome contributions and improvements to this script.