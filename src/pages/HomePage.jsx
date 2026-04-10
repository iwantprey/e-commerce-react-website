import HeroSection from '../components/HeroSection.jsx';
import NewArrivalSection from '../components/NewArrivalSection.jsx';
import TestimonialSection from '../components/TestimonialSection.jsx';
import CTASection from '../components/CTASection.jsx';

const HomePage = () => {
    return (
        <div className="homeContainer">
            <HeroSection />
            <NewArrivalSection />
            <TestimonialSection />
            <CTASection />
        </div>
    );
};

export default HomePage
