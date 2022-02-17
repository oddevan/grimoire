import { useState } from "react";
import OAuth2Login from "react-simple-oauth2-login";

const User = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const onSuccess = (res: any) => {
    setAccessToken(res.access_token);

    fetch("https://smolblog.com/wp-json/wp/v2/pages/34?context=edit", {
      method: "GET",
      headers: { Authorization: `Bearer ${res.access_token}` },
    })
      .then((result) => result.json())
      .then((result) => console.log({ result }))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {accessToken && (
        <p>
          Logged in with <code>{accessToken}</code>
        </p>
      )}
      <OAuth2Login
        authorizationUrl="https://smolblog.com/oauth/authorize/"
        responseType="token"
        clientId="pvY7oLOxc68YixsaACothQ4hirAN8dsw8ZDWiRSs" // app public key
        redirectUri="http://localhost:3000/oauth-callback"
        onSuccess={onSuccess}
        onFailure={(res: any) => console.error(res)}
      />
    </>
  );
};

export default User;
