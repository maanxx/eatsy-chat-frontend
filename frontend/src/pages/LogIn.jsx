import React from "react";

function LogIn() {
  return (
    <>
      <div className="login-container">
        <image src="../assets/logo_login.png" alt="Login Logo" />
        <div className="title-container">
          <h1 className="h1-font">Eatsy.</h1>
          <h1 className="h2-font">Chat.</h1>
          <h1 className="h1-font">Review.</h1>
        </div>

        <div>
            <img src="../assets/google_logo.png" alt="Google Logo" />
            <button>Continue with Google</button>
        </div>

        <div>
            <button>Continue with phone</button>

        </div>
      </div>
    </>
  );
}

export default LogIn;
