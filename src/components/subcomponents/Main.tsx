import React, { FC } from "react"
import Editor from "./Editor"

const Main: FC = () => {
  console.log(process.cwd())
  return (
    <div className="w-screen h-screen bg-[#282C34] flex flex-row">
      <Editor />
    </div>
  )
}

export default Main
