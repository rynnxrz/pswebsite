import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MediaCoverage } from '@/data/germanierMediaCoverage';

export interface PanelState {
    id: string;
    article: MediaCoverage;
    zIndex: number;
}

interface SlidePanelContextType {
    panels: PanelState[];
    openPanel: (article: MediaCoverage) => void;
    closePanel: (id: string) => void;
    closeAllPanels: () => void;
    totalOffset: string | number; // Total offset for main content
    getPanelOffset: (index: number, total: number) => number; // Get dynamic offset for each panel
}

const SlidePanelContext = createContext<SlidePanelContextType | null>(null);

const PANEL_WIDTH = '40vw'; // Base panel width in percentage of screen
const TOTAL_STACK_SPACE = 120; // Fixed total space for stacked panel tabs
const MAX_PUSH_PANELS = 3; // Max panels that push content, additional panels stack on right

export const useSlidePanels = () => {
    const context = useContext(SlidePanelContext);
    if (!context) {
        throw new Error('useSlidePanels must be used within a SlidePanelProvider');
    }
    return context;
};

interface SlidePanelProviderProps {
    children: ReactNode;
}

export const SlidePanelProvider: React.FC<SlidePanelProviderProps> = ({ children }) => {
    const [panels, setPanels] = useState<PanelState[]>([]);

    const openPanel = useCallback((article: MediaCoverage) => {
        setPanels(prev => {
            // Check if panel already exists
            if (prev.some(p => p.id === article.id)) {
                return prev;
            }
            return [...prev, { id: article.id, article, zIndex: prev.length + 1 }];
        });
    }, []);

    const closePanel = useCallback((id: string) => {
        setPanels(prev => {
            const filtered = prev.filter(p => p.id !== id);
            // Re-assign z-indexes
            return filtered.map((p, idx) => ({ ...p, zIndex: idx + 1 }));
        });
    }, []);

    const closeAllPanels = useCallback(() => {
        setPanels([]);
    }, []);

    // Calculate dynamic offset for each panel based on total count
    // Total stack space is fixed, gap decreases as more panels open
    const getPanelOffset = useCallback((index: number, total: number) => {
        if (total <= 1) return 0;
        const gapPerPanel = TOTAL_STACK_SPACE / (total - 1);
        return (total - index - 1) * gapPerPanel;
    }, []);

    // Calculate total offset for main content (max 3 panels push)
    const panelsThatPush = Math.min(panels.length, MAX_PUSH_PANELS);
    const totalOffset = panelsThatPush > 0
        ? `calc(${PANEL_WIDTH} + ${TOTAL_STACK_SPACE}px)`
        : 0;

    return (
        <SlidePanelContext.Provider value={{ panels, openPanel, closePanel, closeAllPanels, totalOffset, getPanelOffset }}>
            {children}
        </SlidePanelContext.Provider>
    );
};

export { PANEL_WIDTH, TOTAL_STACK_SPACE };
