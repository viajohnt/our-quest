import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuestDetail() {
  const { id } = useParams(); // this gets the id from the URL
  const [quest, setQuest] = useState(null);

  useEffect(() => {
    fetch(`/quests/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setQuest(data);
      })
      .catch((error) => {
        console.error("Error fetching quest:", error);
      });
  }, [id]);

  if (!quest) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quest.title}</h1>

      <div>
        <h2>Comments</h2>
        {quest.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.user}: {comment.text}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Participants</h2>
        {quest.participants.map((participant, index) => (
          <div key={index}>
            <p>{participant.username}</p>
          </div>
        ))}
      </div>

      {/* And so on... */}
    </div>
  );
}

export default QuestDetail;
