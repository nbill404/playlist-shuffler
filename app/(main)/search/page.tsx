import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import SearchContainer from "@/app/components/search/SearchContainer";

export default async function SearchPage() {
    const getPlaylists = async (userId: number | undefined) => {
      try {
          if (typeof userId === typeof undefined) {
              throw Error("User is not logged in")
          }

          const data = {
            userId: userId,
          }

          const response = await fetch(process.env.URL + '/api/playlist/getAll', 
          {
              method: 'POST',
              body: JSON.stringify(data)
          });

          if (response.ok) {
                const data = await response.json();

                let playlists = []

                for (const playlist of data.data) {
                    playlists.push(playlist)
                }

              return playlists;
          } else {
              console.log(response);
              return [];
          }

      } catch (error) {
          console.log(error);
          return [];
      }
  }

  const session = await getServerSession(authOptions);
  const userId: number | undefined = session?.user.id;
  const playlists = await getPlaylists(userId);

  return (
      <div className="m-3 p-5 bg-sky-950 rounded-md flex-1">
          <SearchContainer userId={userId}/>
      </div>
  )
}