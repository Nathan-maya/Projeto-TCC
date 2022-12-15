import React from 'react';
import Header from '../../components/Header/Header';
import Highlights from '../../components/Highlights/Highlights';
import News from '../../components/News/News';
import Slider from '../../components/Slider/Slider';
import { Article } from './styleHome';

const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <Article>
        <News />
        <Highlights />
      </Article>

    </div>
  );
};

export default Home;
