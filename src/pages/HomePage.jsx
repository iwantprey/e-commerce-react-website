import HeroSection from '../components/HeroSection.jsx';
import NewArrivalSection from '../components/NewArrivalSection.jsx';

const HomePage = () => {
    return (
        <div className="homeContainer">
            <HeroSection />
            <NewArrivalSection />
        </div>
    );
};

export default HomePage