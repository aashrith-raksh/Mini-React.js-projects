import { useState } from "react";
import Input from "/src/components/Input.jsx";
import useInput from "../hooks/useInput";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {
  // const [inputState, setInputState] = useState({
  //   email: "",
  //   password: "",
  // });

  const {
    inputValue: emailValue,
    inputBlur: emailOutOfFocus,
    handleInputBlur: handleEmailOutOfFocus,
    handleInputChange: handleEmailChange,
  } = useInput("");

  const {
    inputValue: passwordValue,
    inputBlur: passwordOutOfFocus,
    handleInputBlur: handlePasswordOutOfFocus,
    handleInputChange: handlePasswordChange,
  } = useInput("");

  const emailIsInvalid =
    emailOutOfFocus && isNotEmpty(emailValue) && !isEmail(emailValue);

  const passwordIsInvalid =
    passwordOutOfFocus &&
    isNotEmpty(passwordValue) &&
    !hasMinLength(passwordValue, 8);

  // function handleInputChange(event) {
  //   const identifier = event.target.id;
  //   setInputState((prevInput) => {
  //     return {
  //       ...prevInput,
  //       [identifier]: event.target.value,
  //     };
  //   });

  //   setEmailOutOfFocus(false);
  // }

  // function handleOutOfFocus() {
  //   setEmailOutOfFocus(true);
  // }
  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onChange={(event) => handleEmailChange(event.target.value)}
          onBlur={handleEmailOutOfFocus}
          value={emailValue}
          error={emailIsInvalid && <p>Please enter a valid email</p>}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) => handlePasswordChange(event.target.value)}
          onBlur={handlePasswordOutOfFocus}
          value={passwordValue}
          error={passwordIsInvalid && <p>Please enter a valid password</p>}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
