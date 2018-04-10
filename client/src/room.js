import { setRoom } from './shared';

export default class Room {
  constructor() {
    if(window.location.hash) {
      let room = window.location.hash.slice(2);
      // window.history.pushState(null, null, this.id);
      this.id = room;
      setRoom(this.id);
    } else {
      fetch('http://localhost:3000/api/addRoom')
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