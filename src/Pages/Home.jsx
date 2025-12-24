import React from 'react';
import Banner from '../Pages/Banner';
import FeaturedSection from './FeaturedSection';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <FeaturedSection></FeaturedSection>
          <ContactUs></ContactUs>
        </div>
    );
};

export default Home;