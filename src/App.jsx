/* eslint-disable no-console */
import React from 'react';

import { PlayerEditor } from '@infinitas/module-player-editor';
import { PlayerWrapper } from '@infinitas/app-player';

const particle = {
  id: 'id-fb2f068b-eba9-4e76-c293-0e04e9fe11ba',
  metadata: {
    isSelfAssessment: false,
  },
  portableTextContent: {
    _id: 'id-fb2f068b-eba9-4e76-c293-0e04e9fe11ba',
    _type: 'multipleSelect',
    predefinedAnswer: false,
    flashCard: false,
    shuffle: 'yes',
    question: [
    ],
    answerOptions: [
    ],
  },
};

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

const App = () => (
  <div style={{ display: 'flex' }}>
    <PlayerEditor
      particle={particle}
      previewer={previewer}
      previewMode={false}
      // onEdit={(isEdited, editorState) => console.log('onEdit', isEdited, editorState)}
      onPatches={patches => console.log('patches: ', patches)}
    />
  </div>
);

export default App;
