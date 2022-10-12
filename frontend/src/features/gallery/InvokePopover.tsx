import {
  Box,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PopoverProps = {
  title?: string;
  delay?: number;
  styleClass?: string;
  placement?: PlacementWithLogical;
  popoverOptions?: ReactNode;
  actionButton?: ReactNode;
  children: ReactNode;
};

const InvokePopover = ({
  title = 'Popup',
  styleClass,
  delay = 50,
  placement,
  popoverOptions,
  actionButton,
  children,
}: PopoverProps) => {
  return (
    <Popover trigger={'hover'} placement={placement} closeDelay={delay}>
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>
      <PopoverContent className={`popover-content ${styleClass}`}>
        <PopoverArrow className="popover-arrow" />
        <PopoverHeader className="popover-header">{title}</PopoverHeader>
        <div className="popover-options">
          {popoverOptions ? popoverOptions : null}
          {actionButton}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InvokePopover;
