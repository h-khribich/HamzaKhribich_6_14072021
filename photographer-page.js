const params = (new URL(window.location)).searchParams;

const id = params.get('id');

// fetch
/*
const artists = [{
  id: 12,
},{
  id: 62,
}];

const id = 62;

const artist = artists.find((el) => el.id === id);
*/