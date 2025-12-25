import { useEffect, useState } from "react";
import "./AboutUs.css";
import api from "../../api/axios.api";

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/about'); 
        const data = response.data;

        setAboutContent({
          title: data.title,
          description: data.description,
        });
      } catch (err) {
        setError('No se pudo cargar el contenido.');
        console.error('Error fetching about:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="about-container">
        <div className="about-card">
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="about-container">
        <div className="about-card error">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about-container">
      <div className="about-card">
        <h2>{aboutContent.title}</h2>
        <p>{aboutContent.description}</p>
      </div>
    </section>
  );
};

export default AboutUs;
