var TBCStart;
var wSizeStart;
var hSizeStart;
var topStart;
var leftStart;
var backgroundOpacityStart;
var textColorStart;
var textSizeStart;
var checkForOpen = false;
var element;
var eldiv;
var realeldiv;
var textbox;
var isDragging = false;
var initialX = 0;
var initialY = 0;

chrome.storage.sync.get(['counter']).then((result)=>{
  var c = result.counter
  setTimeout(()=>{
      if (typeof(c)== "undefined"){
          chrome.storage.sync.set({'counter':'1'})
          chrome.storage.sync.set({'TBC':'#ffffff'})
          chrome.storage.sync.set({'wSize':'300px'})
          chrome.storage.sync.set({'hSize':'150px'})
          chrome.storage.sync.set({'top':'300px'})
          chrome.storage.sync.set({'left':'300px'})
          chrome.storage.sync.set({'backgroundOpacity':'0'})
          chrome.storage.sync.set({'textColor':'#000000'})
          chrome.storage.sync.set({'textSize':'20px'})
          alert("Setting complete")   
      }
  },500)
  setTimeout(()=>{chrome.storage.sync.get('TBC').then((result)=>{
    TBCStart = result.TBC;
  })
  chrome.storage.sync.get('textColor').then((result)=>{
    textColorStart = result.textColor;
  })
  chrome.storage.sync.get('backgroundOpacity').then((result)=>{
    backgroundOpacityStart = result.backgroundOpacity;
  })
  chrome.storage.sync.get('textSize').then((result)=>{
    textSizeStart = result.textSize;
  })
  chrome.storage.sync.get('wSize').then((result)=>{
    wSizeStart = result.wSize
  })
  chrome.storage.sync.get('hSize').then((result)=>{
    hSizeStart = result.hSize
  })
  chrome.storage.sync.get('top').then((result)=>{
    topStart = result.top
  })
  chrome.storage.sync.get('left').then((result)=>{
    leftStart = result.left
  })},600)
})
chrome.storage.sync.get('TBC').then((result)=>{
TBCStart = result.TBC
})
chrome.storage.sync.get('textColor').then((result)=>{
textColorStart = result.textColor
})
chrome.storage.sync.get('backgroundOpacity').then((result)=>{
backgroundOpacityStart = result.backgroundOpacity
})
chrome.storage.sync.get('textSize').then((result)=>{
textSizeStart = result.textSize;
})
chrome.storage.sync.get('wSize').then((result)=>{
wSizeStart = result.wSize
})
chrome.storage.sync.get('hSize').then((result)=>{
hSizeStart = result.hSize
})
chrome.storage.sync.get('top').then((result)=>{
topStart = result.top
})
chrome.storage.sync.get('left').then((result)=>{
leftStart = result.left
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'inject_html' && !checkForOpen) {
    checkForOpen = true;
    element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = topStart;
    element.style.left = leftStart;
    element.style.zIndex = '9999';

    // Inject the HTML code into the element
    element.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <div id = "upperDiv" style="resize: both; overflow: auto; width: ${wSizeStart}; height: ${hSizeStart}; margin: 5px; min-width: 345px; min-height: 141px">
          <div class="resizeable" id ="downDiv" style="background-color: rgba(0,0,0,0); overflow: auto; width: 97%; height: 97%; ">
              <textarea autofocus id="textarea" style="background-color: rgba(0,0,0,0); resize: none; border: none; width: 97%; height: 96%; font-size: 20px;" placeholder="Take a note..."></textarea>
          </div>
        </div>
      <div style="margin: 5px;">
          <button id="save-button-yky" class="btn btn-outline-dark">Save</button>
          <button id="cancel-button-yky" class="btn btn-outline-dark">Cancel</button>
          <button id="view-button-yky" class="btn btn-outline-dark">View</button>
      </div>
    `;

    // Apply CSS reset to the element
    element.style.fontSize = 'inherit';
    element.style.fontFamily = 'inherit';
    element.style.fontWeight = 'inherit';

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        element.style.left = event.clientX - initialX + 'px';
        element.style.top = event.clientY - initialY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    // Append the element to the body
    document.body.appendChild(element);

    eldiv = document.getElementById('downDiv');
    realeldiv = document.getElementById('upperDiv');

    eldiv.addEventListener('mousedown', (event) => {
        isDragging = true;
        initialX = event.clientX - parseInt(element.style.left, 10);
        initialY = event.clientY - parseInt(element.style.top, 10);
    });

    const cb = document.getElementById('cancel-button-yky');
    cb.addEventListener('click', () => {
      closingThing()
      element.remove();
      checkForOpen = false;
      
    });
    const sb = document.getElementById('save-button-yky');
    sb.addEventListener('click', () => {
      var value = document.getElementById('textarea').value;
      document.getElementById('textarea').value = "";
      chrome.storage.sync.set({ 'mytext': value }, () => {
        alert('saved');
      });
    });
    const vb = document.getElementById('view-button-yky');
    vb.addEventListener('click', () => {
      chrome.storage.sync.get(['mytext']).then((result) => {
        document.getElementById('textarea').value = result.mytext;
      });
    });
    const textbox = document.getElementById('textarea')
    textbox.style.backgroundColor='rgba('+TBCStart+')'

  } else if (message.action === 'inject_html' && element !== null && checkForOpen) {
    closingThing()
    element.remove();
    checkForOpen = false;

  }
});



document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'y'&& !checkForOpen) {
    checkForOpen = true;
    element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = topStart;
    element.style.left = leftStart;
    element.style.zIndex = '9999';

    // Inject the HTML code into the element
    element.innerHTML = `
        <div id = "upperDiv" style="resize: both; overflow: auto; width: ${wSizeStart}; height: ${hSizeStart}; margin: 5px; min-width: 345px; min-height: 141px">
          <div class="resizeable" id ="downDiv" style="background-color: rgba(0,0,0,0); overflow: auto; width: 97%; height: 97%; ">
              <textarea autofocus id="textarea" style="background-color: rgba(0,0,0,0); resize: none; border: none; width: 97%; height: 96%; font-size: 20px;" placeholder="Take a note..."></textarea>
          </div>
        </div>
      <div style="margin: 5px;">
          <button id="save-button-yky" class="btn btn-outline-dark">Save</button>
          <button id="cancel-button-yky" class="btn btn-outline-dark">Cancel</button>
          <button id="view-button-yky" class="btn btn-outline-dark">View</button>
      </div>
    `;


    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        element.style.left = event.clientX - initialX + 'px';
        element.style.top = event.clientY - initialY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    // Append the element to the body
    document.body.appendChild(element);

    eldiv = document.getElementById('downDiv');
    realeldiv = document.getElementById('upperDiv');

    eldiv.addEventListener('mousedown', (event) => {
        isDragging = true;
        initialX = event.clientX - parseInt(element.style.left, 10);
        initialY = event.clientY - parseInt(element.style.top, 10);
    });

    const cb = document.getElementById('cancel-button-yky');
    cb.addEventListener('click', () => {
      closingThing();
      element.remove();
      checkForOpen = false;
      
    });
    const sb = document.getElementById('save-button-yky');
    sb.addEventListener('click', () => {
      var value = document.getElementById('textarea').value;
      document.getElementById('textarea').value = "";
      chrome.storage.sync.set({ 'mytext': value }, () => {
        alert('saved');
      });
    });
    const vb = document.getElementById('view-button-yky');
    vb.addEventListener('click', () => {
      chrome.storage.sync.get(['mytext']).then((result) => {
        document.getElementById('textarea').value = result.mytext;
      });
    });
    textbox = document.getElementById('textarea');
    textbox.style.backgroundColor=hexToRgbA(TBCStart,backgroundOpacityStart)
    textbox.style.color=textColorStart;
    textbox.style.fontSize=textSizeStart;
  } else if (element !== null && event.ctrlKey && event.key === 'y') {
    closingThing();
    element.remove();
    checkForOpen = false;
  } 
});

function closingThing(){
  topStart = element.style.top
  leftStart = element.style.left
  wSizeStart = realeldiv.style.width
  hSizeStart = realeldiv.style.height
  chrome.storage.sync.set({'top':element.style.top})
  chrome.storage.sync.set({'left':element.style.left})
  chrome.storage.sync.set({'wSize':realeldiv.style.width})
  chrome.storage.sync.set({'hSize':realeldiv.style.height})
  chrome.storage.sync.set({'TBC':TBCStart})
  chrome.storage.sync.set({'backgroundOpacity':backgroundOpacityStart})
  chrome.storage.sync.set({'textColor':textColorStart})
  chrome.storage.sync.set({'textSize':textSizeStart})
}
chrome.runtime.onMessage.addListener((request)=>{
  if(request.action=='opacityChange' && element != null){
    backgroundOpacityStart = request.data;
    textbox.style.backgroundColor=hexToRgbA(TBCStart,request.data);
  } 

})
chrome.runtime.onMessage.addListener((request)=>{
  if(request.action=='fontSizeChange' && element != null){
    textSizeStart = `${request.data}px`;
    textbox.style.fontSize = `${request.data}px`;
  } 
})
chrome.runtime.onMessage.addListener((request)=>{
  if(request.action=='TBC' && element !=null){
    TBCStart = request.data;
    textbox.style.backgroundColor=hexToRgbA(request.data,backgroundOpacityStart);  
  } 
})

chrome.runtime.onMessage.addListener((request)=>{

  if(request.action=='textColor' && element !=null){
    textColorStart = request.data;
    textbox.style.color = request.data;
  } 
})



function hexToRgbA(hex,opacity){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${opacity})`;
  }
  throw new Error('Bad Hex');
}
/*  returned value: (String)
rgba(251,175,255,1)
*/