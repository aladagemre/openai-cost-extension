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

    // Extract numbers from the selected text
    const tokenMatches = selectedText.match(/\d+/g);
    if (tokenMatches && tokenMatches.length >= 2) {
      const [inputTokens, outputTokens] = tokenMatches.map(Number);
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
    }
  }
});

// Function to show the cost in an alert box on the page
function showCost(cost, inputTokens, outputTokens) {
  alert(`Estimated cost: $${cost.toFixed(5)}\nInput tokens: ${inputTokens}\nOutput tokens: ${outputTokens}`);
}