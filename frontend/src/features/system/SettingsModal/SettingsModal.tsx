import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { createSelector } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { cloneElement, ReactElement } from 'react';
import { RootState, useAppSelector } from '../../../app/store';
import { persistor } from '../../../main';
import {
  setShouldConfirmOnDelete,
  setShouldDisplayGuides,
  setShouldDisplayInProgress,
  SystemState,
} from '../systemSlice';
import SettingsModalItem from './SettingsModalItem';

const systemSelector = createSelector(
  (state: RootState) => state.system,
  (system: SystemState) => {
    const {
      shouldDisplayInProgress,
      shouldConfirmOnDelete,
      shouldDisplayGuides,
    } = system;
    return {
      shouldDisplayInProgress,
      shouldConfirmOnDelete,
      shouldDisplayGuides,
    };
  },
  {
    memoizeOptions: { resultEqualityCheck: isEqual },
  }
);

type SettingsModalProps = {
  /* The button to open the Settings Modal */
  children: ReactElement;
};

/**
 * Modal for app settings. Also provides Reset functionality in which the
 * app's localstorage is wiped via redux-persist.
 *
 * Secondary post-reset modal is included here.
 */
const SettingsModal = ({ children }: SettingsModalProps) => {
  const {
    isOpen: isSettingsModalOpen,
    onOpen: onSettingsModalOpen,
    onClose: onSettingsModalClose,
  } = useDisclosure();

  const {
    isOpen: isRefreshModalOpen,
    onOpen: onRefreshModalOpen,
    onClose: onRefreshModalClose,
  } = useDisclosure();

  const {
    shouldDisplayInProgress,
    shouldConfirmOnDelete,
    shouldDisplayGuides,
  } = useAppSelector(systemSelector);

  /**
   * Resets localstorage, then opens a secondary modal informing user to
   * refresh their browser.
   * */
  const handleClickResetWebUI = () => {
    persistor.purge().then(() => {
      onSettingsModalClose();
      onRefreshModalOpen();
    });
  };

  return (
    <>
      {cloneElement(children, {
        onClick: onSettingsModalOpen,
      })}

      <Modal isOpen={isSettingsModalOpen} onClose={onSettingsModalClose}>
        <ModalOverlay />
        <ModalContent className="settings-modal">
          <ModalHeader className="settings-modal-header">设置</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="settings-modal-content">
            <div className="settings-modal-items">
              <SettingsModalItem
                settingTitle="显示正在生成的图像 (不建议)"
                isChecked={shouldDisplayInProgress}
                dispatcher={setShouldDisplayInProgress}
              />

              <SettingsModalItem
                settingTitle="删除图像需要确认"
                isChecked={shouldConfirmOnDelete}
                dispatcher={setShouldConfirmOnDelete}
              />

              <SettingsModalItem
                settingTitle="在配置项旁边显示该项的帮助"
                isChecked={shouldDisplayGuides}
                dispatcher={setShouldDisplayGuides}
              />
            </div>

            <div className="settings-modal-reset">
              <Heading size={'md'}>清除缓存</Heading>

              <Button colorScheme="red" onClick={handleClickResetWebUI}>
                清除缓存
              </Button>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSettingsModalClose}>关闭</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isRefreshModalOpen}
        onClose={onRefreshModalClose}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(40px)" />
        <ModalContent>
          <ModalBody pb={6} pt={6}>
            <Flex justifyContent={'center'}>
              <Text fontSize={'lg'}>
                缓存已清除，请刷新页面。
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
