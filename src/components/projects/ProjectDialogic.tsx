import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { pageTransition } from '../../utils/animations';
import { useTranslation } from 'react-i18next';
import './ProjectDialogic.css';
import { ProjectRecommendation } from '../common/ProjectRecommendation/ProjectRecommendation';

type DialogicState = 'intro' | 'demo' | 'experience';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Node3D {
  id: string;
  x: number;
  y: number;
  z: number;
  type: 'user' | 'assistant';
  content: string;
}

interface Connection3D {
  id: string;
  fromId: string;
  toId: string;
  from: Node3D;
  to: Node3D;
}

export const ProjectDialogic = () => {
  const { t } = useTranslation();
  const [currentState, setCurrentState] = useState<DialogicState>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m here to help you explore the Dialogic Framework. This is a demonstration of how AI conversations can be preserved in 3D spatial memory.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  // 3D state
  const [nodes, setNodes] = useState<Node3D[]>([]);
  const [connections, setConnections] = useState<Connection3D[]>([]);
  const [currentCoordinates, setCurrentCoordinates] = useState({ x: 0, y: 0, z: 0 });
  const unitPx = 60; // scale 1.0 unit to pixels
  const recommendedProjects = [
    {
      id: 'ivy-j-studio',
      title: t('recommendations.projects.ivy-j-studio.title'),
      description: t('recommendations.projects.ivy-j-studio.description'),
      image: '/assets/images/ivy-j/project-card.webp'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize first 3D node from the initial assistant message
  useEffect(() => {
    if (messages.length > 0 && nodes.length === 0) {
      const first = messages[0];
      add3DNode(0.5, 0, 0, first.type, first.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const connectNodes = (from: Node3D, to: Node3D) => {
    const id = `${from.id}->${to.id}`;
    const connection: Connection3D = { id, fromId: from.id, toId: to.id, from, to };
    setConnections(prev => [...prev, connection]);
  };

  const add3DNode = (
    x: number,
    y: number,
    z: number,
    type: 'user' | 'assistant',
    content: string
  ) => {
    const node: Node3D = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      x,
      y,
      z,
      type,
      content
    };

    setNodes(prev => {
      const next = [...prev, node];
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        connectNodes(last, node);
      }
      return next;
    });

    setCurrentCoordinates({ x, y, z });
  };

  const addChatMessage = (type: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    // Basic sync to 3D: map participants to X, increment Y a bit per message, keep Z at 0 for now
    const x = type === 'user' ? 0 : 0.5;
    const y = nodes.length * 0.4; // simple progression to visualize spacing
    const z = 0;
    add3DNode(x, y, z, type, content);
  };

  const handleWatchDemo = () => {
    setCurrentState('demo');
  };

  const handleSkipToExperience = () => {
    setCurrentState('experience');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const message = input.value.trim();
    
    if (message) {
      addChatMessage('user', message);
      input.value = '';
      
      // Simulate AI response
      setTimeout(() => {
        addChatMessage('assistant', 'This is a demonstration of the Dialogic Framework. In the real implementation, this conversation would be preserved in 3D spatial memory, allowing you to navigate through the evolution of ideas.');
      }, 1000);
    }
  };

  const renderIntro = () => (
    <motion.div
      className="dialogic-intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="dialogic-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Dialogic Framework
      </motion.h1>
      
      <motion.h2 
        className="dialogic-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Rethinking Memory and Authenticity in the Age of AI
      </motion.h2>

      <motion.div 
        className="statement-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="statement-box problem-box">
          <h3>The Problem</h3>
          <p>
            Current AI systems use destructive editing, overwriting previous versions 
            and losing the rich context of iterative development. This creates a 
            "black box" where the evolution of ideas becomes invisible.
          </p>
        </div>
        
        <div className="statement-box solution-box">
          <h3>The Solution</h3>
          <p>
            A 3D spatial memory system that preserves every iteration, creating 
            a navigable landscape of ideas where users can explore the full 
            journey of creative development.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <button 
          className="btn btn-primary"
          onClick={handleWatchDemo}
        >
          Watch Demo (2 min)
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleSkipToExperience}
        >
          Skip to Experience
        </button>
      </motion.div>
    </motion.div>
  );

  const renderSplitScreen = () => (
    <motion.div
      className="dialogic-split-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Side - ChatGPT UI Clone */}
      <div className="chatgpt-side">
        {/* Header */}
        <div className="chatgpt-header">
          <h2>ChatGPT</h2>
        </div>
        
        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="avatar">
                {message.type === 'user' ? 'U' : 'AI'}
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="input-area">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Message ChatGPT..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Dialogic Framework */}
      <div className="dialogic-side">
        {/* Header */}
        <div className="dialogic-header">
          <h2>Dialogic Framework</h2>
          <div className="coordinates">X: {currentCoordinates.x.toFixed(1)} | Y: {currentCoordinates.y.toFixed(1)} | Z: {currentCoordinates.z.toFixed(1)}</div>
        </div>
        
        {/* 3D Visualization Container */}
        <div className="visualization-container">
          <div id="three-container" className="three-container" ref={threeContainerRef}>
            <div className="space-3d">
              {/* 3D Nodes */}
              {nodes.map(node => (
                <div
                  key={node.id}
                  className={`node-3d ${node.type}`}
                  style={{
                    transform: `translate3d(${node.x * unitPx}px, ${node.y * unitPx}px, ${node.z * unitPx}px)`
                  }}
                  title={node.content}
                >
                  <div className="node-label">{node.type === 'user' ? 'U' : 'AI'}</div>
                </div>
              ))}

              {/* Connection Lines */}
              {connections.map(link => {
                const fromX = link.from.x * unitPx;
                const fromY = link.from.y * unitPx;
                const fromZ = link.from.z * unitPx;
                const toX = link.to.x * unitPx;
                const toY = link.to.y * unitPx;
                const toZ = link.to.z * unitPx;

                const dx = toX - fromX;
                const dy = toY - fromY;
                const dz = toZ - fromZ;
                const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const yaw = Math.atan2(dz, dx) * (180 / Math.PI);
                const pitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz)) * (180 / Math.PI);

                return (
                  <div
                    key={link.id}
                    className="connection-line"
                    style={{
                      width: `${len}px`,
                      transform: `translate3d(${fromX}px, ${fromY}px, ${fromZ}px) rotateY(${yaw}deg) rotateX(${pitch}deg)`,
                      transformOrigin: '0 50%'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="control-buttons">
          <button className="control-btn">Rotate View</button>
          <button className="control-btn">Zoom</button>
          <button className="control-btn">Show Branches</button>
        </div>
      </div>
    </motion.div>
  );

  const renderDemo = () => renderSplitScreen();
  const renderExperience = () => renderSplitScreen();

  return (
    <motion.div {...pageTransition} className="project-dialogic">
      {currentState === 'intro' && renderIntro()}
      {currentState === 'demo' && renderDemo()}
      {currentState === 'experience' && renderExperience()}
      <div className="project-recommendation-shell">
        <ProjectRecommendation projects={recommendedProjects} />
      </div>
    </motion.div>
  );
};
