import { useState, useEffect } from 'react'

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        console.log('POST request successful');
      } else {
        console.error('POST request failed');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error during GET request:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>Enter your password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>

      {data && (
        <div>
          <h2>Data from GET request:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  )
}

export default App