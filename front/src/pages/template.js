import React, { useState, useEffect } from 'react';
import { getArtists, createArtist, updateArtist, deleteArtist } from '../services/artistCrud';
import { getSongs } from '../services/songCrud';
import { getAlbum } from '../services/albumCrud';
import "../App.css";
import { Link } from 'react-router-dom';

const ArtistPage = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newArtist, setNewArtist] = useState({ artist_name: '', monthly_listeners: '', genre: '' });
  const [editArtist, setEditArtist] = useState(null);

  useEffect(() => {
    fetchArtists();
    fetchSongs();
    fetchAlbums();
  }, []);

  const fetchArtists = async () => {
    try {
      const data = await getArtists();
      setArtists(data);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const data = await getSongs();
      setSongs(data);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const data = await getAlbum();
      setAlbums(data);
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    }
  };

  const handleCreateArtist = async () => {
    try {
      const createdArtist = await createArtist(newArtist);
      setArtists([...artists, createdArtist]);
      setNewArtist({ artist_name: '', monthly_listeners: '', genre: '' });
    } catch (error) {
      console.error('Failed to create artist:', error);
    }
  };

  const handleUpdateArtist = async (id) => {
    try {
      if (!editArtist) return;
      const updatedArtist = await updateArtist(id, editArtist);
      setArtists(artists.map(artist => (artist.id === id ? updatedArtist : artist)));
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to update artist:', error);
    }
  };

  const handleDeleteArtist = async (id) => {
    try {
      await deleteArtist(id);
      setArtists(artists.filter(artist => artist.id !== id));
    } catch (error) {
      console.error('Failed to delete artist:', error);
    }
  };

  return (
    <div>
     <button 
        className="menu-button"
        onClick={toggleSidebar}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
          <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/client" onClick={toggleSidebar}>Client</Link></li>
          <li><Link to="/session" onClick={toggleSidebar}>Session</Link></li>
          <li><Link to="/therapist" onClick={toggleSidebar}>Therapist</Link></li>
        </ul>
      </div>

      <h1>TEMPLATE</h1>
      <div>
        <h2>Add a New Artist</h2>
        <input
          type="text"
          placeholder="Artist Name"
          value={newArtist.artist_name}
          onChange={(e) => setNewArtist({ ...newArtist, artist_name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monthly Listeners"
          value={newArtist.monthly_listeners}
          onChange={(e) => setNewArtist({ ...newArtist, monthly_listeners: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newArtist.genre}
          onChange={(e) => setNewArtist({ ...newArtist, genre: e.target.value })}
        />
        <button onClick={handleCreateArtist}>Add Artist</button>
      </div>
      <div>
        <h2>Artist List</h2>
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              {editArtist?.id === artist.id ? (
                <>
                  <input
                    type="text"
                    value={editArtist?.artist_name || ''}
                    onChange={(e) => setEditArtist({ ...editArtist, artist_name: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editArtist?.monthly_listeners || ''}
                    onChange={(e) => setEditArtist({ ...editArtist, monthly_listeners: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editArtist?.genre || ''}
                    onChange={(e) => setEditArtist({ ...editArtist, genre: e.target.value })}
                  />
                  <button onClick={() => handleUpdateArtist(artist.id)}>Save</button>
                  <button onClick={() => setEditArtist(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {artist.artist_name} ({artist.monthly_listeners} listeners) - {artist.genre}
                  <button onClick={() => handleDeleteArtist(artist.id)}>Delete</button>
                  <button onClick={() => setEditArtist({ ...artist })}>Edit</button>
                </>
              )}
              <h3>Songs</h3>
              <ul>
              {songs
                .filter(song => {
                const album = albums.find(album => album.id === song.album_id);
                return album && album.artist_id === artist.id;
              })
                .map(song => (
                <li key={song.id}>{song.song_name}</li>
               ))}
              </ul>
              <h3>Albums</h3>
              <ul>
                {albums.filter(album => album.artist_id === artist.id).map(album => (
                  <li key={album.id}>{album.album_name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistPage;
