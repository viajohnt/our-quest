function ParticipantsList({ participants }) {
  return (
    <div className="participants-list">
      <h2>Participants</h2>
      {participants.map((participant, index) => (
        <div key={index} className="participant">
          <img
            className="h-8 w-8 rounded-full mr-4"
            src={participant.profile.avatar}
            alt={participant.username}
          />
          <p>{participant.username}</p>
        </div>
      ))}
    </div>
  );
}
  
export default ParticipantsList