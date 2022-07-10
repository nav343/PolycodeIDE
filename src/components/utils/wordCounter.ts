import { Text } from "@codemirror/state"
import { EditorView, Panel } from "@codemirror/view"

function countWords(doc: Text) {
  let count = 0, iter = doc.iter()
  while (!iter.next().done) {
    let inWord = false
    for (let i = 0; i < iter.value.length; i++) {
      let word = /\w/.test(iter.value[i])
      if (word && !inWord) count++
      inWord = word
    }
  }
  return `Characters: ${count}`
}

export function wordCountPanel(view: EditorView): Panel {
  let dom = document.createElement("div")
  dom.classList.add('bg-gray-900', 'text-white', 'font-semibold', 'text-lg', 'pl-3', 'py-2')
  dom.textContent = countWords(view.state.doc)
  return {
    dom,
    update(update) {
      if (update.docChanged)
        dom.textContent = countWords(update.state.doc)
    }
  }
}


