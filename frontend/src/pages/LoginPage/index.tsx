import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiWheat } from "react-icons/gi";
import styled from "styled-components";

import { useLoginMutation } from "@/app/auth/auth.api.slice";
import { toastError, toastSuccess } from "@/utils/toastMessages";
import usePersist from "@/hooks/usePersist";
import ModalContext from "@/contexts/ModalContext";

import {
  StyledLoadingSpinner,
  StyledActionButton,
  StyledCheckbox,
  StyledFlexDiv,
  StyledInputBox,
  StyledTextHeadingM,
  StyledTextHeadingXL,
} from "@/components/styled/styled";

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 3vh 0;

  .WheatIcon {
    width: 50vw;
    height: 30vh;
    margin: 1rem 0 0 0;
    animation: pulse 5s linear infinite;
    stroke: #ff0;
    fill: #ff0;

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  gap: 1.5rem;
  margin: 2vh 0;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-right: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the login page.
 * @returns The login page.
 */
const LoginPage = (): React.ReactElement => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login] = useLoginMutation();
  const [persist, setPersist] = usePersist();
  const [loading, setLoading] = useState(false);
  const modalContext = useContext(ModalContext);

  const navigate = useNavigate();

  /**
   * Handles the login process.
   * @async
   */
  async function handleLogin(): Promise<void> {
    try {
      setLoading(true);
      const response = await login({
        username: usernameRef.current?.value as unknown as string,
        password: passwordRef.current?.value as unknown as string,
      }).unwrap();

      if (response.status === "success") {
        toastSuccess(
          `Successfully logged in!\nWelcome, ${
            usernameRef.current?.value as string
          }!`
        );
        navigate("/dashboard");
      } else if (response.status === "error") {
        toastError(
          `Failed to authenticate: ${response.message}! Maybe try credentials: "guest", "guest"?`
        );
      } else {
        console.log("Unexpected response from server: ");
        toastError(
          "An unexpected server error occured! Please try again later :("
        );
      }
    } catch (error) {
      //const { data } = error as { data: { error: string } };
      toastError(
        `An unexpected server error occured! Please try again later :(`
      );
      // toastError(`An unexpected error occured: ${data.error}!`);
    } finally {
      setLoading(false);
      modalContext.clearModal();
    }
  }

  /**
   * Handles the persist checkbox.
   * @param event The event.
   */
  function handlePersist(event: React.ChangeEvent<HTMLInputElement>): void {
    setPersist(event.target.checked);
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (loading) {
      modalContext.setModal(
        <>
          <h1>
            Loading...
            <StyledFlexDiv $justify_content="center">
              <StyledLoadingSpinner />
            </StyledFlexDiv>
          </h1>
        </>
      );
      modalContext.setClosable(false);
    } else {
      modalContext.clearModal();
    }
  }, [loading]);

  return (
    <StyledLoginPage>
      <StyledFlexDiv $spacing="1rem" $padding="1rem">
        <StyledTextHeadingXL>
          Farm Management System&trade; Login
        </StyledTextHeadingXL>
        <StyledTextHeadingM>
          The best way to control and manage your farm!
        </StyledTextHeadingM>
      </StyledFlexDiv>
      <GiWheat className="WheatIcon" />

      <StyledLoginForm>
        <StyledFlexDiv>
          <label htmlFor="user">
            <StyledTextHeadingM>Username</StyledTextHeadingM>
          </label>
          <StyledInputBox
            ref={usernameRef}
            type="text"
            id="user"
            name="user"
            $width="25rem"
            $height="2.5rem"
            defaultValue="guest"
            placeholder="..."
            onKeyDown={handleKeyDown}
          />
        </StyledFlexDiv>

        <StyledFlexDiv>
          <label htmlFor="pass">
            <StyledTextHeadingM>Password</StyledTextHeadingM>
          </label>
          <StyledInputBox
            ref={passwordRef}
            type="password"
            id="pass"
            name="pass"
            $width="25rem"
            $height="2.5rem"
            defaultValue="guest"
            placeholder="..."
            onKeyDown={handleKeyDown}
          />
        </StyledFlexDiv>

        <StyledFlexDiv>
          <label htmlFor="remember">
            <StyledTextHeadingM>Remember Me</StyledTextHeadingM>
          </label>
          <StyledCheckbox
            type="checkbox"
            id="remember"
            name="remember"
            $width="2rem"
            $height="2rem"
            defaultChecked={persist}
            onChange={handlePersist}
          />
        </StyledFlexDiv>

        <StyledActionButton
          $colour="#5f5"
          $backgroundColour="rgba(0, 255, 0, 0.1)"
          $width="14rem"
          $height="3.5rem"
          type="button"
          onClick={handleLogin as () => void}
        >
          Log In
        </StyledActionButton>
      </StyledLoginForm>
    </StyledLoginPage>
  );
};

export default LoginPage;
