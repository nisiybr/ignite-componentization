import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Header } from './Header';
import { MovieCard } from './MovieCard';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface ContentProps {
  selectedGenreId:number;
}

export function Content(props:ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [props.selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.selectedGenreId]);


  return (
    <div className="container">
    <Header 
      selectedGenre={selectedGenre}
    />       

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard 
          key={movie.Title}
          title={movie.Title} 
          poster={movie.Poster} 
          runtime={movie.Runtime} 
          rating={movie.Ratings[0].Value} 
        />
        ))}
      </div>
    </main>
    </div>
  )
}