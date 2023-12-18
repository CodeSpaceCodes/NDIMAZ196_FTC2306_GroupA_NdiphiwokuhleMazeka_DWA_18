// import React, {useState, useEffect } from 'reacy'
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

const Carousel = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            fetch("https://podcast-api.netlify.app/shows")
            .then(res => res.json())
            .then(data => setItems([...data].sort((a, b) => b.title.localeCompare(a.title))))
        } catch (error) {
            console.error(error.message)
        }
    });

const Slides = items.slice(0, 10);
const original = {
    border: '1px solid black',
    margin: '5px',
    padding: '2px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
}
    const imageStyle = {
        marginBottom: '1px',
        borderRadius: '4px',
        width: '240px',
        height: '200px'
      };

  return (
    <> 
    <h1 style={{textAlign: 'center'}}>Recommended Shows</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        style={original}
      >
        {Slides.map(slide => {
            return (
                <SwiperSlide key={slide.id} className={original}>
                  <img src={slide.image} alt=""style={imageStyle} />
                  <div>
                      <h1>{slide.title}</h1>
                  </div>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
}

export default Carousel;