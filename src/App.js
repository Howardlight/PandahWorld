import React, { useState } from 'react';

import './App.scss';

import MainCanvas from './MainCanvas/MainCanvas';
import Header from './Header/Header';
import Footer from "./Footer/Footer";
import SlideBar from "./Menu/SlideBar";


function App() {
  
  const [isVisible, setIsVisible] = useState(true);
  const [isCircle, setIsCircle] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [textureType, setTextureType] = useState(0);
  // TODO: Figure out Context, so that you don't have to pass states
  // from 1 component to the other,
  // ALERT: THIS WILL GET MESSY

  const ChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleShape = () => {
    setIsCircle(!isCircle);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleTextureChange = (index) => {
    setTextureType(index);
  }

  return (
    <>
      <Header toggleMenu={toggleMenu}/> 

      <SlideBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} setTexture={handleTextureChange} textureType={textureType} />

      <Footer
      
      // handles/toggles if shape is visible
      toggleVisibility={ChangeVisibility} 
      isVisible={isVisible}
      
      // toggles the shape from circle to Cube
      toggleShape={toggleShape} 
      shape={isCircle}
      />

      <MainCanvas 
      isVisible={isVisible} 
      isCircle={isCircle}
      textureType={textureType}
      />

    </>
  );
}

export default App;
