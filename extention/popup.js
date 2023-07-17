const cb = document.getElementById('cancel-button');
cb.addEventListener('click',()=>{
    window.close();
})
const sb = document.getElementById('save-button');
sb.addEventListener('click',()=>{
    var value = document.getElementById('note-textarea').value;
    document.getElementById('note-textarea').value = "";
    chrome.storage.sync.set({'mytext':value},()=>{alert('saved')});
})
const vb = document.getElementById('view-button');
vb.addEventListener('click',()=>{
    chrome.storage.sync.get(['mytext']).then((result)=>{
        document.getElementById('note-textarea').value = result.mytext;
    })
})
const rb = document.getElementById('reset-button');
rb.addEventListener('click',()=>{
    chrome.storage.sync.clear();
})
// chrome.storage.sync.get(['counter']).then((result)=>{
//     var c = result.counter
//     setTimeout(()=>{
//         if (typeof(c)== "undefined"){
//             chrome.storage.sync.set({'counter':'1'})
//             chrome.storage.sync.set({'TBC':'0,0,0,0'})
//             chrome.storage.sync.set({'wSize':'300'})
//             chrome.storage.sync.set({'hSize':'150'})
//             chrome.storage.sync.set({'top':'150'})
//             chrome.storage.sync.set({'left':'150'})
//             alert(typeof(c))
//         }
        
//     },1000)
// })



const tb = document.getElementById('test-button');
tb.addEventListener('click',()=>{
    var num
    chrome.storage.sync.get(['counter']).then((result)=>{
        num = result.counter;
    })
    setTimeout(() => {
        var value = document.getElementById('note-textarea').value;
        chrome.storage.sync.set({["n"+num]:value});
        chrome.storage.sync.set({'counter': String(parseInt(num)+1)});
    }, 2000);
})
const lb = document.getElementById('list-button');
lb.addEventListener('click',()=>{
    chrome.tabs.create({url: "list.html"});
})