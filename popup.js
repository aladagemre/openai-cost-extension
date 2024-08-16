chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "calculatedCost") {
    document.getElementById("costDisplay").textContent = `Estimated cost: $${message.cost.toFixed(5)}`;
  }
});
