import  { useState } from 'react';
import { GithubUser } from './GithubUser'; // Adjust the path based on your project structure

export function GithubUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return; // Don't search if the input is empty
    }

    setLoading(true);

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error('Error searching users:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search GitHub users:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <GithubUser username={user.login} />
          </li>
        ))}
      </ul>
    </div>
  );
}
