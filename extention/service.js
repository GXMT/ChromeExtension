// chrome.commands.onCommand.addListener((command) => {
//     if (command === 'inject_html') {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, { action: 'inject_html' });
//       });
//     }
//   });

let contextMenuItem = {
  "id":"Note",
  "title":"OpenNote",
  "contexts":["all"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "Note") {


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'inject_html' });
    
    
    });
  }})