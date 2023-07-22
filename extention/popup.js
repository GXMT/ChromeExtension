var slider1 = document.getElementById("opacityRange");
var slider2 = document.getElementById("fontSizeRange");
var output1 = document.getElementById("demo");
var output2 = document.getElementById("demo2");
var colorPallete1 = document.getElementById("color-picker1");
var colorPallete2 = document.getElementById("color-picker2");



 // Display the default slider value
chrome.storage.sync.get('backgroundOpacity').then((result)=>{
    slider1.value = result.backgroundOpacity;
    output1.innerHTML = slider1.value;
})
chrome.storage.sync.get('textSize').then((result)=>{
    slider2.value = result.textSize.replace('px','');
    output2.innerHTML = slider2.value;
})
chrome.storage.sync.get('textColor').then((result)=>{
    console.log(result.textColor);
    colorPallete2.value = result.textColor;
})
chrome.storage.sync.get('TBC').then((result)=>{
    colorPallete1.value = result.TBC;
})
// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function() {
  output1.innerHTML = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(tabs[0].id, { action: 'opacityChange', data: this.value });
    });
}
slider2.oninput = function() {
    output2.innerHTML = this.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          chrome.tabs.sendMessage(tabs[0].id, { action: 'fontSizeChange', data: this.value });
      });
  }
colorPallete1.addEventListener('input', function(event) {
    const selectedColor = event.target.value;
    console.log(selectedColor);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(tabs[0].id, { action: 'TBC', data: event.target.value });
    });
});
colorPallete2.addEventListener('input', function(event) {
    const selectedColor = event.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(tabs[0].id, { action: 'textColor', data: event.target.value });
    });
});

const rb = document.getElementById('reset-button');
rb.addEventListener('click',()=>{
    chrome.storage.sync.clear();
})