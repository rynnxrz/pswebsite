import { useEffect } from 'react';
import { initCursor, disposeCursor, IpadCursorConfig } from 'ipad-cursor';

export const useIpadCursor = () => {
    useEffect(() => {
        const config: IpadCursorConfig = {
            enableAutoTextCursor: true,
            enableAutoUpdateCursor: true,
            blockPadding: 'auto', // Let the library calculate padding based on element size
            // You can add more custom styles here if needed
        };

        initCursor(config);

        return () => {
            disposeCursor();
        };
    }, []);
};
