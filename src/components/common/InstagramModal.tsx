import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect } from 'react';

interface InstagramModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const InstagramModal = ({ open, onOpenChange }: InstagramModalProps) => {
    useEffect(() => {
        // Load Instagram embed script when modal opens
        if (open && typeof window !== 'undefined') {
            // Check if script already exists
            if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
                const script = document.createElement('script');
                script.src = '//www.instagram.com/embed.js';
                script.async = true;
                document.body.appendChild(script);
            } else {
                // If script already loaded, process embeds
                if ((window as any).instgrm) {
                    (window as any).instgrm.Embeds.process();
                }
            }
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Ivy J Studio</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-center p-4">
                    <blockquote
                        className="instagram-media"
                        data-instgrm-permalink="https://www.instagram.com/ivyjstudio/"
                        data-instgrm-version="14"
                        style={{
                            background: '#FFF',
                            border: '0',
                            borderRadius: '3px',
                            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                            margin: '1px',
                            maxWidth: '540px',
                            minWidth: '326px',
                            padding: '0',
                            width: 'calc(100% - 2px)',
                        }}
                    >
                        <div style={{ padding: '16px' }}>
                            <a
                                href="https://www.instagram.com/ivyjstudio/"
                                style={{
                                    background: '#FFFFFF',
                                    lineHeight: '0',
                                    padding: '0 0',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    width: '100%',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View this profile on Instagram
                            </a>
                        </div>
                    </blockquote>
                </div>
            </DialogContent>
        </Dialog>
    );
};
