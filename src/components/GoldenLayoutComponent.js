// src/components/GoldenLayoutComponent.js
import React, { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';
import "golden-layout/dist/css/goldenlayout-base.css";
import "golden-layout/dist/css/themes/goldenlayout-dark-theme.css";


// import Page1 from './Page1';
// import Page2 from './Page2';

const GoldenLayoutComponent = ({ config }) => {
  const layoutRef = useRef(null);

  useEffect(() => {
    if (layoutRef.current) {
      const myLayout = new GoldenLayout(config, layoutRef.current);

    //   myLayout.registerComponent('page1', Page1);
    //   myLayout.registerComponent('page2', Page2);

      myLayout.init();
    }
  }, [config]);

  return <div ref={layoutRef} style={{ height: '100vh', width: '100vw' }} />;
};

export default GoldenLayoutComponent;
