type DisplaySelectionButton = {
  name: string;
  preview: string;
  icon: IconType;
  description: string;
  path: IRoute;
};

type DashboardDisplayProps = {
  buttons: DisplaySelectionButton[];
};

type SelectionRowProps = {
  name: string;
  icon: IconType;
  isSelected?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

type HomeSelectionRowProps = SelectionRowProps & DashboardDisplayProps;
