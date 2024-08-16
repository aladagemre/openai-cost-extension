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
      // $5.00 / 1M input tokens
      const inputCost = inputTokens * 0.000005;
      // $15.00 / 1M output tokens
      const outputCost = outputTokens * 0.000015;
      const estimatedCost = inputCost + outputCost;


      // Send a message to the active tab to insert the cost
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: insertAndRemoveCost,
        args: [estimatedCost]
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

// Function to insert the cost into the previous div element and remove it after 5 seconds
function insertAndRemoveCost(cost) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let currentElement = range.startContainer;

    // Traverse up the DOM tree to find the nearest div
    while (currentElement && currentElement.nodeName !== 'DIV') {
      currentElement = currentElement.parentElement;
    }

    if (currentElement) {
      const costSpan = document.createElement('span');
      costSpan.textContent = ` ($${cost.toFixed(2)})`;
      costSpan.style.color = 'green';
      costSpan.style.fontWeight = 'bold';
      
      // Insert the cost span at the end of the div
      currentElement.appendChild(costSpan);

      // Remove the cost span after 5 seconds
      setTimeout(() => {
        costSpan.remove();
      }, 5000);
    }
    
    // Clear the selection
    selection.removeAllRanges();
  }
}

// Function to show an error message
function showError() {
  alert("Could not find token information in the selected text. Please make sure to select text containing 'X in, Y out'.");
}