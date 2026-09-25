import { useState, useEffect } from "react";
import { getPosts, getRandomUser } from "./api";
import PostCard from "./components/PostCard";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getPosts().then((posts) => setData(posts));
  }, []);

  useEffect(() => {
    getRandomUser().then((response) => {
      const randomUser = response?.results?.[0];
      if (randomUser) {
        setUser(randomUser);
      }
    });
  }, []);

  return (
    <div className="App">
      {user && (
        <UserCard
          name={`${user.name?.first || ""} ${user.name?.last || ""}`.trim() || "Sareen Kaur"}
          phone={user.phone || "+91 9183947212"}
          location={user.location?.city || "user address"}
        />
      )}

      {data.length ? (
        data.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default App;

