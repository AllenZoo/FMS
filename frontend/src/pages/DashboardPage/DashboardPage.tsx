import { useState } from "react";
import { IconType } from "react-icons";
import { ROUTES } from "@/configs/routes";
import {
  GiFarmer,
  GiCapitol,
  GiBarn,
  GiPowderBag,
  GiPerson,
  GiInfo,
  GiPlantRoots,
  GiChicken,
  GiMoneyStack,
  GiFactory,
} from "react-icons/gi";

import NavBar from "@/components/NavBar";

import {
  StyledBGPanel,
  StyledButton,
  StyledFlexDiv,
  StyledGridDiv,
  StyledImage,
  StyledTextHeadingL,
} from "@/components/styled/styled";
import SelectionRow from "@/components/SelectionRow";

import productsImg from "@/assets/images/homeSelectionIcons/images/products.jpeg";
import animalImg from "@/assets/images/homeSelectionIcons/images/animals.jpg";
import fieldsImg from "@/assets/images/homeSelectionIcons/images/fields.png";
import facilitiesImg from "@/assets/images/homeSelectionIcons/images/facility.png";
import { useNavigate } from "react-router-dom";

const SELECTIONS: HomeSelectionRowProps[] = [
  {
    name: "Farmer Actions",
    icon: GiFarmer as IconType,
    isSelected: true,
    buttons: [
      {
        name: "Tend Fields",
        preview: fieldsImg,
        icon: GiPlantRoots as IconType,
        description: "Plant, Water, and Harvest your crops!",
        path: ROUTES.FARMER_ACTIONS_FIELDS,
      },
      {
        name: "Nurture Animals",
        preview: animalImg,
        icon: GiChicken as IconType,
        description: "Feed, Water, and Sell your animals!",
        path: ROUTES.FARMER_ACTIONS_LIVESTOCK,
      },
      {
        name: "Sell Products",
        preview: productsImg,
        icon: GiMoneyStack as IconType,
        description: "Sell your products to the market!",
        path: ROUTES.FARMER_ACTIONS_PRODUCTS,
      },
      {
        name: "Manage Facilities",
        preview: facilitiesImg,
        icon: GiFactory as IconType,
        description:
          "Manage both facilities of workers and facilities of animals!",
        path: ROUTES.FARMER_ACTIONS_FACILITIES,
      },
    ],
  },
  {
    name: "Company",
    icon: GiCapitol as IconType,
    buttons: [],
  },
  {
    name: "Housing",
    icon: GiBarn as IconType,
    buttons: [],
  },
  {
    name: "Inventory",
    icon: GiPowderBag as IconType,
    buttons: [],
  },
  {
    name: "User Info",
    icon: GiPerson as IconType,
    buttons: [],
  },
  {
    name: "About",
    icon: GiInfo as IconType,
    buttons: [],
  },
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Renders the dashboard page.
 * @returns The dashboard page.
 */
const DashboardPage = (): React.ReactElement => {
  const [selectedMainPage, setSelectedMainPage] =
    useState<HomeSelectionRowProps>(SELECTIONS[0]);
  const [selectedSubPage, setSelectedSubPage] =
    useState<DisplaySelectionButton | null>(selectedMainPage.buttons[0]);
  const navigate = useNavigate();

  /**
   * Handles the main page selection.
   * @param selected The selected page.
   */
  function handleMainPageSelection(selected: HomeSelectionRowProps): void {
    setSelectedMainPage(selected);
    setSelectedSubPage(selected.buttons[0]);
  }

  /**
   * Handles the sub page selection.
   * @param selected The selected page.
   */
  function handleSubPageSelection(selected: DisplaySelectionButton): void {
    setSelectedSubPage(selected);
  }

  // TODO: Remove this function and replace with actual navigation
  function enterSubPage(): void {
    // Navigate to sub page route
    console.log("Entering sub page!");
    console.log(selectedSubPage);

    if (selectedSubPage?.path === undefined) return;

    if (selectedSubPage?.path === ROUTES.FARMER_ACTIONS_LIVESTOCK) {
      navigate(selectedSubPage?.path);
    } else {
      // Display that the page is not implemented yet
      alert("This page is not implemented yet!");
    }
  }

  return (
    <StyledFlexDiv $fill>
      <NavBar />

      <StyledFlexDiv $column $spacing="10px">
        {/* SELECTION PANEL */}
        <StyledFlexDiv>
          <StyledBGPanel $width="28vw" $height="80vh">
            <StyledFlexDiv
              $justify_content="left"
              $spacing="10px"
              $fill={true}
              $padding="0 0.5rem 1rem 0"
              $scroll_y
            >
              {SELECTIONS.map((selection) => (
                <SelectionRow
                  {...selection}
                  key={selection.name}
                  isSelected={selectedMainPage.name === selection.name}
                  onClick={() => handleMainPageSelection(selection)}
                />
              ))}
            </StyledFlexDiv>
          </StyledBGPanel>
        </StyledFlexDiv>

        {/* DISPLAY PANEL */}
        <StyledFlexDiv>
          <StyledBGPanel $width="65vw" $height="80vh">
            {selectedSubPage && (
              <StyledGridDiv $columns="22.5vw 1fr" $rows="44vh 1fr" $gap="1rem">
                <StyledFlexDiv
                  $justify_content="left"
                  $spacing="0.5rem"
                  $fill={true}
                  $padding="0 0.5rem 1rem 0"
                  $scroll_y
                >
                  {selectedMainPage &&
                    selectedMainPage.buttons.map((selection) => (
                      <SelectionRow
                        {...selection}
                        key={selection.name}
                        isSelected={selectedSubPage.name === selection.name}
                        onClick={() => handleSubPageSelection(selection)}
                      />
                    ))}
                </StyledFlexDiv>

                <StyledFlexDiv>
                  <StyledBGPanel $width="100%" $height="100%" $padding="0">
                    <StyledImage src={selectedSubPage.preview} alt="" />
                  </StyledBGPanel>
                </StyledFlexDiv>

                <StyledFlexDiv>
                  {selectedSubPage.icon as React.ReactElement}

                  <StyledButton
                    $width="80%"
                    $height="80%"
                    $backgroundColour="lightgray"
                    onClick={enterSubPage}
                  >
                    <StyledTextHeadingL $color="black">
                      Enter!
                    </StyledTextHeadingL>
                  </StyledButton>
                </StyledFlexDiv>

                <StyledFlexDiv>
                  <StyledBGPanel $width="100%" $height="30vh">
                    {selectedSubPage.description}
                  </StyledBGPanel>
                </StyledFlexDiv>
              </StyledGridDiv>
            )}
          </StyledBGPanel>
        </StyledFlexDiv>
      </StyledFlexDiv>
    </StyledFlexDiv>
  );
};

export default DashboardPage;
