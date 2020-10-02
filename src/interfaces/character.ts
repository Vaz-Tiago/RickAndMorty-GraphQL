import { Episode } from './episode';

export interface CharacterList {
  id: number;
  name: string;
  status: string;
  image: string;
}

export interface CharacterDetails {
  id: number;
  name: string;
  image: string;
  episode: Episode[];
}
