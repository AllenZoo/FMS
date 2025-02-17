import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { GiFarmTractor } from 'react-icons/gi';
import styled from 'styled-components';

import { useLogoutMutation } from '@/app/auth/auth.api.slice';
// import { selectCurrentToken } from '@/app/auth/auth.slice';
import useAuth from '@/hooks/useAuth';
import { ROUTES, getPathFromRoute } from "@/configs/routes";
import { toastError, toastSuccess } from '@/utils/toastMessages';

import { StyledFlexDiv, StyledActionButton, StyledTextHeadingL, StyledTextHeadingM } from './styled/styled';


/**
 * Returns a greeting message based on the time of day.
 * @returns The greeting message.
 */
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)
    return 'Good morning';
  else if (hour >= 12 && hour < 18)
    return 'Good afternoon';
  return 'Good evening';
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  gap: 0.5rem;
  box-sizing: border-box;
  padding: 0 3vw;
  margin: 2vh 0;
  width: 100%;
  height: 10vh;
`;

const StyledHomeButton = styled.button`
  font-size: 3rem;
  border: transparent;
  background: transparent;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    scale: 1.1;
  }
`;

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the navigation bar.
 * @returns The navigation bar.
 */
const NavBar = (): React.ReactElement => {
  const { username: currentUser } = useAuth();
  const [logout, { isSuccess, isError }] = useLogoutMutation();
  
  const navigate = useNavigate();
  // const token = useSelector(selectCurrentToken);

  /**
   * Handles token refresh.
   */
  // useEffect(() => {
  //   const verifyRefreshToken = async () => {
  //     try {
  //       await refresh();
  //     } catch (err) {
  //       // console.error(err);
  //     }
  //   }

  //   if (!token && persist)
  //     verifyRefreshToken();
  // }, [token, refresh]);

  /**
   * Checks if the user is logging out.
   */
  useEffect(() => {
    if (isSuccess) {
      navigate(getPathFromRoute(ROUTES.LOGIN));
      toastSuccess('Successfully logged out!');
    } else if (isError) {
      toastError('Logout failed!');
    }
  }, [isSuccess, isError, navigate]);

  return (
    <StyledNavBar>
      <StyledHomeButton type="button" title="Dashboard">
        <Link to={getPathFromRoute(ROUTES.DASHBOARD)}>
          <GiFarmTractor />
        </Link>
      </StyledHomeButton>

      <StyledFlexDiv $spacing="0.25rem">
        <StyledTextHeadingL>Farm Management System&trade;</StyledTextHeadingL>
        <StyledTextHeadingM>{getGreeting()}, {currentUser}!</StyledTextHeadingM>
      </StyledFlexDiv>

      <StyledActionButton
        $colour="#f55"
        $backgroundColour="rgba(255, 0, 0, 0.1)"
        $padding="1vh 1vw"
        $fontSize="1.25rem"
        type="button"
        onClick={() => logout(currentUser) as unknown as void}
      >
        Log out
      </StyledActionButton>
    </StyledNavBar>
  );
}

export default NavBar;
