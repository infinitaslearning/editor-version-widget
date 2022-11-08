import React from 'react';
import { PlayerEditor } from '@infinitas/module-player-editor';
import { PlayerWrapper } from '@infinitas/app-player';
import particle from '../particle';

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

const Player = ({ onChange }) => (
  <div style={{ display: 'flex' }}>
    <PlayerEditor
      particle={particle}
      previewer={previewer}
      previewMode={false}
      // onEdit={(isEdited, editorState) => console.log('onEdit', isEdited, editorState)}
      onCurrentPatches={onChange}
    />
  </div>
  );

export default Player;
