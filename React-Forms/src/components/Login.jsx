import { useState } from "react";

export default function Login() {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [emailOutOfFocus, setEmailOutOfFocus] = useState(false);

  const emailIsInvalid =
    emailOutOfFocus &&
    inputState.email.length > 0 &&
    !inputState.email.includes("@");

  function handleInputChange(event) {
    const identifier = event.target.id;
    setInputState((prevInput) => {
      return {
        ...prevInput,
        [identifier]: event.target.value,
      };
    });

    setEmailOutOfFocus(false);
  }

  function handleOutOfFocus() {
    setEmailOutOfFocus(true);
  }
  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInputChange}
            onBlur={handleOutOfFocus}
            value={inputState.email}
          />
          <div>{emailIsInvalid && <p>Please enter a valid email</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={inputState.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
