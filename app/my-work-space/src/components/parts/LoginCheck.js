// Google認証
import {setAuthInfo,getAuthInfo,deleteAuthInfo,requestGCPAuthCode,getCode,getAuthToken,signOut,getUserInfo} from "./AuthInfo";

const LoginCheck = async() => {
  const info = getAuthInfo();
  // if(info == "undefined"){
  //   // item = null;
  //   deleteAuthInfo();
  // }
  // ローカルにログイン情報がない場合は認証トークンを取得
  if(!info){
    requestGCPAuthCode();
  }
  else{
    console.log("info",info);

    // return getUserInfo(info);
    const response = await getUserInfo(info)
    .then((res)=>{
      console.log("koko:",res);
      return res;
    })

    return response;
  }
}

const RegistToken = () => {
  // URLから認証トークンを取得
  const code = getCode();
  if(code !=null){
    getAuthToken(code)
      .then((token)=>{
        // このままではURLに認証情報が残るので
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  }
}

const Logout = () => {
  deleteAuthInfo();
  window.location.href = "/";
}

const useDbToken = async() => {
  const info = await getAuthInfo();
  return info.access_token;
}

export{
  LoginCheck,
  RegistToken,
  Logout,
  useDbToken,
};
