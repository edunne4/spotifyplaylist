'use client';

import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { X } from 'lucide-react';

const MAX_GENRES = 5;

type Genre = {
  name: string;
  percentage: number;
};

export default function PlaylistForm() {
  const [prompt, setPrompt] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  const normalizePercentages = (updatedGenres: Genre[]): Genre[] => {
    const total = updatedGenres.reduce((sum, genre) => sum + genre.percentage, 0);
    return updatedGenres.map(genre => ({
      ...genre,
      percentage: Math.round((genre.percentage / total) * 100)
    }));
  };

  const handleAddGenre = () => {
    if (currentGenre && genres.length < MAX_GENRES) {
      const newPercentage = 100 / (genres.length + 1);
      const remainingPercentage = 100 - newPercentage;
      
      const newGenres = genres.map(genre => ({
        ...genre,
        percentage: (genre.percentage / 100) * remainingPercentage
      }));
      
      newGenres.push({ name: currentGenre, percentage: newPercentage });
      
      setGenres(normalizePercentages(newGenres));
      setCurrentGenre('');
    }
  };

  const handleRemoveGenre = (index: number) => {
    const newGenres = genres.filter((_, i) => i !== index);
    setGenres(normalizePercentages(newGenres));
  };

  const handleGenrePercentageChange = (index: number, value: number) => {
    const newGenres = [...genres];
    newGenres[index].percentage = value;
    setGenres(normalizePercentages(newGenres));
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
          disabled={genres.length >= MAX_GENRES}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Add Genre
        </Button>
      </div>
      {genres.map((genre, index) => (
        <div key={index} className="space-y-2 bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{genre.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveGenre(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </Button>
          </div>
          <div>
            <label htmlFor={`genre-${index}`} className="block mb-2">
              Percentage: {Math.round(genre.percentage)}%
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
      <Button 
        type="submit"
        className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400"
      >
        Generate Playlist
      </Button>
    </form>
  );
}