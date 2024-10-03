# JSON Sort and Compare

A Visual Studio Code extension to sort and then compare JSON files.

## Features

- Sort JSON objects by their keys.
- Compare two JSON files and highlight the differences.

## Requirements

- Visual Studio Code version 1.93.0 or higher.

## Usage

1. Run the "Sort and Compare JSON Files" command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. The extension will prompt you for the first and second file
3. The extension will sort the JSON objects and display the differences.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/json-sort-and-compare.git
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

## Development

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
