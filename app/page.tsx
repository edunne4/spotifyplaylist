import PlaylistForm from "../components/playlist-form-component";
import PlaylistList from "../components/playlist-list-component";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-background text-foreground">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-bold mb-8">AI Spotify Playlist Maker</h1>
        
        <PlaylistForm />
        
        <PlaylistList />
      </main>
    </div>
  );
}
