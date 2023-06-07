import React, { useEffect, useState } from "react";

function QuestList({ quest, deletion }) {
  const [topicData, setTopicData] = useState(null);

  const getTopic = (id) => {
    fetch(`/topics/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.name)
        setTopicData(data)
      });
  };

  useEffect(() => {
    getTopic(quest.topic);
  }, [quest.topic]);

  return (
    <div className="flex justify-center">
      <div className="quest mx-auto w-[36rem] rounded-lg bg-dark-purp text-cement p-4 mb-4 font-dm-sans font-bold">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full mr-4"
            src={quest.captain.profile_image}
            alt={quest.captain.username}
          />
          <h2 className="text-light-blue">Captain @{quest.captain}</h2>
        </div>
        <h2 className="mt-2 mb-4 text-white">{quest.title}</h2>
        <div className="flex space-x-2 mb-4">
          {quest.participants.slice(0, 3).map((participant, index) => (
            <img
              key={index}
              className="h-8 w-8 rounded-full"
              src={participant.profile_image}
              alt={participant.username}
            />
          ))}
          {quest.participants.length > 3 && (
            <span className="self-center">+{quest.participants.length - 3} more</span>
          )}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between items-end mt-4">
          <p>{quest.participants.length} Participants</p>
          <div className="rounded-full px-4 py-1 bg-purp text-sm">
            <p>Topic: {topicData ? topicData.name : "Loading..."}</p>
          </div>
        </div>
        <button onClick={() => deletion(quest.id)} className="mt-4">
          Delete Quest
        </button>
      </div>
    </div>
  );
}

export default QuestList;
