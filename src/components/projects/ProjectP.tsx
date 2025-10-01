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
            <h3>Insights #2</h3>
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
            <img src="/assets/images/ProjectP/design-solution-diagram.svg" alt="Design Solution Diagram" />
          </div>
          
        </div>

      </section>
      {/* --- END: Insights & Design Section --- */}


    </motion.div>
  );
  
};