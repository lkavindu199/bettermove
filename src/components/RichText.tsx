'use client';

import { Block } from 'payload/types';
import { useEffect } from 'react';

type Props = {
  content: any; // Change this to the proper type if you know it
  className?: string;
};

export const RichText: React.FC<Props> = ({ content, className }) => {
  useEffect(() => {
  }, []);
  
  console.log('RichText content:', content);

  if (!content) return null;

  // Handle Lexical editor format (root with children)
  if (content.root) {
    return (
      <div className={className}>
        {content.root.children.map((node: any, i: number) => {
          switch (node.type) {
            case 'paragraph':
              return (
                <p
                  key={i}
                  className="wow fadeInUp"
                  data-wow-delay={`${0.2 * i}s`}
                >
                  {node.children?.[0]?.text || ''}
                </p>
              );
            case 'heading':
              return (
                <h2 
                  key={i} 
                  className="wow fadeInUp" 
                  data-wow-delay={`${0.2 * i}s`}
                >
                  {node.children?.[0]?.text || ''}
                </h2>
              );
            // Add other cases as needed
            default:
              return null;
          }
        })}
      </div>
    );
  }

  // Handle legacy block format
  return (
    <div className={className}>
      {Array.isArray(content) ? content.map((block, i) => {
        switch (block.blockType) {
          case 'paragraph':
            return (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: block.text }}
                className="wow fadeInUp"
                data-wow-delay={`${0.2 * i}s`}
              />            
            );
          case 'heading':
            return (
              <h2 
                key={i} 
                className="wow fadeInUp" 
                data-wow-delay={`${0.2 * i}s`}
              >
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul 
                key={i} 
                className="wow fadeInUp" 
                data-wow-delay={`${0.2 * i}s`}
              >
                {block.items.map((item: string, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote 
                key={i} 
                className="wow fadeInUp" 
                data-wow-delay={`${0.2 * i}s`}
              >
                <p>{block.text}</p>
              </blockquote>
            );
          default:
            return null;
        }
      }) : null}
    </div>
  );
};