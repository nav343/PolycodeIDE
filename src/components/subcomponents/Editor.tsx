import React, { FC, useRef, useState, useEffect } from "react"

import { EditorState, Text } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, showPanel } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { search, searchKeymap } from "@codemirror/search";
import { bracketMatching, foldGutter, foldKeymap } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { polycodeTheme } from "../theme/defaultThemePolycode";
import { vim } from "@replit/codemirror-vim";

import { wordCountPanel } from "../utils/wordCounter";

const Editor: FC = () => {
  const editor = useRef()
  const startDoc = '// Written using Polycode'
  const [code, setCode] = useState<Text>()

  useEffect(() => {
    const start = EditorState.create({
      doc: startDoc,
      extensions: [
        javascript({ jsx: true, typescript: true }),
        autocompletion({ icons: false }),
        search({ top: true, caseSensitive: true }),
        keymap.of([...defaultKeymap, indentWithTab, ...searchKeymap, ...historyKeymap, ...foldKeymap]),
        lineNumbers(),
        closeBrackets(),
        bracketMatching(),
        history(),
        polycodeTheme,
        foldGutter(),
        vim(),
        showPanel.of(wordCountPanel),
        EditorView.updateListener.of(function(e) { setCode(e.state.doc) })
      ]
    })
    const view = new EditorView({ state: start, parent: editor.current })
    return () => {
      view.destroy()
    }
  }, [])
  return (
    <>
      <div ref={editor} className='w-screen text-xl'></div>
    </>
  )
}

export default Editor
