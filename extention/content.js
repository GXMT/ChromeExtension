// var checkForOpen = false
// var element

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'inject_html' && checkForOpen == false) {
        
//         checkForOpen = true;
//         element = document.createElement('div');
//         element.style.position = 'fixed';
//         element.style.top = '150px';
//         element.style.left = '150px';
//         element.style.zIndex = '9999';

//         // Inject the HTML code into the element
//         element.innerHTML = `
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
//         <div style="resize:both; width: 300px; height: 150px; margin: 5px;">
//             <textarea autofocus style="opacity:0.5; border: none; width:100%; height: 100%; font-size: 20px;" id="note-textarea" placeholder="Take a note..."></textarea>
//         </div>
//         <div style="margin: 5px;">
//             <button id="save-button-yky" class="btn btn-outline-dark">Save</button>
//             <button id="cancel-button-yky" class="btn btn-outline-dark">Cancel</button>
//             <button id="view-button-yky" class="btn btn-outline-dark">View</button>
//         </div>
//         `;

//         // Apply CSS reset to the element

//         element.style.fontSize = 'inherit';
//         element.style.fontFamily = 'inherit';
//         element.style.fontWeight = 'inherit';

//         // Add event listeners to make the element draggable
//         let isDragging = false;
//         let initialX = 0;
//         let initialY = 0;

//         element.addEventListener('mousedown', (event) => {
//         isDragging = true;
//         initialX = event.clientX - parseInt(element.style.left, 10);
//         initialY = event.clientY - parseInt(element.style.top, 10);
//         });

//         document.addEventListener('mousemove', (event) => {
//         if (isDragging) {
//             element.style.left = event.clientX - initialX + 'px';
//             element.style.top = event.clientY - initialY + 'px';
//         }
//         });

//         document.addEventListener('mouseup', () => {
//         isDragging = false;
//         });

//         // Append the element to the body
//         document.body.appendChild(element);

//         const cb = document.getElementById('cancel-button-yky');
//         cb.addEventListener('click',()=>{
//             element.remove();
//             checkForOpen = false;
//         })
//         const sb = document.getElementById('save-button-yky');
//         sb.addEventListener('click',()=>{
//             var value = document.getElementById('note-textarea').value;
//             document.getElementById('note-textarea').value = "";
//             chrome.storage.sync.set({'mytext':value},()=>{alert('saved')});
//         })
//         const vb = document.getElementById('view-button-yky');
//         vb.addEventListener('click',()=>{
//             chrome.storage.sync.get(['mytext']).then((result)=>{
//                 document.getElementById('note-textarea').value = result.mytext;
//             })
//         })

//     }else if (element !== null) {
//         element.remove();
//         checkForOpen = false;
//       }
//   });

var checkForOpen = false;
var element;
var isDragging = false;
var initialX = 0;
var initialY = 0;
var isResizing = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'inject_html' && !checkForOpen) {
    checkForOpen = true;
    element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.top = '150px';
    element.style.left = '150px';
    element.style.zIndex = '9999';

    // Inject the HTML code into the element
    element.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <div class="resizeable" style="resize: both; overflow: auto; width: 300px; height: 150px; margin: 5px;">
          <textarea autofocus style="opacity: 0.5; resize: none; border: none; width: 97%; height: 95%; font-size: 20px;" id="note-textarea" placeholder="Take a note..."></textarea>
      </div>
      <div style="margin: 5px;">
          <button id="save-button-yky" class="btn btn-outline-dark">Save</button>
          <button id="cancel-button-yky" class="btn btn-outline-dark">Cancel</button>
          <button id="view-button-yky" class="btn btn-outline-dark">View</button>
          <button id="resize-button-yky" class="btn btn-outline-dark">Resize</button>
      </div>
    `;

    // Apply CSS reset to the element
    element.style.fontSize = 'inherit';
    element.style.fontFamily = 'inherit';
    element.style.fontWeight = 'inherit';


    // Add event listeners to make the element draggable
    element.addEventListener('mousedown', (event) => {
      if (event.target !== document.querySelector('.resize-handle') && !isResizing) {
        isDragging = true;
        initialX = event.clientX - parseInt(element.style.left, 10);
        initialY = event.clientY - parseInt(element.style.top, 10);
      }
    });

    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        element.style.left = event.clientX - initialX + 'px';
        element.style.top = event.clientY - initialY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Add event listener to the resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.right = '0';
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '10px';
    resizeHandle.style.cursor = 'nwse-resize';
    element.appendChild(resizeHandle);

    // Add event listener to the resize button
    const resizeButton = element.querySelector('#resize-button-yky');
    resizeButton.addEventListener('click', () => {
      isResizing = !isResizing;
      resizeButton.classList.toggle('active');
    });

    // Append the element to the body
    document.body.appendChild(element);

    const cb = document.getElementById('cancel-button-yky');
    cb.addEventListener('click', () => {
      element.remove();
      checkForOpen = false;
    });
    const sb = document.getElementById('save-button-yky');
    sb.addEventListener('click', () => {
      var value = document.getElementById('note-textarea').value;
      document.getElementById('note-textarea').value = "";
      chrome.storage.sync.set({ 'mytext': value }, () => {
        alert('saved');
      });
    });
    const vb = document.getElementById('view-button-yky');
    vb.addEventListener('click', () => {
      chrome.storage.sync.get(['mytext']).then((result) => {
        document.getElementById('note-textarea').value = result.mytext;
      });
    });
  } else if (element !== null) {
    element.remove();
    checkForOpen = false;
  }
});
