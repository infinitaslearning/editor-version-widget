/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PlayerEditor } from '@infinitas/module-player-editor';
import { PlayerWrapper } from '@infinitas/app-player';

const previewerConfig = {
  superSubmitButton: null,
  retryConfig: {
    all: 1,
  },
  showRightAnswer: {
    all: true,
  },
  showSolutionExplained: {
    all: true,
  },
  blockAutocompleteBrowser: true,
};

const previewer = {
  component: PlayerWrapper,
  config: previewerConfig,
};

const Player = ({ onChange, ...props }) => (
  <div style={{ display: 'flex' }}>
    <PlayerEditor
      // particle={particle}
      previewer={previewer}
      previewMode={false}
      // onEdit={onChange}
      onCurrentPatches={onChange}
      {...props}
    />
  </div>
  );

export default Player;
