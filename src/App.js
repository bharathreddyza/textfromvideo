    /*global chrome*/

import { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createWorker } from 'tesseract.js';
function App() {
  const [traffic,setTraffic] = useState({})

 const onClick= async()=>{
      let changeColor = document.getElementById("changeColor");

          chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
            const activeTabId =tabs[0].id
            chrome.scripting.executeScript(
              {
                target:{tabId:activeTabId},
                function:() =>alert("react"),
              }
            )
          })
          let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
          });
          function setPageBackgroundColor() {
                  chrome.storage.sync.get("color", ({ color }) => {
                    document.body.style.backgroundColor = color;
                  });
                }
                chrome.storage.sync.get("color", ({ color }) => {
                  changeColor.style.backgroundColor = color;
                });
        

 }

 const capture = async()=>{
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // const tab =  chrome.tabs.query({ active: true, currentWindow: true },([tab])=>{
  //   return tab;
  //  });

  chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
    const tab =tabs[0]
    // chrome.scripting.executeScript(
    //   {
    //     target:{tabId:activeTabId},
    //     function:() =>alert("react"),
    //   }
    // )

  chrome.runtime.sendMessage({type:'capture',tab:tab},(response=>{
    console.log(response,tab)
  }))

  })


}
 
   
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React swndjn
        </a>
      </header>
      <h1>de</h1> */}
      <div>
        <h1>hello how you doin</h1>
        <button onClick={()=>capture()} id="changeColor" style={{"height": "30px",
  "width": "30px",
  "outline": "none",
  "margin": "10px",
  "border": "none",
  "border-radius": "2px"}}>click me </button>
      </div>
    </div>
  );
}

export default App;
