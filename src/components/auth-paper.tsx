import { ReactNode } from 'react';

import STARS_BACKGROUND from '../assets/stars.svg';

import './auth-paper.style.css';

interface AuthPaperProps {
  children: ReactNode;
}


const AuthPaper = ({ children }: AuthPaperProps) => {
  return (
    <div className="auth-paper">
      <img src={STARS_BACKGROUND} alt="" className="stars" />
      {children}   
    </div>
  );
}

export default AuthPaper;