import React, { useState, useEffect } from 'react';

const useGiphy = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=4C2zzft9XBIrQZnJANkQ5sCE1TIWaHZy&q=${query}&limit=10&offset=0&rating=g&lang=en`
        );
        const json = await response.json();

        setResults(
          json.data.map((item) => {
            return item.images.preview.mp4;
          })
        );
      } finally {
        setLoading(false);
      }
    };
    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return [results, loading];
};

const App = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useGiphy(query);

  return (
    <div>
      <h1>Async React Hooks</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          type="text"
          placeholder="search for gigs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </form>
      <br />
      {loading ? (
        <h1>Give a some Gifs please...</h1>
      ) : (
        results.map((item) => {
          return <video autoPlay loop key={item} src={item} />;
        })
      )}
    </div>
  );
};
export default App;
