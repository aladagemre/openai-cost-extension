// Function to find an element based on tag name and inner text
function findElementByText(tagName, textContent) {
    const elements = document.getElementsByTagName(tagName);
    for (let element of elements) {
      if (element.textContent.trim() === textContent) {
        return element;
      }
    }
    return null;
  }
  
  // Find the "Tokens" label element
  const tokensLabel = findElementByText('div', 'Tokens');
  
  if (tokensLabel) {
    // Navigate to the parent element that contains the tokens
    const tokensParent = tokensLabel.closest('div');
  
    if (tokensParent) {
      // Find the next sibling that contains the actual token values
      const tokensElement = tokensParent.querySelector('span.thread-detail-field-value');
  
      if (tokensElement) {
        // Extract the token counts from the text
        const tokenText = tokensElement.textContent.trim();
        const [totalTokens, inputTokens, outputTokens] = tokenText.match(/\d+/g).map(Number);
  
        // Send message to background script to calculate the cost
        chrome.runtime.sendMessage({
          type: "calculateCost",
          inputTokens: inputTokens,
          outputTokens: outputTokens
        }, (response) => {
          alert(`Estimated cost: $${response.cost.toFixed(5)}`);
        });
      }
    }
  }
  