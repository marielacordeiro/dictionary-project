import axios from "axios";
import React, { useState } from "react";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
    let [keyword, setKeyword] = useState(props.defaultKeyword);
    let [results, setResults] = useState(null);
    let [loaded, setLoaded] = useState(false);
    let [photos, setPhotos] = useState(null);

    function handleDictionaryResponse (response) {
        setResults(response.data[0]);
    }
    
    function handlePexelsResponse(response) {
        setPhotos(response.data.photos);
    }

    function search() {
        // documentation: https://dictionaryapi.dev/
        let DictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
        axios.get(DictionaryApiUrl).then(handleDictionaryResponse);

        let pexelsApiKey = "563492ad6f9170000100000139446773701e4ceab5638f9eb36e4a1d";
        let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
        let headers = {Authorization : `Bearer ${pexelsApiKey}`};
        axios.get(pexelsApiUrl, {headers: headers}).then(handlePexelsResponse);
    }

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }
    
    function handleKeywordChange (event) {
        setKeyword(event.target.value);
    }

    function load() {
        setLoaded(true);
        search();
    }

    if (loaded) {
        return (
        <div className="Dictionary">
            <section>
            <h1>What word do you want to look up?</h1>
            <form onSubmit={handleSubmit}>
                <input type="search" autoFocus={true}
                 onChange={handleKeywordChange}
                 defaultValue={props.defaultKeyword}/>
            </form>
            <div className="hint">
                suggested words: sunrise, wine, yoga, plants...
            </div>
            </section>
            <Results results= {results}/>
            <Photos photos = {photos} />
        </div>
      );
    } else {
        load();
        return "Loading...";
    }
}