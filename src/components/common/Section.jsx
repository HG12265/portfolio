import React from 'react';
import { Container } from './Container';

export const Section = ({ id, className = '', children, containerClassName = '' }) => {
  return (
    <section 
      id={id} 
      className={`py-20 lg:py-28 relative overflow-hidden ${className}`}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};
