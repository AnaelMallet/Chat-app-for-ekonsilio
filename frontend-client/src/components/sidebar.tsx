'use client'

import GeniusUserComponent from "@front-shared/src/components/geniusUser/geniusUserComponent"

import TextTitle from "./text"

function Sidebar() {
  return (
    <aside className="absolute inline w-[25rem] h-screen bg-[#282c34] text-white">
      <TextTitle />
      <div className="flex flex-col">
        <div className="justify-center place-items-center">
          <p className="text-3xl pb-1">- Mes conversations -</p>
          <div className="h-[40vh] w-full"></div>
        </div>
        <div className="justify-center place-items-center">
          <p className="text-3xl pb-1">- Contacts -</p>
          <GeniusUserComponent />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar