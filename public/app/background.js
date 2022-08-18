let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

//  chrome.runtime.onMessage.addListener((msg,sender,response)=>{
//     if(msg.type ="captureSelected"){
//         chrome.tabs .captureVisibleTab(null,{},function(dataUrl){

//         })
//     }
//  })

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'captureSelected') {
        chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
    }
    return true;
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
      case 'popupInit':
          response(tabStorage[msg.tabId]);
          break;
        case 'capture':
            // chrome.tabs.captureVisibleTab(null, {}, function (image) {
            //     // You can add that image HTML5 canvas, or Element.
            //   //   var string =window.OCRAD(image)
            //   //  alert(string)
            //   alert("react")
            //   });
              response(captureScreen(msg))
              break;
        // case 'captureSelected':
        //     response(captureSelected(msg))
        //     break;
      default:
          response('unknown request');
          break;
  }
});


 const captureScreen = async(msg) => {
  //   chrome.tabs.captureVisibleTab(null, {}, function (image) {
//     // You can add that image HTML5 canvas, or Element.
//   //   var string =window.OCRAD(image)
//   //  alert(string)
//   alert("react")
//   });
chrome.desktopCapture.chooseDesktopMedia([  
   
    "tab"
], msg.tab, (streamId) => {
    //check whether the user canceled the request or not
    if (streamId && streamId.length) {
        console.log(streamId,streamId.length)
    }
})

  return "v";
}


const captureSelected = (msg) =>{
    chrome.tabs.captureVisibleTab(null, {}, function(dataUri) {
        var img = new Image();
    img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            var context = canvas.getContext('2d');
            // Assuming px,py as starting coordinates and hx,hy be the width and the height of the image to be extracted
            context.drawImage(img, px, py, hx, hy, 0, 0, WIDTH, HEIGHT);
            var croppedUri = canvas.toDataURL('image/png');
            // You could deal with croppedUri as cropped image src.
        };
        img.src = dataUri;
    });
}
