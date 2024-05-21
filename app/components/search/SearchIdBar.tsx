import { Song } from "@/app/lib/song";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
    setResults: Dispatch<SetStateAction<Song[][]>>
    setIdSearch: Dispatch<SetStateAction<boolean>>
}


export default function SearchIdBar({setResults, setIdSearch}: Props) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = {id: formData.get("query")};

            const response = await fetch("/api/search/id",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
            })

            if (response.ok) {
                const data = await response.json();
                const songList = [data.results];

                setResults(songList);
                setIdSearch(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="flex flex-row gap-3" onSubmit={handleSubmit}>
            <input className="input" name="query" type="text" placeholder="Search by id"></input>
            <button className="btn btn-primary" type="submit">Search</button>
        </form>
    )

}