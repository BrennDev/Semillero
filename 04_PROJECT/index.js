const album = {
  artist: "The Cranberries",
  songs: [
    { name: "1 Linger", duration: 274 },
    { name: "2 Ode To My Family", duration: 271 },
    { name: "3 Animal Instinct", duration: 211 },
    { name: "4 Zombie (Acoustic Version", duration: 241 },
    { name: "5 Dreams", duration: 271 },
    { name: "6 When You're Gone", duration: 232 },
    { name: "7 Just My Imagination", duration: 274 },
    { name: "8 Sunday", duration: 211 },
    { name: "9 I Can't Be With You", duration: 187 },
    { name: "10 Promises", duration: 327 },
  ],
};

function formatDurationSong(duration) {
  const minutes = parseInt(duration / 60);
  const seconds = duration % 60;
  return `${minutes}m ${seconds}s`;
}

const song = album.songs;
const songSorts = song.sort((a, b) => a.duration - b.duration);

songSorts.forEach((song) => {
  console.log(`${song.name}: ${formatDurationSong(song.duration)}`);
});

console.log(album);
