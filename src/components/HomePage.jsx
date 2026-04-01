import HeroSection from './HeroSection.jsx';
import NewArrivalSection from './NewArrivalSection.jsx';

const HomePage = () => {
    return (
        <div className="homeContainer">
            <HeroSection />
            <NewArrivalSection />
        </div>
    );
};

export default HomePage