import { useEffect, useState } from "react";

const mapStyle = {
  width: "100%",
  height: "450px",
  border: 0
};
const { width, height, border } = mapStyle;

const Map = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState('');


  useEffect(() => {
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d763257.0109096731!2d75.13177335970222!3d25.227152534770465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9f2c5f3db65d%3A0x4ffd9b0e6fe08259!2sHaji%20Flour%20and%20Rice%20Mill!5e1!3m2!1sen!2seg!4v1734758753901!5m2!1sen!2seg";
    let isMounted = true;
    const getMap = async () => {
      try {
        setIsLoaded(true);
        if (isMounted) {
          setMap(mapUrl);
        }
      } catch (error) {
        console.error("Error loading the map:", error);
      } finally {
        if (isMounted) {
          setIsLoaded(false);
        }
      }
    }
    getMap()
    return () => {
      isMounted = false;
    };

  }, [])

  return (
    <>
      {
        isLoaded ? <p>Loading map...</p> :
          <iframe src={map}
          title="Google Map"
            width={width} height={height}
            style={{ border }} allowFullScreen
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      }
    </>);
};

export default Map;
