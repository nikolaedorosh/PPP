import { useState } from "react";

const SignIn = () => {
  const [inputPass, setInputPass] = useState("");
  const [inputMail, setInputMail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault()
    
  }
  return ( 
    <form onSubmit={submitHandler}>
        <div>
          <input
            placeholder="Type email here..."
            onChange={inputMailHandler}
            value={inputMail}
            type="mail"
          />
          <input
            placeholder="Type password here..."
            onChange={inputPassHandler}
            value={inputPass}
            type="password"
          />
        </div>

        <button type="submit" className="btn btn-primary mx-1">
          Sign Up
        </button>
      </form>
   );
}
 
export default SignIn;
