import React, { createContext, useContext, useState } from 'react';

const RoomIdContext : any = createContext(undefined);

export const RoomIdProvider : any  = ({ children } : any ) => {
  const [roomId, setRoomId] = useState(undefined);

  return (
    <RoomIdContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </RoomIdContext.Provider>
  );
};

export const useRoomId = () => {
  const context = useContext(RoomIdContext);
  if (!context) {
    throw new Error('useRoomId must be used within a RoomIdProvider');
  }
  return context;
}; 