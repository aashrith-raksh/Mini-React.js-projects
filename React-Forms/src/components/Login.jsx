import { useState } from "react";
import Input from '/src/components/Input.jsx';

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
        <Input
          label = "Email"
          id="email"
          type="email"
          name="email"
          onChange={handleInputChange}
          onBlur={handleOutOfFocus}
          value={inputState.email}
          error={emailIsInvalid && <p>Please enter a valid email</p>}
        />

        <Input
          label = "Password"
          id="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={inputState.password}
          error={""}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
