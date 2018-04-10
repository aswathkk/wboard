import io from 'socket.io-client';

export const socket = io('http://localhost:3000');
export const canvas = document.getElementById('canv');

export let room = 'abcdef';

export function setRoom(roomName) {
  room = roomName;
}
