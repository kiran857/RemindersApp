import './App.css';
import React, { useEffect } from "react";
import axios from "axios";
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';


function App() {
  const[reminderMsg,setRemindermsg]=useState("");
  const [reminderAt,setReminderAt]=useState();
  const[reminderList,setReminderList]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/getAllreminder").then(res=>setReminderList(res.data))
  },[])

  const addReminder= () =>{
   axios.post("http://localhost:5000/addReminder",{reminderMsg,reminderAt})
    .then(res => setReminderList(res.data))
    setRemindermsg("")
    setReminderAt("")

  }

  const deleteReminder=(id)=>{
    axios.post("http://localhost:5000/deleteReminder",{id})
    .then(res => setReminderList(res.data))
   

  }
  return (
    <div className="App">
    {console.log(reminderList)}
    <div className="homepage">
    <div className="homepage_header">
    <h1>Remind ME 🙋‍</h1>
    <input type="text"
    placeholder="Reminder note here..."
    value={reminderMsg}
    onChange={e=>setRemindermsg(e.target.value)}
    />
     <DateTimePicker
       value={reminderAt}
       onChange={setReminderAt}
       minDate={new Date()}
       minutePlaceholder="mm"
       hourPlaceholder="hh"
       dayPlaceholder="DD"
       monthPlaceholder="MM"
      yearPlaceholder="YYYY"
     />
     <div className="button" onClick={addReminder}>Add Reminder</div>
    </div>
    
    <div className="homepage_body">
    {reminderList.map(reminder =>(
      <div className="reminder_card" key={reminder._id}>
      <h2>{reminder.reminderMsg}</h2>
       <p>Reminder Me at:</p>
       <p>{String(new Date(reminder.reminderAt.toLocaleString(undefined,{timezone:"Asia/Pune"})))}</p>
      <div className="button" onClick={()=>deleteReminder(reminder._id)}>Delete</div>
      </div>
     ))}
    </div>
    </div>
    </div>
  );
}

export default App;
