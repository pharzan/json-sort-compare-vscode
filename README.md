
 # JSON Sort and Compare

If you have two JSON files that should be identical but are hard to compare due to the unordered nature of JSON, this VSCode extension can help by sorting then comparing them making it easier to focus on real content differences.


This extension sorts JSON files before comparison to make it easier to spot the differences in JSON files.

## Features

- Sort JSON objects by their keys.
- Compare two JSON files and highlight the differences.

## Demo

Here’s a quick demo: two sample JSON files are compared using the extension, demonstrating that only one key-value pair differs. The comparison is then displayed in VSCode’s diff viewer, which can make it difficult to fully grasp the differences between unordered JSON files.

<p align="left">
    <img src="./images/screen-recording-fast.gif" alt="Logo" height="400">
</p>

## Requirements

- Visual Studio Code version 1.93.0 or higher.

## Usage

### Installation
You can install the vscode extension from [here](https://marketplace.visualstudio.com/items?itemName=farzan-tinati.json-sort-and-compare).


1. Run the "Sort and Compare JSON Files" command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. The extension will prompt you for the first and second file
3. The extension will sort the JSON objects and display the differences.

## Development

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/pharzan/json-sort-compare-vscode.git
    ```
2. Navigate to the project directory:
    ```sh
    cd json-sort-and-compare
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Compile the TypeScript code:
    ```sh
    npm run compile
    ```

### Running the Extension

1. Open the project in Visual Studio Code.
2. Press `F5` to open a new VS Code window with the extension loaded.

### Running Tests

1. Compile the TypeScript code:
    ```sh
    npm run compile
    ```
2. Run the tests:
    ```sh
    npm test
    ```

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
