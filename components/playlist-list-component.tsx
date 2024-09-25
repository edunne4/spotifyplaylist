'use client';

import { useState, useEffect } from 'react';

type Genre = {
  name: string;
  percentage: number;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  image: string;
  spotifyUrl: string;
  genres: Genre[];
};

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    // TODO: Fetch playlists from API
    // For now, we'll use dummy data
    setPlaylists([
      {
        id: '1',
        name: 'Summer Vibes',
        description: 'Chill summer tunes',
        image: 'https://example.com/playlist1.jpg',
        spotifyUrl: 'https://open.spotify.com/playlist/123',
        genres: [
          { name: 'Pop', percentage: 60 },
          { name: 'Reggae', percentage: 40 },
        ],
      },
      {
        id: '2',
        name: 'Workout Mix',
        description: 'High-energy tracks for your workout',
        image: 'https://example.com/playlist2.jpg',
        spotifyUrl: 'https://open.spotify.com/playlist/456',
        genres: [
          { name: 'EDM', percentage: 70 },
          { name: 'Hip Hop', percentage: 30 },
        ],
      },
    ]);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Your Playlists</h2>
      <ul className="space-y-4">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
            <div className="flex items-start space-x-4 mb-4">
              <img src={playlist.image} alt={playlist.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{playlist.name}</h3>
                <p className="text-sm text-gray-400">{playlist.description}</p>
                <a
                  href={playlist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline text-sm mt-2 inline-block"
                >
                  Open in Spotify
                </a>
              </div>
            </div>
            {playlist.genres.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Genres:</p>
                <div className="flex flex-wrap gap-2">
                  {playlist.genres.map((genre, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-2 text-sm">
                      <span className="font-medium">{genre.name}</span>
                      <span className="ml-2 text-gray-400">{genre.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}