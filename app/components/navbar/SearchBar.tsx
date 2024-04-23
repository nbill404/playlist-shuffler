import { authenticate, loadClient, execute } from "../types/apigetter"

const YOUTUBE_SEARCH_API = "https://www.googleapis.com/youtube/v3/search"

export default function SearchBar() {

    const handleSearch = async (formData: FormData) => {
        'use server'

        try {
            const parameters = `part=snippet&maxResults=10&q=${formData.get("query")}`
            
            // Youtube API call
            const response = await fetch(`${YOUTUBE_SEARCH_API}?${parameters}&key=${process.env.YOUTUBE_API_KEY}`);

            if (response.ok) {
                // const data = await response.json();
                // const items = data.items;
                const songs: Song[] = []; 

                // Write testing data to file
                // var fs = require('fs');
                // fs.writeFile("test.json", JSON.stringify(items), function(err) {
                //     if (err) {
                //         console.log(err)
                //     }
                // });

                // for (const item of items) {
                //     // Filter shorts and channels
                //     if (item.id === 'youtube#video') {

                //     }
                // }
            }



        } catch (error) {
            console.log(error);
        }
    }



    return (
        <label className="input flex max-w-96">
            <form action={handleSearch}>
                <input name="query" type="text" placeholder="Search"></input>
                <button className="btn btn-sm" type="submit">Search</button>
            </form>
        </label>
    )

}