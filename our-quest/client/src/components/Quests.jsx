import {useState, useEffect} from "react";
import axios from "axios";
import QuestList from "./QuestList"
import { Button } from '@mui/material'


function Quest() {
    const [isExpanded, setExpanded]= useState(false)
    const [rows, setRows]= useState(1)

    const [quests , setNewQuests] = useState(null)
    const [formQuest, setFormQuest] = useState({
      title: "",
      content: ""
    })

    useEffect(() => {
      getQuests()
        } ,[])

    function getQuests() {
      axios({
          method: "GET",
          url:"/quests/",
        }).then((response)=>{
          const data = response.data
          setNewQuests(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        })}

    function createQuest(event) {
        axios({
          method: "POST",
          url:"/quests/",
          data:{
            title: formQuest.title,
            content: formQuest.content
           }
        })
        .then((response) => {
          getQuests()
        })

        setFormQuest(({
          title: "",
          content: ""}))
        setExpanded(false)
        event.preventDefault()
    }

    function DeleteQuest(id) {
        axios({
          method: "DELETE",
          url:`/quests/${id}/`,
        })
        .then((response) => {
          getQuests()
        })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setFormQuest(prevQuest => ({
            ...prevQuest, [name]: value})
        )}

    function QuestShow(){
        setExpanded(true)
        setRows(3)
      }

  return (

     <div className=''>

        <form className="create-note">
          {isExpanded && <input onChange={handleChange} text={formQuest.title} name="title" placeholder="Title" value={formQuest.title} />}
          <textarea onClick={QuestShow} onChange={handleChange} name="content" placeholder="Make a quest..." rows={rows} value={formQuest.content} />
          {isExpanded && (<Button className="submit-button translate-x-[25rem] translate-y-[-1rem]" variant="contained" color="primary" onClick={createQuest}>+</Button>)}
        </form>

        { quests && quests.map(quest => 
        <QuestList
        key={quest.id}
        id={quest.id}
        title={quest.title}
        content={quest.content} 
        deletion ={DeleteQuest}
        />
        )}

    </div>

  );
}

export default Quest;