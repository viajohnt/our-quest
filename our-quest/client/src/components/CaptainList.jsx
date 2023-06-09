import React from 'react'

function CaptainList({ captains, followCaptain }) {
  return (
    <div className="rounded-md w-[17rem] mt-[6.4rem] translate-x-[-5rem]">
      <div className="bg-dark-purp p-4 text-xl text-white mb-2 rounded-md">
        Top Captains
      </div>
      <div className="p-4 text-cement bg-dark-purp rounded-md">
        {captains.slice(0, 7).map(({ id, username, profile: { avatar } }) => (
          <div key={id} className="flex items-center justify-between mt-8">
            <div>
              <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
              <p className="text-sky-blue">@{username}</p>
            </div>
            <button className="rounded-lg bg-light-purp text-cement py-1 px-2 ml-2 hover:bg-blue-500 w-20">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaptainList
