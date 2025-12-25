import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import './Slider.css';
import api from '../../api/axios.api';

const SliderComponent = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usamos api.get() → va a http://localhost:3000/api/sliders
        const response = await api.get('/sliders');
        const data = response.data;

        // Adaptamos los datos del backend
        const adaptedSliders = data.map(slider => ({
          id: slider.id,
          titulo: slider.title,
          descripcion: slider.description,
          imagenUrl: `http://localhost:3000${slider.imageUrl}`, // ← Ruta completa
        }));

        setSliders(adaptedSliders);
      } catch (err) {
        setError('Error al cargar el slider. Intenta más tarde.');
        console.error('Error fetching sliders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
  };

  // Loading
  if (loading) {
    return (
      <div className="slider-container loading">
        <p>Cargando slider...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="slider-container error">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Sin sliders
  if (sliders.length === 0) {
    return (
      <div className="slider-container empty">
        <p>No hay sliders disponibles.</p>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliders.map(slide => (
          <div key={slide.id} className="slide">
            <img
              src={slide.imagenUrl}
              alt={slide.titulo}
              className="slide-img"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=Imagen+No+Disponible';
              }}
            />
            <div className="slide-content">
              <h3 className="slide-title">{slide.titulo}</h3>
              <p className="slide-desc">{slide.descripcion}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;