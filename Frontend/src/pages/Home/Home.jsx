import SliderComponent from "../../components/Slider/Slider";
import AboutUs from '../../components/AboutUs/AboutUs' 
import ProductListContainer from "../../components/ProductListContainer/ProductListContainer";

const Home = () => {

    return(
        <div className="Home">
        <SliderComponent/>
        <AboutUs/>
        <ProductListContainer/>
         </div>
    )
    
}

export default Home