export interface topRated {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
}

export interface Popular {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
}
export interface upComing {
  id: string;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

export interface Genre {
  name: string;
}

export interface Production {
  name: string;
}

export interface MovieDetalis {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  tagline: string;
  genres: Genre[];
  release_date: string;
  vote_average: number;
  production_companies: Production[];
  overview: string;
  homepage: string;
  title?: string;
}
