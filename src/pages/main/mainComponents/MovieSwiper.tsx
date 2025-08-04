import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Swiper as SwiperType } from "swiper";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./customSwiper.css";
import MovieCard from './MovieCard';
import useMovieStore from '../../../_store/store';

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

const MovieSwiperPagination = React.memo(({ activeIndex, movieArray, swiperRef }: { activeIndex: number, movieArray: any[], swiperRef: React.RefObject<SwiperType | null> }) => {
  const paginationText = `${activeIndex + 1} / ${movieArray.length}`
  return (
    <Box className="flex gap-3 items-center mt-3">
      <PrevButton swiperRef={swiperRef} />
      <Typography sx={{ fontSize: "20px" }} className="text-white">{paginationText}</Typography>
      <NextButton swiperRef={swiperRef} />
    </Box>
  )
})

const MovieSwiper = React.memo(() => {
  const popularMovieArray = useMovieStore((state) => state.popularMovieArray)

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const isLoading = useMovieStore((state) => state.isLoading)


  return (
    <Box>
      {!isLoading &&
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={100}
          centeredSlides
          centerInsufficientSlides
          pagination={{ clickable: true }}
          onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper }}
          onSlideChange={(swiper: SwiperType) => { setActiveIndex(swiper.activeIndex) }}>

          {popularMovieArray.map((movieCardInfo, index) => (
            <SwiperSlide>
              <MovieCard key={index} variant='BIG'  movieCardInfo={movieCardInfo} />
            </SwiperSlide>
          ))}

        </Swiper>
      }
      {isLoading && <Skeleton variant='rectangular' height={600} />}

      {!isLoading && <MovieSwiperPagination activeIndex={activeIndex} movieArray={popularMovieArray} swiperRef={swiperRef} />}
      {isLoading && <Skeleton variant='rectangular' sx={{borderRadius: "12px"}} height={44} width={162} className="mt-3" />}
    </Box>
  );
})

export default MovieSwiper