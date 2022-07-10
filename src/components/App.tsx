import React, { FC, useEffect, useRef, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Welcome from './Welcome'

import { IoMdSettings } from 'react-icons/io'
import { EditorState, Text } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { search, searchKeymap } from "@codemirror/search";
import { bracketMatching, foldGutter, foldKeymap } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { polycodeTheme } from "./theme/defaultThemePolycode";
import { vim } from "@replit/codemirror-vim";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  )
}

const Main: FC = () => {
  console.log(process.cwd())
  return (
    <div className="w-screen h-screen bg-[#282C34] flex flex-row">
      <Editor />
      <Setting />
    </div>
  )
}

const Setting: FC = () => {
  return (
    <IoMdSettings className='fill-white hover:fill-[#17152B] absolute bottom-0 left-0 m-3 bg-transparent rounded-3xl hover:bg-white hover:rounded-xl transition-all duration-75 ease-linear p-2 w-14 h-14 cursor-pointer' />
  )
}

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
        EditorView.updateListener.of(function(e) { setCode(e.state.doc) })
      ]
    })
    const view = new EditorView({ state: start, parent: editor.current })
    return () => {
      view.destroy()
    }
  }, [])
  return (
    <div ref={editor} className='w-screen text-xl'></div>
  )
}

export default App
