import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&display=swap');
          body {
            font-family: 'Georgia', serif;
            background-color: #000;
            color: #fff;
          }
        `}
      </style>
      <div className="font-georgia">
        {/* Spline Background */}
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <iframe
            src='https://my.spline.design/squarechipsfallinginplace-XUxIx6Wh1dEsh2AXPWqJnVxb/'
            frameBorder='0'
            width='100%'
            height='100%'
            loading="lazy"
            title="3D Background Animation"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Main content, scrolls over the background */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}