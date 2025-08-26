import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';

export const Portfolio = () => {
  return (
    <motion.div {...pageTransition} className="portfolio-container">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Portfolio</h1>
      </div>
      <div className="pdf-container">
        <iframe
          src="/portfolio.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
          title="Portfolio PDF"
          className="pdf-viewer"
        />
      </div>
    </motion.div>
  );
};
