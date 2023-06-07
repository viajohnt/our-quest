import React from 'react';
import Quests from './Quests';
import QuestList from './QuestList';


export default function Home(){
    return(
        <div className="bg-gray-500 min-h-screen flex  justify-center">
            <h1 className="font-dm-sans">WELCOME TO OUR QUEST</h1>
            <QuestList />
        </div>
    )
}
