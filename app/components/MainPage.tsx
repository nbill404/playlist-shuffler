import SearchResults from "./SearchResults"

export default function MainPage() {
    return (
        <div className="p-5 flex flex-1 flex-nowrap bg-gray-700 items-center ">
          <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
              <div className="">
                <p>This is a website for advanced shuffling options for your playlists</p>
              </div>
              <div className="divider divider-primary"></div>
              <SearchResults/>
            </div>
          </div>


    )
}