import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

// import { images } from '../../images';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Container,
  SlideContent,
  Title,
  slide,
  ContainerAviso,
  number,
  span,
  Loading,
  LinkStyled,
} from './styleSlide';
import { useDispatch } from 'react-redux';
import { findFirstImg } from '../../API/apiCalls';


const Slider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getImg() {
      setLoading(true);
      const res = await dispatch(findFirstImg);
      if (res.status === 200) {
        setLoading(false);
      }
      setImages(res.data);
    }
    getImg();
  }, [dispatch]);
  return (
    <Container>
      <ContainerAviso>
        <Title>SE VOCÊ TEM INFORMAÇÕES SOBRE PESSOAS DESAPARECIDAS</Title>
        <span style={span}>
          Ligue: <b style={number}>0800-2828-197</b>
        </span>
      </ContainerAviso>

      {loading && <Loading />}
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={6}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        style={slide}
        // breakpoints={{
        //   // when window width is >= 640px
        //   640: {
        //     width: 640,
        //     slidesPerView: 1,
        //   },
        //   // when window width is >= 768px
        //   768: {
        //     width: 768,
        //     slidesPerView: 2,
        //   },
        // }}
      >
        {images?.map(
          (image, index) => (
            (
              <SwiperSlide key={index}>
                <SlideContent>
                  <LinkStyled to={'missing/'+image[0]}>
                    <img src={image[1]} alt="foto de pessoa desaparecida" />
                  </LinkStyled>
                </SlideContent>
              </SwiperSlide>
            )
          ),
        )}
      </Swiper>
    </Container>
  );
};

export default Slider;
