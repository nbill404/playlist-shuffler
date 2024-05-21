'use client'
import { createContext, useEffect, useState } from "react";
import SearchResults from "./SearchResults"
import SearchBar from "./SearchBar";
import { Song } from "../../lib/song";
import { Playlist } from "@/app/lib/playlist";
import { convertJsonToPlaylistSingle } from "@/app/lib/convert";
import SearchIdBar from "./SearchIdBar";
import PageSelectButton from "./PageSelectButton";

interface Props {
    userId: number | undefined
}

export const SearchContext = createContext();

export default function SearchContainer({userId} : Props) {
    const [ results, setResults ] = useState<Song[][]>([]);
    const [ pageNum, setPageNum ] = useState<number>(0);
    const [ token, setToken ] = useState<string>("");

    const [ playlistId, setPlaylistsId] = useState<number | null>(1);
    const [ playlists, setPlaylists] = useState<Playlist[]>([]);
    
    const [ prevQuery, setPrevQuery ] = useState<string>("");
    const [ query, setQuery ] = useState<string>("")
    const [ isSearching, setIsSearching ] = useState<boolean>(false)

    // Get playlists for dropdown menu
    useEffect(() => {
        // Sub playlists
        const data = {
            userId: userId,
        }
        let url = ""

        if (typeof playlistId == "number") {
            Object.assign(data, {playlistId: playlistId});
            url = "/api/playlist/get"
        } else { // Root playlist
            Object.assign(data, {rank: 0});
            url = "/api/playlist/getRank";
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((json) => {
            let lists = []

            for (const item of convertJsonToPlaylistSingle(json.data).elements) {
                if (item instanceof Playlist) {
                    lists.push(item)
                }
            }

            setPlaylists(lists);
        })
        .catch(error => {
            console.log(error)
        })
    }, [playlistId, userId]);

    // Query search
    useEffect(() => {
        if (query.length > 0 && isSearching) {
            const data = {
                query: query,
                token: token
            };

            fetch("/api/search/list",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
            }).then((res) => res.json()
            ).then((json) => {
                const songList = json.results;

                if (prevQuery == query) {
                    const newResults = [...results].concat([songList]);
                    setResults(newResults);
                } else {
                    setResults([songList])
                    setPageNum(0);
                }

                setPrevQuery(query);
                setToken(json.token);
                setIsSearching(false);
            }).catch((error) => console.log(error))
        }
        }, [prevQuery, query, results, token, isSearching])


    useEffect(() => {
        if (results.length <= pageNum) {
            setIsSearching(true);
        }
    }, [pageNum, results])

    
    return (
        <SearchContext.Provider value={{userId, playlistId, playlists, setPlaylistsId}}>
            <div className="flex gap-2">
                <SearchBar setQuery={setQuery} setIsSearching={setIsSearching}/>
                <SearchIdBar setResults={setResults}/>
            </div>
            <SearchResults results={results[pageNum]}/>
            {results.length > 0 && 
                <div className="flex flex-1 gap-1 justify-end px-5">
                <PageSelectButton nextPage={false} pageNum={pageNum} setPageNum={setPageNum}/>
                <PageSelectButton nextPage={true} pageNum={pageNum} setPageNum={setPageNum}/>
                </div>
            }
        </SearchContext.Provider>
    )
}