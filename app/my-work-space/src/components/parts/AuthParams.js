const authParams = {
  clientId: "720752186083-7a86mlars60k26jjg8useagl54te7qa2.apps.googleusercontent.com",
  clientSecret:"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",
  scope: "profile email",
  responseType: "code",
  approvalPrompt: "force",
  accessType: "offline",
  redirectUri: "http://localhost:3001/auth_code",
  grantType: "authorization_code",
}

export default authParams;