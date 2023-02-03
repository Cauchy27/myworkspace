import authParams from "./AuthParams";

// ローカルストレージにログイン情報を保存
const setAuthInfo = (AuthInfo) => {
  console.log(AuthInfo);
  window.localStorage.setItem("authInfoKey", JSON.stringify(AuthInfo));
}

// ローカルストレージからログイン情報を取得
const getAuthInfo = () => {
    let item = window.localStorage.getItem("authInfoKey");
    if(item == "undefined"){
      item = null;
      deleteAuthInfo();
    }
    if(item != null){
      return JSON.parse(item);
    }
    else{
      return null;
    } 
}

// ローカルストレージから認証情報を削除
const deleteAuthInfo = () =>{
  window.localStorage.removeItem("authInfoKey");
}

// Googleのログイン画面に遷移
const requestGCPAuthCode = async() => {
  const params = {
    client_id: authParams.clientId,
    redirect_uri: authParams.redirectUri,
    scope: authParams.scope,
    response_type: authParams.responseType,
    approval_prompt: authParams.approvalPrompt,
    access_type: authParams.accessType,
  };

  // console.log(authParams.redirectUri);

  const query = new URLSearchParams(params).toString();
   window.location.href = `https://accounts.google.com/o/oauth2/auth?${query}`;
}

// URLから認証コードを取得
const getCode = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("code");
}

// トークンを取得
const getAuthToken = async(code) => {
  console.log("code",code);
  const params = {
    code,
    client_id: authParams.clientId,
    client_secret: authParams.clientSecret,
    redirect_uri: authParams.redirectUri,
    grant_type: authParams.grantType,
    access_type: authParams.accessType,
  };
  await fetch('https://www.googleapis.com/oauth2/v4/token',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  .then(res => res.json())
  .then((token)=>{
    console.log("getToken->",token);
    setAuthInfo(token);
  });
}

// ログアウト
const signOut = async(AuthInfo) => {
  try{
    if(AuthInfo !== undefined){
      await fetch('https://accounts.google.com/o/oauth2/revoke',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: AuthInfo.access_token,
        })
      })
      .then(res => res.json())
      .then((res_data)=>{
        if (res_data.status !== 200) {
          return Promise.reject(Error(`Failed to sign out`));
        }
      }); 
    }
  }
  finally{
    deleteAuthInfo();
    window.location.href = "/";
  }
  return;
}

// ユーザー情報を取得
const getUserInfo = async(AuthInfo) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{
      method: 'GET',
      headers: {
        Authorization: "Bearer " + AuthInfo.access_token,
        Accept: 'application/json',
      }
    })
    .then(res => res.json())
    .then((res_data)=>{
      if(res_data.error_description == "Invalid Credentials"){
        deleteAuthInfo();
        window.location.href = "/";
      }
      return(res_data);
    })
    .catch((err)=>{console.log(err)}); 

  return response;

}

export {
  setAuthInfo,
  getAuthInfo,
  deleteAuthInfo,
  requestGCPAuthCode,
  getCode,
  getAuthToken,
  signOut,
  getUserInfo
}
