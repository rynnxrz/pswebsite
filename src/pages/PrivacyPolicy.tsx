import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import './PrivacyPolicy.css'; // We will create this simple CSS file or use inline styles

const PrivacyPolicy: React.FC = () => {
    // Hardcoded text for now as it is a legal requirement, translation can come later if needed
    // or we can just key it. For now, English is standard for Facebook verification.

    return (
        <motion.div {...pageTransition} className="privacy-policy-container">
            <div className="privacy-content">
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to Ivy J Portfolio ("we," "our," or "us"). We are committed to protecting your privacy.
                    This Privacy Policy explains how we handle data when you visit our website.
                </p>

                <h2>2. Data Collection</h2>
                <p>
                    We do not collect, store, or share any personal data from our visitors.
                    Our website is a personal portfolio intended to showcase design and development work.
                </p>

                <h2>3. Instagram Data</h2>
                <p>
                    This website uses the Instagram Basic Display API to display images from our own Instagram account (@ivyjstudio).
                    We do not collect or process any data from users who view these images.
                    The data displayed is public information fetched directly from Instagram's servers via the API.
                </p>

                <h2>4. Cookies</h2>
                <p>
                    We do not use cookies for tracking or advertising purposes.
                    Local storage may be used solely for preserving your theme preference (Light/Dark mode) or language settings.
                </p>

                <h2>5. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at: <br />
                    <strong>Email:</strong> rongze.work@gmail.com
                </p>

                <div style={{ height: '4rem' }} />
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
