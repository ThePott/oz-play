import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/swiper.min.css';

// import Swiper core and required modules
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';

// install Swiper modules
SwiperCore.use([Navigation]);

const TestPage = () => {
  return (
    <Box className="App" padding={2}>
      <Typography
        variant={'h4'}
        align={'center'}
        fontWeight={700}
      >
        Swiper + Material-UI example
      </Typography>
      {/** Slider main container */}
      <Box marginTop={4}>
        <Swiper navigation={true} className="mySwiper">
          {/** Slides */}
          {['Slide 1', 'Slide 2', 'Slide 3'].map((item, i) => (
            <SwiperSlide key={i}>
              <Typography
                variant={'h6'}
                align={'center'}
              >
                {item}
              </Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default TestPage
