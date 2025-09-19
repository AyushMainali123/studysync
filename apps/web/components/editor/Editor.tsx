'use client';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';

const theme = {
  paragraph: 'editor-paragraph',
  container: 'editor-container',
};

interface IEditorProps {
  onChange?: (editorState: EditorState) => void;
  onError?: (error: Error) => void;
}

export function Editor({ onChange, onError }: IEditorProps) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError: onErrorBoundary,
  };

  function onErrorBoundary(error: Error) {
    console.error('Lexical Error:', error);
    onError?.(error);
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="border border-primary rounded-sm relative px-4 py-2 min-h-[calc(100vh-100px)]" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange || (() => {})} />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
