import { useEffect, useState } from "react";

import { getMemes } from "../api/memes";

import MemeList from "../components/MemeList";

import MemeGenerator from "../components/MemeGenerator";

function Home() {
  const [memes, setMemes] = useState([]);

  const [selectedMeme, setSelectedMeme] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadMemes();
  }, []);

  const loadMemes = async () => {
    try {
      setLoading(true);

      const data = await getMemes();

      setMemes(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load memes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (selectedMeme) {
    return (
      <MemeGenerator
        meme={selectedMeme}
        onBack={() =>
          setSelectedMeme(null)
        }
      />
    );
  }

  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <span className="badge">
            🔥 Popular Templates
          </span>

          <h1>
            Create Memes
            <br />
            <span>That Make People Laugh</span>
          </h1>

          <p>
            Choose your favorite meme
            template, add your text,
            and download your meme.
          </p>

          <a
            href="#templates"
            className="hero-btn"
          >
            Start Creating
          </a>

        </div>

      </section>

      {loading && (
        <div className="loading">
          Loading meme templates...
        </div>
      )}

      {error && (
        <div className="error">
          {error}

          <button
            onClick={loadMemes}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <MemeList
          memes={memes}
          onSelect={setSelectedMeme}
        />
      )}

    </main>
  );
}

export default Home;