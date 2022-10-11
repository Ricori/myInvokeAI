import { IconButton, Link, Tooltip, useColorMode } from '@chakra-ui/react';

import { FaSun, FaMoon, FaGithub, FaDiscord } from 'react-icons/fa';
import { MdHelp, MdKeyboard, MdSettings } from 'react-icons/md';

import yoruAILogo from '../../assets/images/logo.jpg';

import SettingsModal from './SettingsModal/SettingsModal';
import StatusIndicator from './StatusIndicator';

/**
 * Header, includes color mode toggle, settings button, status message.
 */
const SiteHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeIcon = colorMode == 'light' ? <FaMoon /> : <FaSun />;

  // Make FaMoon and FaSun icon apparent size consistent
  const colorModeIconFontSize = colorMode == 'light' ? 18 : 20;

  return (
    <div className="site-header">
      <div className="site-header-left-side">
        <img src={yoruAILogo} />
        <h1>
          Yoru <strong>AI</strong>
        </h1>
      </div>

      <div className="site-header-right-side">
        <StatusIndicator />

        <SettingsModal>
          <IconButton
            aria-label="Settings"
            variant="link"
            fontSize={24}
            size={'sm'}
            icon={<MdSettings />}
          />
        </SettingsModal>

        <IconButton
          aria-label="toggleColorMode"
          onClick={toggleColorMode}
          variant="link"
          size={'sm'}
          fontSize={colorModeIconFontSize}
          icon={colorModeIcon}
        />
      </div>
    </div>
  );
};

export default SiteHeader;
