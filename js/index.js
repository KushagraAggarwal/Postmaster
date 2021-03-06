console.log('Attached');

//Utility functions
//1. Utility function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild; 
}

//Initialize parameter count
let addedParamCount = 0;

//Hide the parameter box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if the user clicks on the params box, hide the JSON box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

//If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//if + button is clicked provide more params
let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">        
                        <label for="url" class="col-sm-2 col-form-label">Parameter${addedParamCount+2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount+2}" placeholder="Enter parameter ${addedParamCount+2} key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount+2}" placeholder="Enter parameter ${addedParamCount+2} value">
                        </div>
                        <button id="addParam" class="btn btn-primary deleteParam">-</button>
                  </div>`;

                  //Convert an element string to DOM node
                  let paramElement = getElementFromString(string);
                  params.appendChild(paramElement)
                  //Add an event listner to remove parameter on clicking - button
                  let deleteParam = document.getElementsByClassName('deleteParam');
                  for(item of deleteParam){
                      item.addEventListener('click',(e)=>{
                          e.target.parentElement.remove();
                      })
                  }
                  addedParamCount++;
});

//Submit button functionality
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responseJsonText').value = "Please Wait. Fetching Response....";

    //Fetch all values user have entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    //log all the value in console for debugging
    console.log(url,requestType,contentType);

    //If user has used params as parameters instead of JSON, collect all parameters
    if(contentType=='params'){
        data={};
        for(i=0;i<addedParamCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
            let key = document.getElementById('parameterKey'+(i+1)).value
            let value = document.getElementById('parameterValue'+(i+1)).value
            data[key]=value;
            }
            data = JSON.stringify(data);
        }
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }


    //if the request is get, invoke fetch api to create a post request
    if(requestType=='GET'){
        fetch(url, {
            method:'GET',
        }).then(response=>response.text())
        .then((text)=>{
           document.getElementById('responseJsonText').value = text;
        });
    }
    else{
        fetch(url, {
            method:'POST',
            body : data,
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response=>response.text())
        .then((text)=>{
           document.getElementById('responseJsonText').value = text;
        });
    }
});

