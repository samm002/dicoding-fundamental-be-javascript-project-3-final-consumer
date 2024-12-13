const pool = require('../configs/database');
const mapPlaylistSongsData = require('../utils/mapper/playlist_songsMapper');

class PlaylistSongService {
  constructor() {
    this._pool = pool;
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT playlists.id AS "playlistId", playlists.name AS "playlistName",
        users.fullname AS "playlistOwner",
        songs.id AS "songId", songs.title AS "songTitle", songs.performer AS "songPerformer"
        FROM playlist_songs
        LEFT JOIN playlist_collaborators ON playlist_collaborators.playlist_id = playlist_songs.playlist_id
        LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
        LEFT JOIN users ON users.id = playlists.owner
        LEFT JOIN songs ON songs.id = playlist_songs.song_id
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const playlistSongs = {
      owner: result.rowCount > 0 ? result.rows[0].playlistOwner : null,
      details: result.rowCount > 0 ? mapPlaylistSongsData(result.rows) : result.rows,
    };

    return playlistSongs;
  }
}

module.exports = PlaylistSongService;
