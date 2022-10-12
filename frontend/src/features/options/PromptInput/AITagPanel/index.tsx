
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { PromptKeyArr } from '../../../../const';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import IAIButton from '../../../../common/components/IAIButton';
import { setPrompt } from '../../optionsSlice';
import { optionsSelector } from '../PromptInput';

const AITagPanel = () => {
  const dispatch = useAppDispatch();
  const { prompt } = useAppSelector(optionsSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickAITag = (name: string) => {
    console.log(name);
    dispatch(setPrompt(prompt === '' ? name : `${prompt},${name}`));
  }

  return (
    <div>
      <IAIButton
        label={'点击打开关键词词典'}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>关键词词典（点击即可添加）</DrawerHeader>
          <DrawerBody className="aiTag-drawer-body">
            <Accordion defaultIndex={[0]} allowMultiple>
              {PromptKeyArr.map(item =>
                <AccordionItem className="aiTag-accordion-item" key={item.sub}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        {item.sub}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className="aiTag-accordion-panel">
                    {item.data.map((data, i) => <IAIButton
                      key={i}
                      label={data.desc}
                      aria-label="Invoke"
                      type="submit"
                      onClick={() => handleClickAITag(data.name)}
                      className="invoke-btn aiTag-button"
                    />)}
                  </AccordionPanel>
                </AccordionItem>
              )}
            </Accordion>
          </DrawerBody>


        </DrawerContent>
      </Drawer>


    </div>
  );
};

export default AITagPanel;
