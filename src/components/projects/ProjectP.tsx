// ProjectP.tsx
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import { Download, Copy, Expand } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNotification } from '../NotificationContext';
import './ProjectP.css';
import { WorkloadAnalysisGraph } from './WorkloadAnalysisGraph';


// Reusing the TooltipButton logic but keeping it local or it could be shared if refactored.
// For now, defining it here for simplicity as per instructions to modify this file.
const TooltipButton = ({ onClick, children, tooltipText, href, download, isMobile }: any) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => !isMobile && setTooltipVisible(true);
  const handleMouseLeave = () => setTooltipVisible(false);

  const commonProps = {
    className: 'action-btn',
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
  };

  return (
    <div className="tooltip-container">
      {href ? (
        <a href={href} download={download} {...commonProps} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <button {...commonProps}>{children}</button>
      )}
      {tooltipVisible && <span className="tooltip-text">{tooltipText}</span>}
    </div>
  );
};

export const ProjectP = () => {
  const { showNotification } = useNotification();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Section definitions for navigation
  const sections = [
    { id: 'intro', title: 'Intro' },
    { id: 'team', title: 'Team & My Role' },
    { id: 'scope', title: 'User Scope' },
    { id: 'rationale', title: 'Project Rationale' },
    { id: 'research', title: 'Research Findings' },
    { id: 'choices', title: 'Key Design Choices' },
    { id: 'excellence', title: 'Unique Excellence' },
    { id: 'reflection', title: 'Reflection' },
  ];

  // Gallery images for the stacked widget
  const galleryImages = [
    { id: 1, src: '/assets/images/ora-web/design-choices-placeholder.png', alt: 'Final Design' },
    { id: 2, src: '/assets/images/ora-web/stacked-card-1.png', alt: 'Wireframe' },
    { id: 3, src: '/assets/images/ora-web/stacked-card-2.png', alt: 'Initial Sketch' },
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0].src);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const toggleImageFullscreen = () => {
    const element = imageContainerRef.current;
    if (!element) return;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Fix: Use 0 threshold and adjusted margin to detect tall sections reliably
      // focusing on the top area of the screen
      { threshold: 0, rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showNotification('Successfully copied to clipboard', url);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const activeSectionTitle = sections.find(s => s.id === activeSection)?.title;

  return (
    <motion.div {...pageTransition} className="project-detail-container">
      <div className="project-content-wrapper">

        {/* Sticky Header */}
        <header className={`project-header ${isScrolled ? 'sticky-active' : ''}`}>
          <div className="project-header-text-container">
            {/* Default Title (Always visible initially, hidden when scrolled unless hovering header? 
                 Actually user wants: "stay on top". "Every project section title appearing there on scroll".
                 Let's interpret: 
                 - Not scrolled: Standard Title + Date
                 - Scrolled: "ORA Web" (small) + Active Section Title
             */}
            <div className={`header-main-info ${isScrolled && activeSection ? 'scrolled-mode' : ''}`}>
              <h1 className="project-title" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>ORA Web</h1>

              {!isScrolled ? (
                <p className="project-date">December 6th, 2025</p>
              ) : (
                <div className="section-navigator">
                  <span className="divider">/</span>
                  <span className="active-section-name">{activeSectionTitle || 'Intro'}</span>

                  {/* Dropdown Menu */}
                  <div className="section-dropdown">
                    {sections.map(section => (
                      <div
                        key={section.id}
                        className={`dropdown-item ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(section.id)}
                      >
                        {section.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="action-buttons-container">
            <TooltipButton onClick={handlePrint} tooltipText="Download PDF" isMobile={isMobile}>
              <Download size={16} />
            </TooltipButton>
            <TooltipButton onClick={handleCopyLink} tooltipText="Copy URL" isMobile={isMobile}>
              <Copy size={16} />
            </TooltipButton>
          </div>
        </header>

        {/* Intro */}
        <section id="intro" className="project-section">
          <h2>Intro</h2>
          <p>The project is defined as ORA Web, a small-scale software system for a contract manufacturing company, focusing on integrating contract production data management and efficiency.</p>
          <div className="section-image">
            <img src="/assets/images/ora-web/intro-placeholder.png" alt="ORA Web Introduction" />
          </div>
        </section>

        <hr className="section-divider" />

        {/* Team & My Role */}
        <section id="team" className="project-section">
          <h2>Team & My Role</h2>
          <p><strong>Client:</strong> Ora Nutrition Ltd (contract-manufacturing factory).</p>
          <ul>
            <li>Founded in 2019, scaled into one of the leading nutrition contract manufacturers in Auckland.</li>
            <li>Acquired in 2025 by a China-listed company.</li>
          </ul>
          <p>The factory has no in-house design team, so I operated as the sole designer embedded in cross-functional delivery.</p>

          <div className="section-image">
            <img src="/assets/images/ora-web/team-placeholder.png" alt="Team Structure" />
          </div>

          <p><strong>My Role:</strong> UX Designer (Solo)</p>
          <ul>
            <li>Led end-to-end UX for ORA Web, from problem framing to workflow design and system structure.</li>
            <li>Mapped contract-to-shipment processes and translated operational logic into scalable data and UI models.</li>
            <li>Facilitated alignment across Finance, Production Planning, Warehouse/Procurement, and Management.</li>
            <li>Worked closely with engineering to ensure feasibility and consistent status logic across views.</li>
          </ul>

          <p><strong>Project Duration</strong></p>
          <p>Case study scope: Jul 2023 – Aug 2024 · Ongoing</p>
        </section>

        <hr className="section-divider" />

        {/* User Scope */}
        <section id="scope" className="project-section">
          <h2>User Scope</h2>
          <p>This system spans three operational layers across the contract-to-production lifecycle:</p>
          <ul>
            <li><strong>Decision Makers:</strong> They read and consolidated data for timing, risk, and client decisions.</li>
            <li><strong>Shift/Planning Managers:</strong> They need accurate status and capacity signals to allocate work.</li>
            <li><strong>Operators/Executors:</strong> They need structured input and clear next-step prompts to keep data reliable.</li>
          </ul>
          <div className="section-image">
            <img src="/assets/images/ora-web/user-scope-placeholder.png" alt="User Scope Diagram" />
          </div>
        </section>

        <hr className="section-divider" />

        {/* Project Rationale */}
        <section id="rationale" className="project-section">
          <h2>Project Rationale: Enhancing Efficiency</h2>
          <blockquote className="project-quote">
            "The project aims to enhance efficiency by reducing time wastage caused by fragmented data and manual reconciliation across the contract-to-shipment lifecycle. This directly translates to cost savings, addressing the high labor costs prevalent in the New Zealand context by freeing up high-value managers from repetitive 'Excel checking' tasks".
          </blockquote>
          <div className="section-image">
            <img src="/assets/images/ora-web/rationale-placeholder.png" alt="Efficiency Rationale" />
          </div>
        </section>

        <hr className="section-divider" />

        {/* Research Approach and Findings */}
        <section id="research" className="project-section">
          <h2>Research Approach and Findings</h2>

          <h3>Research Approach and Key Findings</h3>
          <p>Instead of jumping straight into generic interviews, I started with quantitative analysis of how the shared Excel file was actually used. By logging user operations, I found that around <strong>54%</strong> of actions were pure data input and <strong>37%</strong> were just formatting changes—often used as ad-hoc reminders or unit conversions.</p>

          <p><strong>Key insights from the research:</strong></p>
          <ul>
            <li>A large portion of effort was spent on low-value work rather than decision-making.</li>
            <li>The Excel file was already being “hacked” into a makeshift status/reminder system, not just a static spreadsheet.</li>
          </ul>

          <WorkloadAnalysisGraph />

          {/* <div className="section-image">
            <img src="/assets/images/ora-web/research-placeholder.png" alt="Research Findings" />
          </div> */}

          <h3>Transitioning from Data Analysis to Qualitative Interviews</h3>
          <p>With that big-picture signal, I then moved into qualitative interviews to understand the “why” behind these behaviors. In conversations, users described:</p>
          <ul>
            <li>Constantly switching between different documents to keep track of what was “actually happening”.</li>
            <li>Relying on manual formatting tweaks (colors, merged cells, comments) to remember statuses and deadlines.</li>
            <li>The mental load and error risk of repeatedly entering and re-entering similar information.</li>
          </ul>

          <h3>Design Opportunities</h3>
          <p>The real issue wasn’t “Excel is messy”; it was that Excel was being forced to act as a workflow and reminder system without any real support for status tracking or connected data.</p>
        </section>

        <hr className="section-divider" />

        {/* Key Design Choices */}
        <section id="choices" className="project-section">
          <h2>Key Design Choices: Workflow & Interaction</h2>

          <h3>Turning scattered files into a single, navigable workflow</h3>
          <p>In the previous setup, staff had to jump between multiple Excel files and tabs to find the right contract or understand its latest status. Based on those interviews, I reframed the UI around a single contract workspace with:</p>
          <ul>
            <li>A sidebar listing contracts as the main entry point.</li>
            <li>Status filters (e.g. To be entered, Entered, Pending payment) to quickly narrow down what needs attention.</li>
          </ul>
          <p>This directly answered a core pain point: too much time was spent just finding the right file. By integrating navigation and status filtering in one place, the system turns a fragmented experience into a clear, linear workflow where users can:</p>
          <ol>
            <li>Locate the contract.</li>
            <li>See its current stage.</li>
            <li>Take the next action without switching documents.</li>
          </ol>



          <div className="section-image">
            <img src="/assets/images/ora-web/design-choices-placeholder.png" alt="Design Choices - Workflow" />
          </div>

          <h3>Designing import & manual input for today, while preparing for tomorrow</h3>
          <p>Many key fields in the current operation—such as signing date, deposit date, packaging material storage and production-related data—still rely on manual input. Instead of ignoring this reality, I designed a set of structured dialogs for entering contract, product and financial details.</p>
          <p>On top of this, I introduced an <strong>Auto-Contract Import</strong> flow that allows users to pull base information from existing contract files, and then complete or correct the details in the dialogs. This strikes a balance:</p>
          <ul>
            <li><strong>Immediate value:</strong> Reduced repetitive typing and fewer copy–paste errors for contracts that already exist in file form.</li>
            <li><strong>Future readiness:</strong> The dialog structure is intentionally designed so that, later on, we can plug in Excel/PDF parsing and compare “manual vs. automated” data in the same UI without redesigning the entire flow.</li>
          </ul>
          <p>In other words, the design accepts that today is still partially manual, but the workflow and information architecture are already shaped for a more automated future.</p>

          <h3>Unified Status Updates & `updateContractStatus` (Design #4 & Develop)</h3>
          <p>One major operational pain point was that contract status lived in multiple places. When a contract stage changed, different sheets and views had to be manually updated, and they often fell out of sync.</p>
          <p>In the new design, I simplified this into a single source of truth for status:</p>
          <ul>
            <li><strong>On the UI side:</strong> Users update the contract’s status once, from a unified control that is visible wherever the contract appears.</li>
            <li><strong>On the engineering side:</strong> I collaborated with the developer to implement a shared `updateContractStatus` function that propagates this change across all relevant views and data tables.</li>
          </ul>
          <p>By explicitly connecting the interaction pattern with the underlying function, I wanted to show that I understand not only what the UI should do, but also how it needs to behave technically for status to stay consistent across the system.</p>

          <p><strong>In short: these design choices focus on three things:</strong></p>
          <ol>
            <li>Reduce document switching by integrating navigation and status.</li>
            <li>Respect the current manual reality while paving a clear path to automation.</li>
            <li>Ensure that a single status update reliably reflects everywhere in the system—demonstrating both workflow thinking and an ability to collaborate closely with engineering.</li>
          </ol>

          {/* Interactive Stacked Image Gallery */}
          <div ref={imageContainerRef} className="section-image gallery-container">
            <img src={activeImage} alt="Design Process" className="gallery-main-image" key={activeImage} />

            {/* Expand Button (shows on hover) */}
            <button className="expand-image-button" onClick={toggleImageFullscreen} title="Expand image">
              <Expand size={16} />
            </button>

            {/* Stacked Cards Widget */}
            <div className="stacked-gallery-widget">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="gallery-thumbnail"
                  style={{
                    zIndex: galleryImages.length - index,
                    transform: `rotate(${[-5, 0, 5][index % 3]}deg)`,
                  }}
                  onClick={() => setActiveImage(image.src)}
                >
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* The Unique Excellence */}
        <section id="excellence" className="project-section">
          <h2>The Unique Excellence: Dashboard and Business Impact</h2>

          <h3>From data to decisions: Internal Exception Radar & Process Lead Time</h3>
          <p>To take this project’s design solution integrate in user’s daily workflow, I extended the solution into an internal decision-support dashboard. Instead of repeating raw tables, the dashboard focuses on where time is lost and where processes break.</p>

          <ul>
            <li><strong>The Internal Exception Radar (P1-A)</strong> aggregates contract data and flags three key risk types: lead-time breach, payment blocked and material risk.</li>
            <li><strong>The Key Contracts Stage Overview (P1-B)</strong> then shows which specific contracts are affected and at which internal stage they are stuck. In our analysis, for example, around 68% of delays were linked to material readiness and 45% to production exceeding internal targets, giving management a clear view of the main bottlenecks without digging through spreadsheets.</li>
            <li><strong>The Process Lead Time view (P2)</strong> visualises how long contracts spend in each stage, and whether we are meeting or exceeding our own SLA targets.</li>
          </ul>

          <div className="section-image">
            <img src="/assets/images/ora-web/unique-excellence-placeholder.png" alt="Dashboard Excellence" />
          </div>

          <p>What differentiates this dashboard is that it does not try to show everything. It deliberately moves away from raw, dense data and focuses on:</p>
          <ul>
            <li>Where we are losing time</li>
            <li>Which processes are failing</li>
            <li>Which contracts are impacted and need attention</li>
          </ul>
          <p>This makes it useful for decision-makers who need immediate, actionable signals, not just a static report.</p>

          <h3>Working with the “messy reality” of stakeholder feedback</h3>
          <p>When I first shared the dashboard prototype, it was intentionally simple: a few focused widgets and a clear story about bottlenecks. That early version quickly triggered a wave of stakeholder responses, such as:</p>
          <ul>
            <li>Requests for discrepancy alerts between planned vs. actual timelines.</li>
            <li>Interest in trend analysis over time, not just a snapshot.</li>
            <li>Comments like: “This data would help me a lot when I talk to our clients.”</li>
          </ul>
          <p>I chose to include this “messy middle” in my case study because it shows what actually happens after a first design goes live: priorities shift, new expectations surface, and the scope grows.</p>
          <p>Instead of treating this as a failure of planning, I used it as a chance to:</p>
          <ul>
            <li>Re-prioritize features with stakeholders.</li>
            <li>Clarify which insights are “must-have now” vs. “good to have later”.</li>
            <li>Refine the dashboard so it could support both internal operations and client-facing conversations.</li>
          </ul>
          <p>This part of the story demonstrates my ability to work through ambiguity, respond to evolving needs, and keep the design grounded in what the business really cares about.</p>
        </section>

        <hr className="section-divider" />

        {/* Reflection */}
        <section id="reflection" className="project-section">
          <h2>Reflection: Using the Kano Model</h2>
          <p>In my reflection, I used the <strong>Kano model</strong> to make sense of the different types of dashboard features:</p>
          <ul>
            <li><strong>Basic expectations:</strong> E.g. being able to see contract status and lead time without digging through spreadsheets.</li>
            <li><strong>Performance features:</strong> Clearer bottleneck visualization that directly improves planning and internal coordination.</li>
            <li><strong>Delighters:</strong> For example, exception alerts and narrative views that help managers explain issues to clients.</li>
          </ul>

          <div className="section-image">
            <img src="/assets/images/ora-web/reflection-placeholder.png" alt="Kano Model Reflection" />
          </div>

          <p>By mapping stakeholder requests and existing widgets onto the Kano model, I could:</p>
          <ul>
            <li>Distinguish between “must not fail” basics and “high-impact” improvements.</li>
            <li>Avoid overloading the dashboard with nice-to-have charts that don’t change decisions.</li>
            <li>Show that I’m not only designing UI, but also prioritizing features systematically.</li>
          </ul>
          <p>Including this reflection is my way of demonstrating a growth mindset: I’m willing to learn, borrow tools from product/strategy (like Kano), and use them to make more grounded design choices.</p>
        </section>

      </div >
    </motion.div >
  );
};
