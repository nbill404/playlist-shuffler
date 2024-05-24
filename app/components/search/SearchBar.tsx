import { Song } from "@/app/lib/song";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
    setQuery: Dispatch<SetStateAction<string>>
    setIsSearching: Dispatch<SetStateAction<boolean>>
    setIdSearch: Dispatch<SetStateAction<boolean>>
}

export default function SearchBar({setQuery, setIsSearching, setIdSearch} : Props) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query")

        if (query) {
            setQuery(query.toString());
            setIsSearching(true);
            setIdSearch(false);
        }
    }

    return (
        <form className="flex flex-row gap-3" onSubmit={handleSubmit}>
            <input className="input" name="query" type="text" placeholder="Search youtube"></input>
            <button className="btn btn-primary" type="submit">Search</button>
        </form>
    )

}