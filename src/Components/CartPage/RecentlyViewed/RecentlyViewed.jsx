import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RecentProduct from '../RecentProduct/RecentProduct';
import useStyles from '../styles';
import { Typography } from '@mui/material';

export default function RecentlyViewed() {
  const [RecentProducts, setRecentProducts] = useState([]);
  const classes = useStyles();

  const responsive = 
    {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
      }
    }

  useEffect(() => {
    // axios.get("https://fakestoreapi.com/products/category/electronics")
    //   .then((res) => {
    //     console.log(res.data);
    //     setRecentProducts(res.data);
    //   }).catch(err => console.log(err));
  }, []);
  return (
    <>
      <Typography variant='h4'>
            Recently Viewed
        </Typography>
      <Carousel
        containerClass={`w-full`}
        className={classes.carousel}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >

        {RecentProducts?.map((prod) => {
          return <RecentProduct product={prod} key={prod.id} />
        })}

      </Carousel>

    </>
  )
}
