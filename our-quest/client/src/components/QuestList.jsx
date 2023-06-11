import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function QuestList({ quest, deletion }) {
  const [topicData, setTopicData] = useState(null)

  const getTopic = (id) => {
    fetch(`/topics/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setTopicData(data)
      })
  }

  useEffect(() => {
    getTopic(quest.topic)
  }, [quest.topic])

  return (
    <div className="flex justify-center">
      <div className="quest mx-auto w-[36rem] rounded-lg bg-dark-purp text-cement p-4 mb-4 font-dm-sans font-bold">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-4"
            src={quest.captain.profile.avatar}
            alt={quest.captain.username}
          />
          <h2 className="text-light-blue">Captain @{quest.captain.username}</h2>
        </div>
        <Link to={`/quest/${quest.id}`}>
          <h2 className="mt-2 mb-4 text-white hover:underline">{quest.title}</h2>
        </Link>
        <div className="flex space-x-2 mb-4">
          {quest.participants.slice(0, 3).map((participant, index) => (
            <img
              key={index}
              className="h-8 w-8 rounded-full"
              src={participant.profile.avatar}
              alt={participant.username}
            />
          ))}
          {quest.participants.length > 3 && (
            <span className="self-center">+{quest.participants.length - 3} more</span>
          )}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between items-end mt-4">
          <p>{quest.participants.length === 1 ? "1 Participant" : `${quest.participants.length} Participants`}</p>
          <div className="rounded-full px-4 py-1 bg-purp text-sm">
            <p>Topic: {topicData ? topicData.name : "Loading..."}</p>
          </div>
        </div>
        <button onClick={() => deletion(quest.id)} className="mt-4 hover:text-red-500">
          Delete
        </button>
      </div>
    </div>
  )
}

export default QuestList
