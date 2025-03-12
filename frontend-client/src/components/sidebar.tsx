'use client'

import GeniusUserComponent from "@front-shared/src/components/geniusUser/geniusUserComponent"

import TextTitle from "./text"

function Sidebar() {
  return (
    <div className="absolute inline w-[25rem] h-screen bg-[#282c34] text-white">
      <TextTitle/>
      <div className="grid grid-cols-1 gap-y-64">
        <div className="flex place-items-center justify-center space-x-10 mt-5">
          <p className="text-3xl pb-1">- Mes conversations -</p>
        </div>
        <div className="grid grid-cols-1 space-y-4">
            <p className="flex justify-center text-3xl">- Les genius disponible -</p>
            <GeniusUserComponent />
        </div>
      </div>
    </div>
  )
}

export default Sidebar