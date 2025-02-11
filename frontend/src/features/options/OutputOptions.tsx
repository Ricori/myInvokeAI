import { Flex } from '@chakra-ui/react';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setSeamless } from './optionsSlice';
import { ChangeEvent } from 'react';
import IAISwitch from '../../common/components/IAISwitch';

/**
 * Image output options. Includes width, height, seamless tiling.
 */
const OutputOptions = () => {
  const dispatch = useAppDispatch();

  const seamless = useAppSelector((state: RootState) => state.options.seamless);

  const handleChangeSeamless = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSeamless(e.target.checked));

  return (
    <Flex gap={2} direction={'column'}>
      <IAISwitch
        label="无缝拼接"
        fontSize={'md'}
        isChecked={seamless}
        onChange={handleChangeSeamless}
      />
    </Flex>
  );
};

export default OutputOptions;
