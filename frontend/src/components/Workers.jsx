import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  async function getWorkers() {
    try {
        const response = await fetch("http://localhost:3001/workers");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWorkers(data);
        console.log(workers)
    } catch (error) {
        console.error("Error fetching workers:", error);
        // Handle the error as needed, e.g., show an error message to the user
    }
}

  useEffect(() => {
    getWorkers()
  }, [])

  async function deleteWorker(id) {
    try {
        const response = await fetch(`http://localhost:3001/workers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers you need, e.g., authorization headers
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete worker. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // You can also update your state or UI based on the successful delete
    } catch (error) {
        console.error("Error deleting worker:", error);
        // Handle the error, e.g., show an error message to the user
    }
}
  return <div>
    <Link to="/worker/new">
      <h1>Add New Worker</h1>
    </Link>
        {workers && workers.map(worker => (
                <div key={worker._id}> {/* Add a key for each mapped element */}
                    <h2>{worker.first_name}</h2>
                    <h2>{worker.last_name}</h2>
                    <button onClick={() => deleteWorker(worker._id)}>Delete</button>
                    <Link to="/workers/update">
                      <button>Update</button>
                    </Link>
                </div>
            ))}

  </div>;
}
