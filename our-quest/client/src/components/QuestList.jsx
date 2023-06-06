function QuestList(props){

  function handleClick(){
      props.deletion(props.id)
  }

  return (
      <div className="note">
          <h1>Creator: {props.creator}</h1>
          <h1>Title: {props.title}</h1>
          <p>Content: {props.content}</p>
          <button onClick={handleClick}>Delete</button>
      </div>
  )
}

export default QuestList;