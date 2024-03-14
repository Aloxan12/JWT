import { localWs } from '../../../app/core/api/authApi';
import React, { MutableRefObject, useEffect } from 'react';
import { IMessage } from '../ui/ChatPage';

const message = {
  id: 1,
  event: 'connection',
  username: 'alex',
  text: '1 est',
};

export function useWsConnect(
  socket: MutableRefObject<WebSocket | null>,
  setConnected: (value: boolean) => void,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
) {
  useEffect(() => {
    socket.current = new WebSocket(localWs);
    socket.current.onopen = () => {
      setConnected(true);
      socket.current?.send(JSON.stringify(message));
      console.log('WebSocket connection opened');
    };
    socket.current.onmessage = (event) => {
      const data = event.data;
      console.log('data ==>', data);
      const message: IMessage = JSON.parse(event.data);
      setMessages((prevState) => [...prevState, message]);
      console.log('Received message:', message);
    };
    socket.current.onclose = (event) => {
      console.log('WebSocket connection closed', event);
    };
  }, []);
}
