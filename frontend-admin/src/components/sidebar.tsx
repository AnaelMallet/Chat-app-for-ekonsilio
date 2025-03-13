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
    // <div className="absolute inline w-[25rem] h-screen bg-[#282c34] text-white">
    //   <TextTitle/>
    //   <div className="flex place-items-center space-x-10 ml-4 mt-5">
    //     <div className="flex place-items-center justify-center space-x-10 mt-5">
    //       <p className="text-3xl pb-1">- Mes conversations -</p>
    //     </div>
    //     <div className="flex place-items-center justify-center">
    //       <div className="w-4/5 border-2">
    //         <p className="flex justify-center text-3xl pb-1 mb-5">- Contacts -</p>
    //         <GeniusUserComponent />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Sidebar