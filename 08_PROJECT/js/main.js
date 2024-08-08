import { data } from './data.js';

function getArtistHeaderDetails(data) {
  const artistUnion = data?.artistUnion || {};
  const monthlyListeners = artistUnion.stats?.monthlyListeners || 0;
  const nameArtis = artistUnion?.profile?.name || '';
  const headerImg = artistUnion?.visuals?.headerImage?.sources?.[0]?.url || '';
  const verified = artistUnion.profile?.verified;
  return {
    monthlyListeners: monthlyListeners,
    nameArtis,
    headerImg,
    verified: verified ? 'Verified Artist' : 'Unverified Artist',
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
        type: release.type || '',
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

function convertToMinutes(ms) {
  const milliseconds = new Date(ms);
  const minutes = milliseconds.getMinutes();
  const seconds = milliseconds.getSeconds();
  const formatSeconds = ('0' + seconds).slice(-2);
  return `${minutes}:${formatSeconds}`;
}

function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.assign(element, attributes);
  return element;
}

function createButton(attributes = {}) {
  return createElement('button', attributes);
}

function renderPage() {
  const divMain = createElement('div', { className: 'main-container' });
  const divHeader = headerSection();
  const buttonsSection = buttonSection();
  const albumsSections = albumSection();

  divMain.append(divHeader, buttonsSection, albumsSections);
  document.body.appendChild(divMain);
}

function headerSection() {
  const artistHeaderDetails = getArtistHeaderDetails(data);
  const formatMonthlyListeners = artistHeaderDetails.monthlyListeners.toLocaleString();

  const imgHeader = createElement('img', {
    className: 'header__img',
    src: artistHeaderDetails.headerImg,
    alt: `${artistHeaderDetails.nameArtis} header image`,
  });
  const iconHeaderVerified = createElement('i', {
    className: 'header__icon fa-solid fa-certificate',
  });
  const spanHeaderVerified = createElement('span', {
    className: 'header__span-verified',
    textContent: artistHeaderDetails.verified,
  });
  const textArtistHeader = createElement('text', {
    className: 'header__text-artist',
    textContent: artistHeaderDetails.nameArtis,
  });
  const spanHeaderListeners = createElement('span', {
    className: 'header__span-listeners',
    textContent: `${formatMonthlyListeners} monthly listeners`,
  });

  const divHeaderVerified = createElement('div');
  divHeaderVerified.append(iconHeaderVerified, spanHeaderVerified);

  const divTextHeader = createElement('div', { className: 'header__div-text' });
  divTextHeader.append(divHeaderVerified, textArtistHeader, spanHeaderListeners);

  const divHeader = createElement('div', { className: 'header__div' });
  divHeader.append(imgHeader, divTextHeader);

  return divHeader;
}

function buttonSection() {
  const buttonSectionPlay = createButton({
    className: 'buttonSection__button buttonSection__button-play fa-solid fa-circle-play',
  });
  const buttonSectionFollow = createButton({
    className: 'buttonSection__button buttonSection__button-follow',
    textContent: 'Follow',
  });
  const buttonSectionElipsis = createButton({
    className: 'buttonSection__button buttonSection__button-more fa-solid fa-ellipsis',
  });

  const buttonSection = createElement('section', { className: 'buttonSection__section' });
  buttonSection.append(buttonSectionPlay, buttonSectionFollow, buttonSectionElipsis);

  return buttonSection;
}

function albumSection() {
  const imgAlbum = imgAlbumSection();
  const sectionAlbumSection = createElement('section', {
    className: 'albumSection__section',
  });
  sectionAlbumSection.appendChild(imgAlbum);

  return sectionAlbumSection;
}

function imgAlbumSection() {
  const albumDetails = getAlbumDetails(data);
  const divImgAlbumSection = createElement('div', { className: 'albumDetails__div-main' });

  albumDetails.forEach((album) => {
    const formatType = album.type.toLowerCase();
    const imgAlbum = createElement('img', {
      src: album.imgAlbum,
      className: 'albumDetails__img-album',
      alt: `${album.nameAlbum} album image`,
    });
    const albumName = createElement('p', {
      className: 'albumDetails__text-name',
      textContent: album.nameAlbum,
    });
    const albumTypeYearSong = createElement('p', {
      className: 'albumDetails__text-typeYearCount',
      textContent: `${formatType} • ${album.yearAlbum} • ${album.totalCount} songs `,
    });

    const albumButtonPlay = createButton({
      className: 'albumDetails__button albumDetails__button-play fa-solid fa-circle-play',
    });
    const albumButtonPlus = createButton({
      className: 'albumDetails__button albumDetails__button-plus fa-solid fa-circle-plus',
    });
    const albumButtonElipsis = createButton({
      className: 'albumDetails__button albumDetails__button-more fa-solid fa-ellipsis',
    });

    const albumButtonDiv = createElement('div', { className: 'albumDetails__div-buttons' });
    albumButtonDiv.append(albumButtonPlay, albumButtonPlus, albumButtonElipsis);

    const albumDetailsTextDiv = createElement('div', { className: 'albumDetails__div-text' });
    albumDetailsTextDiv.append(albumName, albumTypeYearSong, albumButtonDiv);

    const albumDetailsDiv = createElement('div', { className: 'albumDetails__div-section' });
    albumDetailsDiv.append(imgAlbum, albumDetailsTextDiv);

    const albumSongs = tableAlbumSection(album.songs);

    const albumDiv = createElement('div', { className: 'albumDetails__div' });
    albumDiv.append(albumDetailsDiv, albumSongs);

    divImgAlbumSection.appendChild(albumDiv);
  });

  return divImgAlbumSection;
}

function tableAlbumSection(albumSongs) {
  const songPositionTitle = createElement('i', {
    className: 'songs-title fa-regular fa-hashtag',
  });
  const songNameTitle = createElement('p', {
    className: 'songs-title',
    textContent: 'Title',
  });
  const songDurationTitle = createElement('i', {
    className: 'songs-title fa-regular fa-clock',
  });

  const divSongsTitle = createElement('div', { className: 'songs-grid__title' });
  divSongsTitle.append(songPositionTitle, songNameTitle, songDurationTitle);

  const divSongsAlbum = createElement('div', { className: 'songs-grid' });
  divSongsAlbum.appendChild(divSongsTitle);

  albumSongs.forEach((songs) => {
    const songPosition = createElement('p', {
      className: 'songs-grid__position',
      textContent: `${songs.songPosition}`,
    });
    const songName = createElement('p', {
      className: 'songs-grid__name',
      textContent: `${songs.songName}`,
    });
    const artistName = createElement('span', {
      className: 'songs-grid__artist',
      textContent: `${songs.artistName}`,
    });
    const songDuration = createElement('p', {
      className: 'songs-grid__duration',
      textContent: convertToMinutes(songs.songDuration),
    });

    const divSongNameArtist = createElement('div');
    divSongNameArtist.append(songName, artistName);

    const divSongs = createElement('div', { className: 'songs-grid__item' });
    divSongs.append(songPosition, divSongNameArtist, songDuration);

    divSongsAlbum.appendChild(divSongs);
  });

  return divSongsAlbum;
}

renderPage();
