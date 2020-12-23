import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState("")
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState([]);
  const [alert, setAlert] = useState(false);
  const [triggerNoms, setTriggerNoms] = useState(false);
  const [nomCount, setNomCount] = useState(0)

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    console.log(triggerNoms)
  },[triggerNoms])

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "x-rapidapi-key": "f22d87e263mshda1030a1eb5b874p19ecdbjsn8dcf7c84ab31",
      },
    };
    axios
      .get(`https://imdb8.p.rapidapi.com/title/find?q=${searchValue}`, config)
      .then((res) => {
        // console.log(res.data);
        setSearchResults(res.data.results);
        setLoading(false);
        setSearched(searchValue)
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
    setSearchValue("");
  };

  const handleMovieSelect = (movie) => {
    const i = nom.indexOf(movie)
    if(i !== -1) {
      let newArr = nom;
      newArr.splice(i, 1);
      setNom(newArr)
      setTriggerNoms(!triggerNoms);
      setNomCount(nomCount - 1)
    } else if(nom.length === 5) {
      setAlert(true);
    } else {
      setNom([
      ...nom,
      movie
    ]);
    setNomCount(nomCount + 1)
  }
  };

  const handleCancelAlert = () => setAlert(false);

  return (
    <div className={styles.outerCont}>
    {alert ? (
      <div className={styles.alert}>
      <header>
      <h3>Thank You!</h3>
      </header>
      <p>You've nominated your top five movies for The Shoppies. Remove a movie from your list if you'd like to add another.</p>
      <div>
      <button onClick={handleCancelAlert}>Okay</button>
      </div>
      </div>
      ) : (
        " "
        )}
        <div className={alert ? styles.darken : styles.container}>
      <div className={alert ? styles.darken : styles.top}>
      <Head>
        <title>Filmify Shoppies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1 className={styles.title}>
          <img src="/flogo.png" alt="filmify Logo" className={styles.logo} />
        </h1>
        <h2 className={styles.description}>
          The Shoppies
        </h2>
    </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.search}>
            <h3>Movie Title</h3>
            <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search movie titles"
              onChange={handleChange}
              value={searchValue}
            />
            <button disabled={loading || !searchValue} type="submit">{loading ? <Spinner size="sm" className={styles.spinner} /> : "Search"}</button>
          </form>
          </div>

          <div
            className={styles.card}
          >
            <h3>{searched ? `Results for "${searched}"` : "Results"} </h3>
            <div className={styles.results}>
            {searchResults.length > 0
              ? searchResults.map((movie) =>
                  movie.title ? (
                    <div key={movie.id + Math.random()} className={styles.movie}>
                        <h4>{movie.title}</h4>
                        {movie.image ? (
                          <img className={styles.poster} alt={movie.title} src={movie.image.url} />
                        ) : (
                          <img className={styles.poster} alt={movie.title} src="/no_poster.png" />
                        )}
                          <button disabled={nom.indexOf(movie) !== -1} onClick={() => handleMovieSelect(movie)}>
                            Nominate
                      </button>
                    </div>
                  ) : (
                    ""
                  )
                )
              : <p>Please search for a movie above</p>}
          </div>
          </div>

          <div
            className={styles.card}
          >
            <h3>Nominations{nom.length > 0 ? `(${nomCount})` : ""}</h3>
            <div className={styles.results}>
            {nom.length > 0 ? nom.map(movie => (
              movie.title ? (
                <div key={movie.id + Math.random()} className={styles.movie}>
                    <h4>{movie.title}</h4>
                    {movie.image ? (
                      <img className={styles.poster} alt={movie.title} src={movie.image.url} />
                    ) : (
                      <img className={styles.poster} alt={movie.title} src="/no_poster.png" />
                    )}
                      <button onClick={() => handleMovieSelect(movie)}>
                        Remove
                  </button>
                </div>
              ) : (
                ""
              )
            ))
          : <p>No movies nominated</p>}
          </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
          Brought to you by
        <a
          href="https://www.shopify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/logo.png" alt="shopify Logo" className={styles.logo2} />
        </a>
      </footer>
    </div>
    </div>
  )
}
