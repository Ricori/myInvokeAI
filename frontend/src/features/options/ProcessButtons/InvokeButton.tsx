import React from 'react';
import { generateImage } from '../../../app/socketio/actions';
import { useAppDispatch } from '../../../app/store';
import IAIButton from '../../../common/components/IAIButton';
import useCheckParameters from '../../../common/hooks/useCheckParameters';

export default function InvokeButton() {
  const dispatch = useAppDispatch();
  const isReady = useCheckParameters();

  const handleClickGenerate = () => {
    dispatch(generateImage());
  };

  return (
    <IAIButton
      label="来吧"
      aria-label="Invoke"
      type="submit"
      isDisabled={!isReady}
      onClick={handleClickGenerate}
      className="invoke-btn"
    />
  );
}
