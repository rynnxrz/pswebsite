// ProjectP.tsx

import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import './ProjectP.css';

export const ProjectP = () => {
  return (
    <motion.div {...pageTransition} className="project-detail">
      {/* --- Project Overview Section --- */}
      <section className="ip-overview-section">
        <div className="ip-overview-container">
          {/* --- START: MODIFIED BLOCK --- */}
          {/* We group the number and title together in a new div */}
          <div className="ip-overview-left">
            <div className="ip-overview-number">04</div>
            <div className="ip-overview-title-block">
              <h2 className="ip-overview-title">InnerPeace / <span>内在平静</span></h2>
              <p className="ip-overview-subtitle">Android Application</p>
            </div>
          </div>
          {/* --- END: MODIFIED BLOCK --- */}

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
      


{/* --- Research Journey Section --- */}
<section className="research-journey-section">
  <h2>Research Journey</h2>
  <div className="journey-diagram-container">
    {/* 关键改动：将两张图片放在同一个 wrapper div 中 */}
    <div className="journey-diagram-wrapper">
      <img 
        src="/assets/images/ProjectP/research-journey-left.png" 
        alt="Research Journey: Discover and Define phases" 
        className="journey-diamond-img"
      />
      <img 
        src="/assets/images/ProjectP/research-journey-right.png" 
        alt="Research Journey: Develop and Deliver phases"
        className="journey-diamond-img"
      />
    </div>
  </div>
</section>

{/* --- END: Research Journey Section --- */}

{/* --- START: The Issue Section --- */}
<section className="issue-section">
        <div className="issue-top-row">
          <div className="issue-title-graphic">
            <img src="/assets/images/ProjectP/the-issue-graphic.svg" alt="The Issue" />
          </div>
          <div className="issue-emotions-box">
            <h3>Students grapple with emotions like:</h3>
            <div className="emotions-grid">
              <div className="emotion-item">
                <img src="/assets/images/ProjectP/icon-anxiety.png" alt="Anxiety Icon" />
                <p>ANXIETY</p>
              </div>
              <div className="emotion-item">
                <img src="/assets/images/ProjectP/icon-overwhelm.png" alt="Overwhelm Icon" />
                <p>OVERWHELM</p>
              </div>
              <div className="emotion-item">
                <img src="/assets/images/ProjectP/icon-lost.png" alt="Lost Icon" />
                <p>LOST</p>
              </div>
            </div>
          </div>
        </div>

        <div className="issue-heaviness-box">
          <h4>In the midst of these feelings, students often grapple with...</h4>
          <h2>"A HEAVINESS WITHIN"</h2>
          <p>
            A concerning 23% of students have indicated significant depressive
            symptoms, nearly <strong>doubling</strong> for many demographics since 2012.
            Female students, Māori and Pasifika students, Asian students, those in
            lower-income communities, and those from sexual and gender
            minority groups have been particularly affected. Moreover, there's
            been a noted increase in <strong>suicide attempts</strong>, especially among males.
          </p>
          <p className="citation">
            -- University’s Faculty of Health, Dr Terry (Theresa) Fleming
          </p>
        </div>

        <div className="issue-research-method">
          <h3>Research Method</h3>
          {/* 这里我们复用之前 research-grid 的样式 */}
          <div className="research-grid">
            <div className="research-item">
              <img src="/assets/images/ProjectP/method-qualitative.svg" alt="Qualitative Research" />
              
            </div>
            <div className="research-item">
              <img src="/assets/images/ProjectP/method-expert.svg" alt="Expert Interview" />
              
            </div>
            <div className="research-item">
              <img src="/assets/images/ProjectP/method-market.svg" alt="Market Review" />
              
            </div>
          </div>
        </div>
      </section>
      {/* --- END: The Issue Section --- */}
      {/* --- START: Insights & Design Section --- */}
      <section className="insights-design-section">

        {/* --- 红框部分 --- */}
        <div className="insight-row-1">
          <div className="card-image-wrapper">
            <img src="/assets/images/ProjectP/insight-1-card.svg" alt="Insight #1: How can we create an affordable and accessible app for students?" />
          </div>
          <div className="connector-line horizontal"></div>
          <div className="card-image-wrapper">
            <img src="/assets/images/ProjectP/decision-card.svg" alt="Early Design Decision: Keep it simple, including older Android phones." />
          </div>
        </div>

{/* --- 绿框部分 (REVISED JSX V2 - Mobile First Order) --- */}
<div className="insight-row-2">
          
          {/* 模块1: Insights #2 卡片 */}
          <div className="insight-card text-card">
            <h3>Insights #1</h3>
            <p>Each Person's stress reason can be very, very different. How does InnerPeace handle that?</p>
          </div>
          
          {/* 模块2: 压力场景图片 */}
          <div className="stress-photos-grid">
            <div className="photo-item">
              <img src="/assets/images/ProjectP/stress-study.svg" alt="A student struggling with studying" />
              <p>STUDENT MAY STRUGGLE IN STUDY LIFE</p>
            </div>
            <div className="photo-item">
              <img src="/assets/images/ProjectP/stress-pollution.svg" alt="Plastic pollution on a beach" />
              <p>STUDENT MAY WORRYING POLLUTION AND SUSTAINBILITY</p>
            </div>
            <div className="photo-item">
              <img src="/assets/images/ProjectP/stress-lost.svg" alt="A person standing alone in the fog" />
              <p>STUDENT MAY JUST FEEL LOST SOMETIMES :(</p>
            </div>
          </div>

          {/* 模块3: Design #1 卡片 */}
          <div className="design-card text-card">
            <h4>Design #1</h4>
            <p>Provide variety way for student to try it out</p>
          </div>

          {/* 模块4: 设计方案大图 */}
          <div className="design-diagram">
            <img src="/assets/images/ProjectP/design-solution-diagram.png" alt="Design Solution Diagram" />
          </div>
          
        </div>

        {/* --- START: NEW SECTION (INSIGHTS #2) --- */}
        <div className="insight-row-3">
          {/* Item 1: Insights #2 Card */}
          <div className="insight-card text-card">
            <h3>Insights #2</h3>
            <p>Too many or aggressive notifications could add to a student's stress. How do we set the atmosphere calming and inviting?</p>
          </div>

          {/* Item 2: Notification Comparison Image */}
          <div className="design-diagram">
            <img src="/assets/images/ProjectP/notification-comparison.png" alt="Comparison of calming breathe app notifications versus aggressive stand up notifications" />
          </div>

          {/* Item 3: Design #2 Card */}
          <div className="design-card text-card">
            <h4>Design #2</h4>
            <p>Voluntary mood recording and data visualisation</p>
          </div>

          {/* Item 4: Meditation Features Image */}
          <div className="design-diagram">
            <img src="/assets/images/ProjectP/meditation-features.png" alt="Guided meditation screen with options for time, and a voluntary mood recording button" />
          </div>
        </div>
        {/* --- END: NEW SECTION (INSIGHTS #2) --- */}

      </section>
      {/* --- END: Insights & Design Section --- */}
      {/* --- START: NEW SECTION (ITERATION & ARCHITECTURE) --- */}
      <section className="final-stages-section">
        {/* --- Design Iteration Process --- */}
        <div className="design-iteration-container">
          <img 
            src="/assets/images/ProjectP/title-design-iteration.svg" 
            alt="Design Iteration Process"
            className="iteration-main-title"
          />
          <div className="iteration-flow">
            <div className="iteration-step">
              <img src="/assets/images/ProjectP/iter-1-brainstorm.png" alt="Early brainstorm sketches" />
              <p>EARLY BRAINSTORM</p>
            </div>
            <img src="/assets/images/ProjectP/arrow-right.svg" alt="arrow" className="flow-arrow" />
            <div className="iteration-step">
              <img src="/assets/images/ProjectP/iter-2-concept.png" alt="Late concept art received" />
              <p>LATE CONCEPT ART RECEIVED</p>
            </div>
            <img src="/assets/images/ProjectP/arrow-right.svg" alt="arrow" className="flow-arrow" />
            <div className="iteration-step">
              <img src="/assets/images/ProjectP/iter-3-summary.png" alt="Early stage of summary page" />
              <p>EARLY STAGE OF SUMMARY PAGE</p>
            </div>
            <img src="/assets/images/ProjectP/arrow-right.svg" alt="arrow" className="flow-arrow" />
            <div className="iteration-step">
              <img src="/assets/images/ProjectP/iter-4-final.png" alt="A easy use layout" />
              <p>A EASY USE LAYOUT</p>
            </div>
          </div>
        </div>

        {/* --- START: FINAL DESIGN SHOWCASE --- */}
        <div className="final-design-showcase">
          <h2 className="final-design-title">Final Design</h2>
          <div className="final-design-mockups">
            <img src="/assets/images/ProjectP/final-design-mood.gif" alt="InnerPeace final design: Mood Logging" className="mockup-gif" />
            <img src="/assets/images/ProjectP/final-design-activity.gif" alt="InnerPeace final design: Guided Meditation" className="mockup-gif" />
            <img src="/assets/images/ProjectP/final-design-summary.gif" alt="InnerPeace final design: Summary Dashboard" className="mockup-gif" />
          </div>
          <p className="final-design-caption">
            InnerPeace running on Google NEXUS 5(2014)
          </p>
        </div>
        {/* --- END: FINAL DESIGN SHOWCASE --- */}

        {/* --- System Architecture & Comments --- */}
        <div className="system-comments-grid">
          {/* Left Column */}
          <div className="system-architecture-col">
            <h3>System Architecture</h3>
            <img src="/assets/images/ProjectP/system-architecture.png" alt="System Architecture Diagram" />
          </div>

          {/* Right Column */}
          <div className="comments-col">
            <h3>Comments</h3>
            <img src="/assets/images/ProjectP/team-photo.png" alt="InnerPeace team receiving an award" className="team-photo"/>
            <div className="comment-text-block">
              <h4>The designs were confirmed by students and industry experts</h4>
              <p>
                "The capstone course is a lot about team work, collaboration and engaging with the client and your team did an exemplary job on all these fronts. It is therefore little wonder that you were the nominees for one of the award categories and that you won the <strong>People’s Choice Award</strong>. This is a truly well deserved win"
              </p>
              <p className="citation">-- Course Director, Dr. Asma Shakil</p>
            </div>
          </div>
        </div>
      </section>
      {/* --- END: NEW SECTION (ITERATION & ARCHITECTURE) --- */}
      


    </motion.div>
  );
  
};