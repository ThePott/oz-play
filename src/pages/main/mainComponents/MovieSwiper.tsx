import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, IconButton } from '@mui/material';
import { useRef } from 'react';
import { Swiper as SwiperType } from "swiper";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { MovieCardInfo } from '../../../_interfaces/interfaces';
import MovieCardBig from './MovieCardBig';
import "./customSwiper.css";

const sxBase = {
  position: "absolute",
  zIndex: 10,
  top: "50%",
  transform: "translateY(-50%)",
  color: "oklch(1 0 0)",
}

const PrevButton = ({ swiperRef }: { swiperRef: React.RefObject<SwiperType | null> }) => {
  return (
    <IconButton aria-label="previous"
      sx={{ ...sxBase, left: 0 }}
      onClick={() => swiperRef.current?.slidePrev()}>

      <ArrowBackIosNewRoundedIcon />

    </IconButton>
  );
};

const NextButton = ({ swiperRef }: { swiperRef: React.RefObject<SwiperType | null> }) => {
  return (
    <IconButton aria-label="previous"
      sx={{ ...sxBase, right: 0 }}
      onClick={() => swiperRef.current?.slideNext()}>

      <ArrowForwardIosRoundedIcon />

    </IconButton>
  );
};

const MovieSwiper = ({ movieCardInfoArray }: { movieCardInfoArray: MovieCardInfo[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Box className='relative py-12'>
      <Swiper
        modules={[Navigation]}
        centeredSlides
        slidesPerView="auto"
        spaceBetween={100}
        centerInsufficientSlides
        pagination={{ clickable: true }}
        onSwiper={(swiper: any) => { swiperRef.current = swiper }}>

        {movieCardInfoArray.map((movieCardInfo, index) => (
          <SwiperSlide>
            <MovieCardBig key={index} movieCardInfo={movieCardInfo} />
          </SwiperSlide>
        ))}

      </Swiper>

      <PrevButton swiperRef={swiperRef} />
      <NextButton swiperRef={swiperRef} />
    </Box>
  );
};

export default MovieSwiper