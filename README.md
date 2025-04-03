# Duplication Plugin  

The **Duplication Plugin** is a Figma plugin designed to streamline the process of duplicating and customizing design elements. It allows users to create multiple copies of selected elements, manipulate text content dynamically using CSV data, and organize the duplicates efficiently within a section.  

## Features  

- **Dynamic Duplication**: Create multiple copies of selected elements with customizable spacing and layout.  
- **CSV Integration**: Import CSV files to dynamically update text content in duplicated elements.  
- **Text Selection**: Choose specific text layers to manipulate during duplication.  
- **User-Friendly UI**: Intuitive interface for configuring duplication settings.  

## Installation  

1. Clone or download this repository.  
2. Open Figma and navigate to the Plugins section.  
3. Click on "Development" > "Import Plugin from Manifest".  
4. Select the `manifest.json` file from the project directory.  

## Usage  

1. Select the element(s) you want to duplicate in your Figma file.  
2. Open the Duplication Plugin.  
3. Configure the following settings in the plugin UI:  
    - Number of copies to create.  
    - Text layers to manipulate.  
    - Upload a CSV file for dynamic text updates.
    - The Data headers in the csv **must** match the name of the text box.
4. Click **Submit** to generate the duplicates.  

## Development  

### Prerequisites  

- [Node.js](https://nodejs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  

### Setup  

1. Install dependencies:  
    ```bash  
    npm install  
    ```  
2. Build the project:  
    ```bash  
    npm run build  
    ```  
3. Watch for changes during development:  
    ```bash  
    npm run watch  
    ```  

### File Structure  

- `manifest.json`: Plugin configuration file.  
- `code.ts`: Main plugin logic written in TypeScript.  
- `ui.html`: User interface for the plugin.  
- `tsconfig.json`: TypeScript configuration.  
- `package.json`: Project metadata and scripts.  

## Contributing  

Contributions are welcome! Feel free to open issues or submit pull requests to improve the plugin.  