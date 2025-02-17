import { styled, keyframes } from "styled-components";

/* -------------------------------------------------------------------------- */
/*                                    DIVS                                    */
/* -------------------------------------------------------------------------- */
interface StyledFlexDivProps {
  $column?: boolean;
  $fill?: boolean;
  $justify_content?: string;
  $padding?: string;
  $margin?: string;
  $spacing?: string;
  $scroll_x?: boolean;
  $scroll_y?: boolean;
}

export const StyledFlexDiv = styled.div<StyledFlexDivProps>`
  display: flex;
  flex-direction: ${(props) => (props.$column ? "row" : "column")};
  align-items: center;
  justify-content: ${(props) => props.$justify_content || "center"};
  margin: ${(props) => props.$margin || "0"};
  padding: ${(props) => props.$padding || "0"};
  width: ${(props) => (props.$fill ? "100%" : "auto")};
  height: ${(props) => (props.$fill ? "100%" : "auto")};
  gap: ${(props) => props.$spacing || "0"};
  background: transparent;
  overflow-x: ${(props) => (props.$scroll_x ? "auto" : "hidden")};
  overflow-y: ${(props) => (props.$scroll_y ? "auto" : "hidden")};
`;

interface StyeldBGPanelProps {
  $width?: string;
  $height?: string;
  $padding?: string;
  $borderRadius?: string;
  $backdropFilter?: string;
}

export const StyledBGPanel = styled.div<StyeldBGPanelProps>`
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${(props: StyeldBGPanelProps) => props.$padding || "1rem"};
  width: ${(props: StyeldBGPanelProps) => props.$width || "auto"};
  height: ${(props: StyeldBGPanelProps) => props.$height || "auto"};
  border-radius: ${(props: StyeldBGPanelProps) =>
    props.$borderRadius || "1.25rem"};
  text-align: center;
  backdrop-filter: ${(props: StyeldBGPanelProps) =>
    props.$backdropFilter || "blur(5px)"};
  box-sizing: border-box;
  overflow: hidden;
`;

interface StyledGridDivProps {
  $columns?: string;
  $rows?: string;
  $gap?: string;
}

export const StyledGridDiv = styled.div<StyledGridDivProps>`
  display: grid;
  grid-template-columns: ${(props: StyledGridDivProps) =>
    props.$columns || "auto"};
  grid-template-rows: ${(props: StyledGridDivProps) => props.$rows || "auto"};
  gap: ${(props: StyledGridDivProps) => props.$gap || "0"};
`;

/* -------------------------------------------------------------------------- */
/*                                    MEDIA                                   */
/* -------------------------------------------------------------------------- */
interface StyledImageProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $borderRadius?: string;
}

export const StyledImage = styled.img<StyledImageProps>`
  width: ${(props: StyledImageProps) => props.$width || "100%"};
  height: ${(props: StyledImageProps) => props.$height || "100%"};
  margin: ${(props: StyledImageProps) => props.$margin || "0"};
  padding: ${(props: StyledImageProps) => props.$padding || "0"};
  border-radius: ${(props: StyledImageProps) => props.$borderRadius || "0"};
  object-fit: cover;
  object-position: center;
`;

/* -------------------------------------------------------------------------- */
/*                                 TYPOGRAPHY                                 */
/* -------------------------------------------------------------------------- */
interface StyledTextProps {
  $color?: string;
  $fontSize?: string;
  $fontWeight?: string;
  $margin?: string;
  $padding?: string;
}

export const StyledText = styled.p<StyledTextProps>`
  margin: ${(props: StyledTextProps) => props.$margin || "0"};
  padding: ${(props: StyledTextProps) => props.$padding || "0"};
  color: ${(props: StyledTextProps) => props.$color || "white"};
  font-family: Segoe UI, sans-serif;
  font-size: ${(props: StyledTextProps) => props.$fontSize || "1rem"};
  font-weight: ${(props: StyledTextProps) => props.$fontWeight || "normal"};
`;

export const StyledTextHeadingXL = styled(StyledText)`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;
  letter-spacing: -0.125rem;
`;

export const StyledTextHeadingL = styled(StyledText)`
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
  letter-spacing: -0.0625rem;
`;

export const StyledTextHeadingM = styled(StyledText)`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5rem;
`;

export const StyledTextSubheadingS = styled(StyledText)`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
`;

export const StyledTextBodyL = styled(StyledText)`
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
`;

