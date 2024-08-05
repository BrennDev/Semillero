import { data } from './data.js';

function getArtistHeaderDetails(data) {
  const artistUnion = data?.artistUnion || {};
  const monthlyListeners = artistUnion.stats?.monthlyListeners || 0;
  const nameArtis = artistUnion?.profile?.name || '';
  const headerImg = artistUnion?.visuals?.headerImage?.sources?.[0]?.url || '';
  const verified = artistUnion.profile?.verified;
  return {
    monthlyListeners: monthlyListeners.toLocaleString(),
    nameArtis,
    headerImg,
    verified: verified ? 'Artist Verified' : 'Artist Not Verified',
  };
}

function getAlbumDetails(data) {
  const albums = data?.artistUnion?.discography?.albums.items || [];
  const albumDetails =
    albums.map((album) => {
      const release = album?.releases?.items?.[0] || {};
      return {
        imgAlbum: release.coverArt.sources?.[0]?.url || '',
        nameAlbum: release.name || '',
        yearAlbum: release.date?.year || '',
        totalCount: release.tracks?.totalCount || 0,
        songs: getSongsAlbum(album),
      };
    }) || [];
  return albumDetails;
}

function getSongsAlbum(album) {
  const songsAlbum = album?.releases?.items?.[0]?.tracks?.items || [];
  const songsDetails = songsAlbum.map((trackItem) => {
    const tracks = trackItem?.track || {};
    return {
      songPosition: tracks.trackNumber || '',
      songName: tracks.name || '',
      artistName: tracks.artists?.items?.[0]?.profile?.name || '',
      songDuration: tracks.duration?.totalMilliseconds || '0',
    };
  });

  return songsDetails;
}

function renderPage() {
  const divMain = document.createElement('div');
  divMain.className = 'main-container';

  const divHeader = headerSection();
  const buttonsSection = buttonSection();
  const albumsSections = albumSection();

  divMain.append(divHeader, buttonsSection, albumsSections);

  document.body.appendChild(divMain);
}

function headerSection() {
  const artistHeaderDetails = getArtistHeaderDetails(data);
  const divHeader = document.createElement('div');
  divHeader.className = 'header__div';

  const imgHeader = document.createElement('img');
  imgHeader.className = 'header__img';
  imgHeader.src = artistHeaderDetails.headerImg;

  const divTextHeader = document.createElement('div');
  divTextHeader.className = 'header__div-text';

  const spanHeaderVerified = document.createElement('span');
  spanHeaderVerified.className = 'header__span-verified';
  spanHeaderVerified.textContent = artistHeaderDetails.verified;

  const textArtistHeader = document.createElement('text');
  textArtistHeader.className = 'header__text';
  textArtistHeader.textContent = artistHeaderDetails.nameArtis;

  const spanHeaderListeners = document.createElement('span');
  spanHeaderListeners.className = 'header__span-listeners';
  spanHeaderListeners.textContent = `${artistHeaderDetails.monthlyListeners} monthly listeners`;

  divTextHeader.append(spanHeaderVerified, textArtistHeader, spanHeaderListeners);

  divHeader.append(imgHeader, divTextHeader);
  return divHeader;
}

function buttonSection() {
  const buttonSection = document.createElement('section');
  buttonSection.className = 'buttonSection__section';
  return buttonSection;
}

function albumSection() {
  const sectionAlbumSection = document.createElement('section');
  sectionAlbumSection.className = 'sectionAlbumSection__section';

  const imgAlbum = imgAlbumSection();

  sectionAlbumSection.append(imgAlbum);

  return sectionAlbumSection;
}

function imgAlbumSection() {
  const albumDetails = getAlbumDetails(data);
  const divImgAlbumSection = document.createElement('div');

  albumDetails.forEach((album) => {
    const albumDiv = document.createElement('div');

    const imgAlbum = document.createElement('img');
    imgAlbum.src = album.imgAlbum;

    const albumName = document.createElement('p');
    albumName.textContent = `Album: ${album.nameAlbum}`;

    const albumYear = document.createElement('p');
    albumYear.textContent = `Year: ${album.totalCount}`;

    const albumSongs = tableAlbumSection(album.songs);

    albumDiv.append(imgAlbum, albumName, albumYear, albumSongs);
    divImgAlbumSection.appendChild(albumDiv);
  });

  return divImgAlbumSection;
}

function tableAlbumSection(albumSongs) {
  const divSongsAlbum = document.createElement('div');
  divSongsAlbum.className = 'songs-grid';
  const divSongsTitle = document.createElement('div');
  divSongsTitle.className = 'songs-grid__item';

  const songPositionTitle = document.createElement('p');
  songPositionTitle.className = 'songs-grid__position';
  songPositionTitle.textContent = '#';

  const songNameTitle = document.createElement('p');
  songNameTitle.className = 'songs-grid__name';
  songNameTitle.textContent = 'Title';

  const songDurationTitle = document.createElement('p');
  songDurationTitle.className = 'songs-grid__artist';
  songDurationTitle.textContent = '1';

  divSongsTitle.append(songPositionTitle, songNameTitle, songDurationTitle);
  divSongsAlbum.append(divSongsTitle);

  albumSongs.forEach((songs) => {
    const divSongs = document.createElement('div');
    divSongs.className = 'songs-grid__item';

    const songPosition = document.createElement('p');
    songPosition.className = 'songs-grid__position';
    songPosition.textContent = `${songs.songPosition}`;

    const divSongNameArtist = document.createElement('div');

    const songName = document.createElement('p');
    songName.className = 'songs-grid__name';
    songName.textContent = `${songs.songName}`;

    const artistName = document.createElement('p');
    artistName.className = 'songs-grid__artist';
    artistName.textContent = `${songs.artistName}`;

    const songDuration = document.createElement('p');
    songDuration.className = 'songs-grid__duration';
    songDuration.textContent = `${songs.songDuration}`;

    divSongNameArtist.append(songName, artistName);
    divSongs.append(songPosition, divSongNameArtist, songDuration);
    divSongsAlbum.append(divSongs);
  });

  return divSongsAlbum;
}

renderPage();
