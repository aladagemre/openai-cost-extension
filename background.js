chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "estimateCost",
    title: "Estimate Cost",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "estimateCost") {
    const selectedText = info.selectionText;

    // Extract the relevant part using regex
    const match = selectedText.match(/(\d+)\s+in,\s+(\d+)\s+out/);
    if (match) {
      const [, inputTokens, outputTokens] = match.map(Number);
      const totalTokens = inputTokens + outputTokens;

      // Calculate the cost (example rate: $0.00002 per token)
      const costPerToken = 0.00002;
      const estimatedCost = totalTokens * costPerToken;

      // Send a message to the active tab to display the result
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showCost,
        args: [estimatedCost, inputTokens, outputTokens]
      });
    } else {
      // If the pattern is not found, show an error message
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showError
      });
    }
  }
});

// Function to show the cost in an alert box on the page
function showCost(cost, inputTokens, outputTokens) {
  alert(`Estimated cost: $${cost.toFixed(5)}\nInput tokens: ${inputTokens}\nOutput tokens: ${outputTokens}`);
}

// Function to show an error message
function showError() {
  alert("Could not find token information in the selected text. Please make sure to select text containing 'X in, Y out'.");
}