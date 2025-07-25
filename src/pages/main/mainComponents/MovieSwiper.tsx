import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Swiper as SwiperType } from "swiper";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import type { MovieCardInfo } from '../../../_interfaces/interfaces';
import MovieCardBig from './MovieCardBig';
import "./customSwiper.css";

const sxBase = {
  color: "oklch(1 0 0)",
}

const PrevButton = React.memo(({ swiperRef }: { swiperRef: React.RefObject<SwiperType | null> }) => {
  return (
    <IconButton aria-label="previous"
      sx={{ ...sxBase, left: 0 }}
      onClick={() => swiperRef.current?.slidePrev()}>

      <ArrowBackIosNewRoundedIcon />

    </IconButton>
  );
})

const NextButton = React.memo(({ swiperRef }: { swiperRef: React.RefObject<SwiperType | null> }) => {
  return (
    <IconButton aria-label="previous"
      sx={{ ...sxBase, right: 0 }}
      onClick={() => swiperRef.current?.slideNext()}>

      <ArrowForwardIosRoundedIcon />

    </IconButton>
  );
})

const MovieSwiperPagination = React.memo(({ activeIndex, movieCardInfoArray, swiperRef }: { activeIndex: number, movieCardInfoArray: MovieCardInfo[], swiperRef: React.RefObject<SwiperType | null> }) => {
  const paginationText = `${activeIndex + 1} / ${movieCardInfoArray.length}`
  return (
    <Box className="flex gap-3 items-center mt-3">
      <PrevButton swiperRef={swiperRef} />
      <Typography sx={{ fontSize: "20px" }} className="text-white">{paginationText}</Typography>
      <NextButton swiperRef={swiperRef} />
    </Box>
  )
})

const MovieSwiper = React.memo(({ movieCardInfoArray, isLoading }: { movieCardInfoArray: MovieCardInfo[], isLoading: boolean }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0)



  return (
    <Box>
      {!isLoading &&
        <Swiper
          modules={[Navigation]}
          centeredSlides
          slidesPerView="auto"
          spaceBetween={100}
          centerInsufficientSlides
          pagination={{ clickable: true }}
          onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper }}
          onSlideChange={(swiper: SwiperType) => { setActiveIndex(swiper.activeIndex) }}>

          {movieCardInfoArray.map((movieCardInfo, index) => (
            <SwiperSlide>
              <MovieCardBig key={index} movieCardInfo={movieCardInfo} />
            </SwiperSlide>
          ))}

        </Swiper>
      }
      {isLoading && <Skeleton variant='rectangular' height={600} />}

      {!isLoading && <MovieSwiperPagination activeIndex={activeIndex} movieCardInfoArray={movieCardInfoArray} swiperRef={swiperRef} />}
      {isLoading && <Skeleton variant='rectangular' sx={{borderRadius: "12px"}} height={44} width={162} />}
    </Box>
  );
})

export default MovieSwiper