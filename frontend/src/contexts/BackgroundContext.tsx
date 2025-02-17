import { createContext, useState } from 'react';

import BackgroundImg from '@/assets/images/backgrounds/background.png';

import styles from './BackgroundContext.module.scss';


/**
 * Context for the background wallpaper.
 */
const BackgroundContext = createContext<{
  background: string,
  setBackground: React.Dispatch<React.SetStateAction<string>>
}>({
  background: BackgroundImg,
  setBackground: () => { null; },
});

export default BackgroundContext;


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
/**
 * Context provider for the background image.
 * @returns The background provider.
 */
export const BackgroundProvider = (props: React.PropsWithChildren): React.ReactElement => {
  const [background, setBackground] = useState(BackgroundImg);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      <div className={styles.Background}>
        <img src={background} alt="" />
      </div>

      {props.children}
    </BackgroundContext.Provider>
  );
};
