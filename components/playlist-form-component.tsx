'use client';

import { useState, useRef, KeyboardEvent } from 'react';
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
  const genreInputRef = useRef<HTMLInputElement>(null);

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
      genreInputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGenre();
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

  const isSubmitDisabled = prompt.trim() === '' && genres.length === 0;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        type="text"
        placeholder="Enter your playlist prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="bg-background text-foreground border-input"
      />
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter a genre"
          value={currentGenre}
          onChange={(e) => setCurrentGenre(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={genreInputRef}
          className="bg-background text-foreground border-input"
        />
        <Button 
          type="button" 
          onClick={handleAddGenre} 
          disabled={genres.length >= MAX_GENRES || !currentGenre.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add Genre
        </Button>
      </div>
      <Button 
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isSubmitDisabled}
      >
        Generate Playlist
      </Button>
      {genres.map((genre, index) => (
        <div key={index} className="space-y-2 bg-card text-card-foreground p-4 rounded-lg border border-border">
          <div className="flex justify-between items-center">
            <span>{genre.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveGenre(index)}
              className="text-destructive hover:text-destructive/90"
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
              className="custom-slider"
            />
          </div>
        </div>
      ))}
    </form>
  );
}