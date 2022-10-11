import { createSelector } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

import * as InvokeAI from '../../app/invokeai';

import { useAppDispatch, useAppSelector } from '../../app/store';
import { RootState } from '../../app/store';
import {
  setActiveTab,
  setAllParameters,
  setInitialImagePath,
  setSeed,
  setShouldShowImageDetails,
} from '../options/optionsSlice';
import DeleteImageModal from './DeleteImageModal';
import { SystemState } from '../system/systemSlice';
import IAIButton from '../../common/components/IAIButton';
import { runESRGAN, runGFPGAN } from '../../app/socketio/actions';
import IAIIconButton from '../../common/components/IAIIconButton';
import { MdDelete, MdFace, MdHd, MdImage, MdInfo } from 'react-icons/md';
import InvokePopover from './InvokePopover';
import UpscaleOptions from '../options/AdvancedOptions/Upscale/UpscaleOptions';
import FaceRestoreOptions from '../options/AdvancedOptions/FaceRestore/FaceRestoreOptions';

import { useToast } from '@chakra-ui/react';

const systemSelector = createSelector(
  (state: RootState) => state.system,
  (system: SystemState) => {
    return {
      isProcessing: system.isProcessing,
      isConnected: system.isConnected,
      isGFPGANAvailable: system.isGFPGANAvailable,
      isESRGANAvailable: system.isESRGANAvailable,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  }
);

type CurrentImageButtonsProps = {
  image: InvokeAI.Image;
};

/**
 * Row of buttons for common actions:
 * Use as init image, use all params, use seed, upscale, fix faces, details, delete.
 */
const CurrentImageButtons = ({ image }: CurrentImageButtonsProps) => {
  const dispatch = useAppDispatch();

  const shouldShowImageDetails = useAppSelector(
    (state: RootState) => state.options.shouldShowImageDetails
  );

  const toast = useToast();

  const intermediateImage = useAppSelector(
    (state: RootState) => state.gallery.intermediateImage
  );

  const upscalingLevel = useAppSelector(
    (state: RootState) => state.options.upscalingLevel
  );

  const gfpganStrength = useAppSelector(
    (state: RootState) => state.options.gfpganStrength
  );

  const { isProcessing, isConnected, isGFPGANAvailable, isESRGANAvailable } =
    useAppSelector(systemSelector);

  const handleClickUseAsInitialImage = () => {
    dispatch(setInitialImagePath(image.url));
    dispatch(setActiveTab(1));
  };


  const handleClickUseAllParameters = () =>
    dispatch(setAllParameters(image.metadata));


  // Non-null assertion: this button is disabled if there is no seed.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleClickUseSeed = () => dispatch(setSeed(image.metadata.image.seed));

  const handleClickUpscale = () => dispatch(runESRGAN(image));


  const handleClickFixFaces = () => dispatch(runGFPGAN(image));


  const handleClickShowImageDetails = () =>
    dispatch(setShouldShowImageDetails(!shouldShowImageDetails));


  return (
    <div className="current-image-options">
      <IAIIconButton
        icon={<MdImage />}
        tooltip="发送到以图画图"
        aria-label="Send To Image To Image"
        onClick={handleClickUseAsInitialImage}
      />

      <IAIButton
        label="使用相同设置"
        isDisabled={
          !['txt2img', 'img2img'].includes(image?.metadata?.image?.type)
        }
        onClick={handleClickUseAllParameters}
      />

      <IAIButton
        label="使用相同种子"
        isDisabled={!image?.metadata?.image?.seed}
        onClick={handleClickUseSeed}
      />

      {/*
      <InvokePopover
        title="Restore Faces"
        popoverOptions={<FaceRestoreOptions />}
        actionButton={
          <IAIButton
            label={'Restore Faces'}
            isDisabled={
              !isGFPGANAvailable ||
              Boolean(intermediateImage) ||
              !(isConnected && !isProcessing) ||
              !gfpganStrength
            }
            onClick={handleClickFixFaces}
          />
        }
      >
        <IAIIconButton icon={<MdFace />} aria-label="Restore Faces" />
      </InvokePopover>
*/ }
      <InvokePopover
        title="超分辨率（请勿滥用）"
        styleClass="upscale-popover"
        popoverOptions={<UpscaleOptions />}
        actionButton={
          <IAIButton
            label={'开始超分'}
            isDisabled={
              !isESRGANAvailable ||
              Boolean(intermediateImage) ||
              !(isConnected && !isProcessing) ||
              !upscalingLevel
            }
            onClick={handleClickUpscale}
          />
        }
      >
        <IAIIconButton icon={<MdHd />} aria-label="Upscale" />
      </InvokePopover>

      <IAIIconButton
        icon={<MdInfo />}
        tooltip="图片详情"
        aria-label="Details"
        onClick={handleClickShowImageDetails}
      />

      <DeleteImageModal image={image}>
        <IAIIconButton
          icon={<MdDelete />}
          tooltip="删除该图"
          aria-label="Delete Image"
          isDisabled={Boolean(intermediateImage)}
        />
      </DeleteImageModal>
    </div>
  );
};

export default CurrentImageButtons;