export const StyledTextBodyM = styled(StyledText)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
`;

/* -------------------------------------------------------------------------- */
/*                            INTERACTIVE ELEMENTS                            */
/* -------------------------------------------------------------------------- */
interface StyledButtonProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $borderRadius?: string;
  $fontSize?: string;
  $selected?: boolean;
  $boxShadow?: string;
  $backgroundColour?: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props: StyledButtonProps) =>
    props.$backgroundColour || "transparent"};
  border-radius: ${(props: StyledButtonProps) => props.$borderRadius || "5px"};
  padding: ${(props: StyledButtonProps) => props.$padding || "10px"};
  margin: ${(props: StyledButtonProps) => props.$margin || "0"};
  width: ${(props: StyledButtonProps) => props.$width || "auto"};
  height: ${(props: StyledButtonProps) => props.$height || "auto"};
  font-size: ${(props: StyledButtonProps) => props.$fontSize || "1.5rem"};
  box-shadow: ${(props: StyledButtonProps) => props.$boxShadow || "none"};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    * {
      color: #91f680;
    }
  }

  ${(props: StyledButtonProps) =>
    props.$selected &&
    `
    background-color: rgba(0, 0, 0, 0.2);
    * {
      color: #91F680;
    }
  `}
`;

// TODO: make this button better
export const StyledButtonEnlarge = styled(StyledButton)`
  &:hover {
    transform-origin: center;
    transform: scale(1.1);
    transition: 0.2s;
  }
`;

// TODO: make this button better
export const StyledButtonSlide = styled(StyledButton)`
  ${(props: StyledButtonProps) =>
    !props.$selected &&
    `
    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: inset 25rem 0 0 0 rgba(0, 0, 0, 0.2);
      transition: 0.5s;
    }

    &:active {
      transition: box-shadow 0s;
    }
`}
`;

interface StyledActionButtonProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $borderRadius?: string;
  $backgroundColour?: string;
  $colour?: string;
  $fontSize?: string;
}

export const StyledActionButton = styled.button<StyledActionButtonProps>`
  outline: none;
  border: 2px solid #fff;
  border-radius: ${(props: StyledButtonProps) =>
    props.$borderRadius || "0.75rem"};
  padding: ${(props: StyledButtonProps) => props.$padding || "0.5rem 1rem"};
  margin: ${(props: StyledButtonProps) => props.$margin || "0"};
  width: ${(props: StyledButtonProps) => props.$width || "auto"};
  height: ${(props: StyledButtonProps) => props.$height || "auto"};
  font-size: ${(props: StyledButtonProps) => props.$fontSize || "1.5rem"};
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(props: StyledActionButtonProps) =>
      props.$backgroundColour || "rgba(255, 0, 0, 0.1)"};
    border: 2px solid
      ${(props: StyledActionButtonProps) => props.$colour || "#f55"};
  }
`;

interface StyledInputBox {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $borderRadius?: string;
  $fontSize?: string;
}

export const StyledInputBox = styled.input<StyledInputBox>`
  padding: ${(props: StyledButtonProps) => props.$padding || "1vh 1vw"};
  margin: ${(props: StyledButtonProps) => props.$margin || "0"};
  width: ${(props: StyledButtonProps) => props.$width || "auto"};
  height: ${(props: StyledButtonProps) => props.$height || "auto"};
  font-size: ${(props: StyledButtonProps) => props.$fontSize || "1.5rem"};
  border: 2px solid #fff;
  border-radius: ${(props: StyledButtonProps) =>
    props.$borderRadius || "0.75rem"};
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
  outline: none;
  transition: 0.2s;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.1);
    transition: 0.2s;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

interface StyledCheckboxProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $padding?: string;
  $fontSize?: string;
}

export const StyledCheckbox = styled.input<StyledCheckboxProps>`
  margin: ${(props: StyledCheckboxProps) => props.$margin || "0"};
  padding: ${(props: StyledCheckboxProps) => props.$padding || "0"};
  width: ${(props: StyledCheckboxProps) => props.$width || "auto"};
  height: ${(props: StyledCheckboxProps) => props.$height || "auto"};
  min-width: 1.5rem;
  min-height: 1.5rem;
  background-color: transparent;
  border: 2px solid #fff;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
`;


// Define a keyframe animation for the rotation
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Create a styled component for the loading spinner
export const StyledLoadingSpinner = styled.div`
  border: 8px solid #ffffff; /* White border */ 
  border-top: 8px solid #3498db; /* Blue border for the spinner */
  border-radius: 50%; /* Circular shape */
  width: 58px;
  height: 58px;
  animation: ${rotateAnimation} 2s linear infinite; /* Apply the rotation animation */
`;
