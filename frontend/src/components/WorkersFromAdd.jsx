import React, { useState } from 'react'

export default function WorkersFrom() {
    const [workers, setWorkers] = useState({
        first_name:"",
        last_name: "",
        email: ""
    })
    function handleWorkers(e){
        setWorkers({
            ...workers,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        // Add logic to handle the form submission, e.g., sending data to the server
        console.log("Submitted:", workers);
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <label>
            First Name:
            <input type="text" name='first_name' value={workers.first_name} onChange={handleWorkers} />
        </label>
        <label>
            Last Name:
            <input type="text" name='last_name' value={workers.last_name} onChange={handleWorkers} />
        </label>
        <label>
            Email:
            <input type="text" name='email' value={workers.email} onChange={handleWorkers} />
        </label>
        <button type="submit">Add Worker</button>
    </form>
</div>
  )
}
