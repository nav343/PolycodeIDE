import React, { FC, useEffect, useRef, useState } from "react";
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Welcome from './Welcome'

import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import { SiGnubash } from 'react-icons/si'
import { VscSourceControl } from 'react-icons/vsc'
import { IoMdSettings } from 'react-icons/io'
import { EditorState, Text } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { search, searchKeymap } from "@codemirror/search";
import { bracketMatching, foldGutter, foldInside, foldKeymap } from "@codemirror/language";
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
  return (
    <div className="w-screen h-screen bg-[#282C34] flex flex-row">
      <Sidebar />
      <Editor />
    </div>
  )
}

const Sidebar: FC = () => {
  return (
    <div className="bg-gray-900 flex items-center justify-between p-3 flex-col">
      <div>
        <BsFillJournalBookmarkFill fill="white" size={35} />
        <VscSourceControl fill="white" size={35} className='my-5' />
        <SiGnubash fill="white" size={35} />
      </div>
      <IoMdSettings fill="white" size={35} />
    </div>
  )
}

const Editor: FC = () => {
  const editor = useRef()
  const startDoc = 'const hi = "Hello World"\nconsole.log(hi)\nconsole.log("Start Editing the code")'
  const [code, setCode] = useState<Text>()
  console.log('Nice code: ' + code)
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
        // hmmm
        EditorView.updateListener.of(function(e) { setCode(e.state.doc) })
      ]
    })
    const view = new EditorView({ state: start, parent: editor.current })
    return () => {
      view.destroy()
    }
  }, [])
  return (
    <div ref={editor} className='w-screen text-lg'></div>
  )
}

export default App
