// Cuando haces clic en el icono de la extensión, ejecutamos lectura.js en la pestaña actual.
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['lectura.js']
  });
});
