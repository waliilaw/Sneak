import React, { createContext, useContext, useState } from 'react';

interface RoomIdContextType {
    currentRoomId: string;
    setCurrentRoomId: (id: string) => void;
}

const RoomIdContext = createContext<RoomIdContextType | undefined>(undefined);

interface RoomIdProviderProps {
    children: React.ReactNode;
}

export const RoomIdProvider = ({ children }: RoomIdProviderProps) => {
    const [currentRoomId, setCurrentRoomId] = useState<string>('');

    return (
        <RoomIdContext.Provider value={{ currentRoomId, setCurrentRoomId }}>
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