class Listener {
  constructor(playlistSongService, mailSender) {
    this._playlistSongService = playlistSongService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const { owner, details } = await this._playlistSongService.getPlaylistSongs(playlistId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        owner,
        details,
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
