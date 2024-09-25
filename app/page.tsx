import PlaylistForm from "../components/playlist-form-component";
import PlaylistList from "../components/playlist-list-component";
import { ThemeToggle } from "../components/theme-toggle";

export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto p-8 pb-20 sm:p-20">
        <ThemeToggle />
        <main className="flex flex-col gap-8 items-center">
          <h1 className="text-3xl font-bold mb-8">AI Spotify Playlist Maker</h1>
          
          <PlaylistForm />
          
          <PlaylistList />
        </main>
      </div>
    </div>
  );
}
