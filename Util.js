var Util = (() => {

  const url = 'https://api.linkedin.com'
  const version = '202401';

  
  function parseJwt(token) {
      let body = token.split('.')[1];
      let decoded = Utilities.newBlob(Utilities.base64Decode(body)).getDataAsString();
      return JSON.parse(decoded);
  };

  function getToken(){
    var linkedinService = getService_();
    var token = linkedinService.getToken().id_token;  
    var jwt = parseJwt(token)
    return jwt;
  }

  function getAuthor(){
    return getToken().sub
  }

  function getAccessToken(){
    var linkedinService = getService_();
    return linkedinService.getAccessToken()
  }

  function uploadDocu(attachment) {  
    
    var payload = {
      "initializeUploadRequest": {
          "owner": "urn:li:person:"+getAuthor()
      }    
    }
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'headers': {
        'Authorization': `Bearer ${getAccessToken()}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': version
      }
    };
    const resp = UrlFetchApp.fetch(`${url}/rest/documents?action=initializeUpload`, options);
    Logger.log(resp);

    const json = JSON.parse(resp)
    const uploadUrl = json.value.uploadUrl;
    const mediaId = json.value.document;

    var optionsPut = {
      method : "put",
      payload : attachment.copyBlob(),
      headers:{
        'Authorization': `Bearer ${getAccessToken()}`,
        'Accept':'*/*',
        'LinkedIn-Version': version,
        'muteHttpExceptions':true, 
      }    
    };
    Logger.log(optionsPut)
    UrlFetchApp.fetch(uploadUrl, optionsPut).getContentText();    
    return  {
      "id": mediaId
    }
    
  }

  const publish = (body)=>{
    
    const doc = DocumentApp.getActiveDocument();
    const pdf = doc.getAs('application/pdf');
    
    const docuId = uploadDocu(pdf);
    
    var payload = {
      "author": "urn:li:person:"+getAuthor(),
      "commentary": body,
      "visibility": "PUBLIC",
      "distribution": {
        "feedDistribution": "MAIN_FEED",
        "targetEntities": [],
        "thirdPartyDistributionChannels": []
      },
      "lifecycleState": "PUBLISHED",
      "isReshareDisabledByAuthor": false,
      "content": {
        "media": {
            "title": DocumentApp.getActiveDocument().getName(),
            "id": docuId.id
        }
      }
    }
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'headers': {
        'Authorization': `Bearer ${getAccessToken()}`,
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': version
      }
    };
    Logger.log(options)  
    const resp = UrlFetchApp.fetch(`${url}/rest/posts`, options);
    Logger.log(resp)  
    return "Enviado"
  }

  return {
    publish
  };
  
})();