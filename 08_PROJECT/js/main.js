import { data } from './data.js';

function getMonthlyListeners(data) {
  const listeners = data?.artistUnion?.stats?.monthlyListeners || 0;
  return listeners.toLocaleString();
}

function getNameArtist(data) {
  const nameArtis = data?.artistUnion?.profile?.name || '';
  return nameArtis;
}

function getaheaderImg(data) {
  const headerImgUrl = data?.artistUnion?.visuals?.headerImage?.sources?.[0]?.url || '';
  return headerImgUrl;
}

function getAlbumDetails(data) {
  const albumDetails =
    data?.artistUnion?.discography?.albums.items?.map((album) => ({
      imgAlbum: album?.releases?.items?.[0]?.coverArt.sources?.[0]?.url || '',
      nameAlbum: album?.releases?.items?.[0]?.name || '',
      yearAlbum: album?.releases?.items?.[0]?.date?.year || '',
      totalCount: album?.releases?.items?.[0]?.tracks?.totalCount || 0,
      songs: getSongsAlbum(album),
    })) || [];
  return albumDetails;
}

function getSongsAlbum(album) {
  const songsAlbum = album?.releases?.items?.[0]?.tracks?.items || [];
  const songsDetails = songsAlbum.map((trackItem) => ({
    songPosition: trackItem?.track?.trackNumber || '',
    songName: trackItem?.track?.name || '',
    artistName: trackItem?.track?.artists?.items?.[0]?.profile?.name || '',
    songDuration: trackItem?.track?.duration?.totalMilliseconds || '0',
  }));

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
  const divHeader = document.createElement('div');
  divHeader.className = 'header__div';

  const imgHeader = document.createElement('img');
  imgHeader.className = 'header__img';
  imgHeader.src = getaheaderImg(data);

  const divTextHeader = document.createElement('div');
  divTextHeader.className = 'header__div-text';

  const spanHeaderVerified = document.createElement('span');
  spanHeaderVerified.className = 'header__span-verified';
  spanHeaderVerified.textContent = 'Verified Artist';

  const textArtistHeader = document.createElement('text');
  textArtistHeader.className = 'header__text';
  textArtistHeader.textContent = getNameArtist(data);

  const spanHeaderListeners = document.createElement('span');
  spanHeaderListeners.className = 'header__span-listeners';
  spanHeaderListeners.textContent = `${getMonthlyListeners(data)} monthly listeners`;

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

  albumSongs.forEach((songs) => {
    const divSongs = document.createElement('div');
    divSongs.className = 'songs-grid__item';

    const songPosition = document.createElement('p');
    songPosition.className = 'songs-grid__position';
    songPosition.textContent = `${songs.songPosition}`;

    const songName = document.createElement('p');
    songName.className = 'songs-grid__name';
    songName.textContent = `${songs.songName}`;

    const artistName = document.createElement('p');
    artistName.className = 'songs-grid__artist';
    artistName.textContent = `${songs.artistName}`;

    const songDuration = document.createElement('p');
    songDuration.className = 'songs-grid__duration';
    songDuration.textContent = `${songs.songDuration}`;

    divSongs.append(songPosition, songName, artistName, songDuration);
    divSongsAlbum.appendChild(divSongs);
  });

  return divSongsAlbum;
}

renderPage();
