import { FaCarrot } from "react-icons/fa";

import {
  StyledButton,
  StyledFlexDiv,
  StyledTextHeadingM,
} from "@/components/styled/styled";

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders a row in the selection panel.
 * @returns The selection row.
 */
const SelectionRow = (
  props: SelectionRowProps | HomeSelectionRowProps
): React.ReactElement => {
  const { name, icon: IconComponent, isSelected, ...buttonAttr } = props;

  return (
    <StyledButton
      $width="100%"
      $height="fit-content"
      $padding="0.5rem"
      $selected={isSelected}
      {...buttonAttr}
    >
      <StyledFlexDiv
        $column
        $padding="10px"
        $spacing="1rem"
        $justify_content="left"
      >
        <StyledFlexDiv>
          <IconComponent size="50px" />
        </StyledFlexDiv>

        <StyledTextHeadingM>{name}</StyledTextHeadingM>

        <StyledFlexDiv $padding="0 0 0 0.8rem">
          <FaCarrot
            size="40px"
            style={{
              transform: "rotate(45deg)",
              opacity: `${isSelected ? 1 : 0}`,
              transition: "opacity 0.2s linear",
            }}
          />
        </StyledFlexDiv>
      </StyledFlexDiv>
    </StyledButton>
  );
};

export default SelectionRow;
