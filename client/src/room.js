import { setRoom } from './shared';

export default class Room {
  constructor() {
    let room = location.href.slice(location.href.lastIndexOf('/') + 1);
    if(room.length == 6) {
      this.id = room;
      setRoom(this.id);
    } else {
      fetch('/api/addRoom')
      .then(res => res.json())
      .then(res => {
        this.id = res.roomid;
        window.history.pushState(null, null, this.id);
        setRoom(this.id);
      })
      .catch(err => console.log(err));
    }
  }

  getRoom() {
    return this.id;
  }
}