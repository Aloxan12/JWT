import { localWs } from '../../../app/core/api/authApi';
import React, { MutableRefObject, useEffect } from 'react';
import { IMessageResponse } from '../ui/ChatPage';
import { IUser } from '../../../app/core/api/dto/UserDto';

export function useWsConnect(
  socket: MutableRefObject<WebSocket | null>,
  setConnected: (value: boolean) => void,
  setMessages: React.Dispatch<React.SetStateAction<IMessageResponse[]>>,
  user?: IUser | null
) {
  const message = {
    id: 1,
    event: 'connection',
    author: user,
    text: 'Подключился кто-то',
  };
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
      const message: IMessageResponse = JSON.parse(event.data);
      setMessages((prevState) => [...prevState, message]);
      console.log('Received message:', message);
    };
    // socket.current.onclose = (event) => {
    //   console.log('WebSocket connection closed', event);
    // };
    return () => {
      if (socket.current) {
        socket.current.close(); // Закрытие соединения
        console.log('WebSocket connection closed');
      }
    };
  }, []);
}
