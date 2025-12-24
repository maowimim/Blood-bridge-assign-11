import React from 'react';
import Banner from '../Pages/Banner';
import FeaturedSection from './FeaturedSection';
import ContactUs from './ContactUs';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <FeaturedSection></FeaturedSection>
          <ContactUs></ContactUs>
          <Footer></Footer>
        </div>
    );
};

export default Home;