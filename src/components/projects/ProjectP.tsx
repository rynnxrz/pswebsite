import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import './ProjectP.css';

export const ProjectP = () => {
  return (
    <motion.div {...pageTransition} className="project-detail">
      {/* --- Project Overview Section --- */}
      <section className="ip-overview-section">
        <div className="ip-overview-container">
          <div className="ip-overview-number">04</div>
          <div className="ip-overview-title-block">
            <h2 className="ip-overview-title">InnerPeace / <span>内在平静</span></h2>
            <p className="ip-overview-subtitle">Android Application</p>
          </div>
          <div className="ip-overview-details-block">
            <div className="ip-overview-tags">
              Team Work, 3 Months, UX Developer
            </div>
            <p className="ip-overview-description">
              "InnerPeace" is a <strong>research-based</strong> mobile
              app that aims to help students lower stress
              and feel better using personalised activities
              and a logical, visually-appealing summary
              function. It fully supports <strong>academic
              database research</strong> to investigate valuable
              data for academic use.
            </p>
          </div>
        </div>
      </section>
      {/* --- END: Project Overview Section --- */}

      {/* Project Info Section */}
      <section className="project-info">
        <div className="info-item">
          <h3>ROLE</h3>
          <p>UX Developer</p>
        </div>
        <div className="info-item">
          <h3>TIME</h3>
          <p>6 Months Group Project</p>
        </div>
        <div className="info-item">
          <h3>PLATFORM</h3>
          <p>Android (Kotlin)</p>
        </div>
      </section>

      {/* Project Description */}
      <section className="project-description">
        <h2>Help students lower stress levels and feel better using easy and personalised activities, supported by a logical and visually-appealing summary function</h2>
      </section>

      {/* Research Section */}
      <section className="research-section">
        <h2>Learn from limited resources about how student study life and mental health are and what client cares</h2>
        <div className="research-grid">
          <div className="research-item">
            <img src="/images/project-p/research-1.jpg" alt="Qualitative Research" />
            <p>Qualitative Research: retrieve youth mental health investigation</p>
          </div>
          <div className="research-item">
            <img src="/images/project-p/research-2.jpg" alt="Expert Interview" />
            <p>Interview: Reached out and interviewed expert stakeholders</p>
          </div>
          <div className="research-item">
            <img src="/images/project-p/research-3.jpg" alt="Market Review" />
            <p>Market Review: learn about leading companies pro & cons</p>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="insights-section">
        <div className="insight-item">
          <h3>INSIGHTS #1</h3>
          <p>Students often face financial pressures, and the subscription costs of many mental health apps can be an additional burden they can't afford. How can we create an affordable and accessible app for students?</p>
          <div className="insight-solution">
            <p>"We adopted a lean design approach, focusing on core functionalities. Keep it simple, user-friendly, and compatible with a range of devices, even including older Android phones."</p>
          </div>
        </div>

        <div className="insight-item">
          <h3>INSIGHTS #2</h3>
          <p>Each Person's stress reason can be very different. How does InnerPeace handle that?</p>
          <div className="stress-scenarios">
            <img src="/images/project-p/stress-scenarios.jpg" alt="Different stress scenarios" />
          </div>
          <h3>Provide variety way for student to try it out</h3>
          <div className="solution-preview">
            <img src="/images/project-p/solution-preview.jpg" alt="Solution Preview" />
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="design-process">
        <h2>DESIGN #2</h2>
        <h3>Voluntary mood recording and data visualization</h3>
        <div className="process-images">
          <img src="/images/project-p/design-process.jpg" alt="Design Process" />
        </div>
      </section>

      {/* Final Design Section */}
      <section className="final-design">
        <h2>Final Design</h2>
        <div className="final-screens">
          <img src="/images/project-p/final-design.jpg" alt="Final Design Screens" />
        </div>
      </section>

      {/* Summary Section */}
      <section className="summary-section">
        <h2>In summary, I constructed it based on...</h2>
        <div className="summary-points">
          <div className="summary-point">
            <h3>Students's needs understanding</h3>
            <p>Understanding the diverse stress triggers for students, their financial pressures, and varying technical capabilities.</p>
          </div>
          <div className="summary-point">
            <h3>InnerPeace's technical resources</h3>
            <p>Utilizing the three-tier architecture, ensuring compatibility with old Android devices, and keeping the app lightweight yet functional.</p>
          </div>
          <div className="summary-point">
            <h3>InnerPeace's market positioning</h3>
            <p>Affordability + Accessibility</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};