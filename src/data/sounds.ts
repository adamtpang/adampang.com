/**
 * Musical journey. One year per playlist, ten years deep.
 *
 * Each year is a Spotify playlist. The current year gets the embed
 * treatment in the hero of the Sounds section. The rest are gallery
 * cards that open in Spotify on click.
 *
 * To add a year: prepend a new entry. The year number drives the
 * gradient hue automatically (see Sounds.tsx).
 *
 * Pinterest visuals: leave `image` undefined for now. When you add
 * a mood board image per year, drop the file in /public/sounds/<year>.jpg
 * and set `image: '/sounds/<year>.jpg'`.
 */

export type SoundYear = {
  year: number;
  playlistId: string;
  spotifyUrl: string;
  /** Optional mood board image, /public-relative. */
  image?: string;
  /** Optional one-line vibe description. */
  vibe?: string;
};

export const sounds: SoundYear[] = [
  {
    year: 2025,
    playlistId: '37i9dQZEVXd3JaoMJtEGfX',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZEVXd3JaoMJtEGfX',
  },
  {
    year: 2024,
    playlistId: '37i9dQZF1FoP3p0S7SQHnv',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1FoP3p0S7SQHnv',
  },
  {
    year: 2023,
    playlistId: '37i9dQZF1Fan2BSqY5YLwb',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1Fan2BSqY5YLwb',
  },
  {
    year: 2022,
    playlistId: '37i9dQZF1F0sijgNaJdgit',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1F0sijgNaJdgit',
  },
  {
    year: 2021,
    playlistId: '37i9dQZF1EUMDoJuT8yJsl',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1EUMDoJuT8yJsl',
  },
  {
    year: 2020,
    playlistId: '37i9dQZF1ELXEoWFrHKG0P',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1ELXEoWFrHKG0P',
  },
  {
    year: 2019,
    playlistId: '37i9dQZF1EtrRp1uBtrqzT',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1EtrRp1uBtrqzT',
  },
  {
    year: 2018,
    playlistId: '37i9dQZF1EjdHXwWGjV9k1',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1EjdHXwWGjV9k1',
  },
  {
    year: 2017,
    playlistId: '37i9dQZF1E9X7qp06VxMIX',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1E9X7qp06VxMIX',
  },
];
