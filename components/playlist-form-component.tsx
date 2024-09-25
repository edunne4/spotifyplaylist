'use client';

import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { X } from 'lucide-react';

type Genre = {
  name: string;
  percentage: number;
};

export default function PlaylistForm() {
  const [prompt, setPrompt] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleAddGenre = () => {
    if (currentGenre && genres.length < 5) {
      setGenres([...genres, { name: currentGenre, percentage: 20 }]);
      setCurrentGenre('');
    }
  };

  const handleRemoveGenre = (index: number) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleGenrePercentageChange = (index: number, value: number) => {
    const newGenres = [...genres];
    newGenres[index].percentage = value;
    setGenres(newGenres);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating playlist with:', { prompt, genres });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        type="text"
        placeholder="Enter your playlist prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
        className="bg-gray-800 text-white border-gray-700"
      />
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a genre"
          value={currentGenre}
          onChange={(e) => setCurrentGenre(e.target.value)}
          className="bg-gray-800 text-white border-gray-700"
        />
        <Button 
          type="button" 
          onClick={handleAddGenre} 
          disabled={genres.length >= 5}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Add Genre
        </Button>
      </div>
      <Button 
        type="submit"
        className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400"
      >
        Generate Playlist
      </Button>
      {genres.map((genre, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span>{genre.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveGenre(index)}
            >
              <X size={16} />
            </Button>
          </div>
          <div>
            <label htmlFor={`genre-${index}`} className="block mb-2">
              Percentage: {genre.percentage}%
            </label>
            <Slider
              id={`genre-${index}`}
              min={1}
              max={100}
              step={1}
              value={[genre.percentage]}
              onValueChange={(value) => handleGenrePercentageChange(index, value[0])}
              className="bg-gray-800"
            />
          </div>
        </div>
      ))}
    </form>
  );
}