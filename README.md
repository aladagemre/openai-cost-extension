# OpenAI Cost Estimator Chrome Extension

## Overview

The OpenAI Cost Estimator is a Chrome extension that allows users to quickly estimate the cost of OpenAI Assistants API usage based on the number of input and output tokens listed in threads page. It adds a context menu item that calculates and displays the estimated cost for selected text containing token information (assuming GPT-4o is used).

![OpenAI Cost Estimator Screenshot](images/screenshot.png)

## Features

- Right-click context menu integration
- Automatic extraction of input and output token counts from selected text
- Real-time cost calculation based on current OpenAI pricing
- Temporary display of cost estimate directly on the webpage
- Automatic removal of cost estimate after 5 seconds

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Select text containing token information in the format "X in, Y out" (e.g., "1772785 in, 76890 out").
2. Right-click the selected text and choose "Estimate Cost" from the context menu.
3. The estimated cost will appear next to the selected text for 5 seconds.

## Configuration

The current cost per token is calculated for GPT-4o model.

## Files

- `manifest.json`: Extension configuration file
- `background.js`: Main script for the extension's functionality
- `popup.html`: (Optional) Popup UI for the extension
- `images/`: Directory containing extension icons
    - `screenshot.png`: Screenshot demonstrating the extension in action

## Permissions

This extension requires the following permissions:
- `contextMenus`: To add the "Estimate Cost" option to the right-click menu
- `scripting`: To insert the cost estimate into the webpage
- `activeTab`: To access the current tab's content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This extension provides an estimate based on the current OpenAI pricing. Always refer to the official OpenAI pricing page for the most up-to-date and accurate pricing information.
