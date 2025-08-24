import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { pageTransition } from '../../utils/animations';
import './ProjectDialogic.css';

type DialogicState = 'intro' | 'demo' | 'experience';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ProjectDialogic = () => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addChatMessage = (type: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
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
          <div className="coordinates">X: 0.0, Y: 0.0, Z: 0.0</div>
        </div>
        
        {/* 3D Visualization Container */}
        <div className="visualization-container">
          <div id="three-container" className="three-container">
            <div className="placeholder-3d">
              <div className="placeholder-text">3D Spatial Memory Interface</div>
              <div className="placeholder-subtext">Coming in next phase</div>
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
    </motion.div>
  );
};
