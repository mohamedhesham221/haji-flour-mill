// A page component to show Home page of the site.
import { Link } from "react-router-dom";
import "./styles/Home.css";

import { useGetAllReviewsQuery } from "../../store/APISlice";

import ReviewsCard from "../../components/ReviewCard";

const Home = () => {

  // Use Get All Reviews Query to get all the reviews from the server.
  const { data, isLoading, isError, error } = useGetAllReviewsQuery();

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>
  
  // Show error message on query error.
  if (isError) {
    console.error("Error: ", error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get reviews from the data returned by the query.
  const reviews = data?.reviews;

  return (
    <>
      <div className="banner">
        <div className="heading">
          <b>Haji Flour Mill</b><br></br>
          <small>Freshly Ground, Perfectly Milled - Superior Flour for Your Kitchen.</small>
        </div>
      </div>

      <div className="main-text">
        At Haji Flour Mill, we specialize in providing top-notch grinding services for a variety of grains. Whether it's wheat, corn, barley, pearl millet, or sorghum, we ensure that your grains are milled with precision to deliver the best quality flour or bulgur for your needs.
      </div>

      <div className="sub-text">
        <div className="red">
          <h3>Flour (Aata)</h3>
          <p>At Haji Flour Mill, we specialize in providing high-quality flour grinding services for a variety of grains, including wheat, corn, barley, and more. Our precision grinding process ensures that each batch of flour is finely milled, retaining the natural nutrients and flavor of the grains. Whether you're baking bread, preparing pastries, or cooking traditional dishes, our expertly ground flour offers the perfect texture and consistency for your culinary needs. We pride ourselves on delivering freshly milled flour that enhances the taste and quality of your food.</p>
        </div>
        
        <div className="yellow">
          <h3>Bulgur (Daliya)</h3>
          <p>At Haji Flour Mill, we offer specialized bulgur production services, transforming your grains into high-quality, nutrient-rich bulgur. Bulgur is a versatile grain, known for its quick cooking time and wholesome texture, making it perfect for a variety of dishes such as salads, pilafs, and soups. Our meticulous process ensures that each grain is carefully processed to preserve its flavor and nutritional value. Whether you're looking for a healthy base for your meals or a traditional staple, our bulgur service provides you with the perfect ingredient for your kitchen.</p>
        </div>
  
        <div className="green">
          <h3>Mix Flour (Mix Aata)</h3>
          <p>At Haji Flour Mill, we take pride in providing premium flour grinding services for a variety of grains, including wheat, corn, barley, pearl millet, and sorghum. Our grinding process ensures that the flour retains its natural nutrients and freshness, resulting in high-quality, finely ground flour. Whether you're looking for flour for bread, chapati, or other traditional recipes, we guarantee a product that's perfect for all your baking and cooking needs. Each grain is treated with care, providing you with the freshest and most nutritious flour available.</p>
        </div>
      </div>

      <div className="services-container">
        <h3 className="title">Our top services</h3>
        <div className="services">
          <div className="service">
            <img src="../../../WheatFlour.jpg" alt="Wheat Flour" />
            <div className="service-text">
              <h4>Wheat Flour</h4>
              <p>At Haji Flour Mill, our wheat flour grinding service ensures that your wheat is finely milled to produce high-quality flour suitable for various uses. Whether you're making bread, chapati, or other wheat-based dishes, we offer precision grinding that preserves the natural flavor and nutrients of the wheat. Our state-of-the-art machinery guarantees a smooth, consistent texture in every batch of flour, giving you the finest results for your culinary needs.</p>
            </div>
          </div>
  
          <div className="service">
            <img src="../../../WheatBulgur.jpg" alt="Wheat Bulgur" />
            <div className="service-text">
              <h4>Wheat Bulgur</h4>
              <p>At Haji Flour Mill, we offer a specialized wheat bulgur service, transforming high-quality wheat grains into wholesome bulgur. Bulgur is a nutritious, versatile ingredient used in a variety of dishes like soups, salads, and pilafs. Our milling process preserves the natural flavor and nutrients of the wheat, providing you with a healthy, fiber-rich product. Whether you're preparing traditional meals or modern recipes, our expertly processed bulgur ensures a delicious and satisfying addition to your cooking.</p>
            </div>
          </div>
          
          <div className="service">
            <img src="../../../CornFlour.jpg" alt="Corn Flour" />
            <div className="service-text">
              <h4>Corn Flour</h4>
              <p>At Haji Flour Mill, our corn flour service ensures finely ground, high-quality flour from fresh corn kernels. Corn flour is naturally gluten-free, rich in fiber, and packed with essential nutrients like vitamins B and E. It's perfect for making a wide range of delicious dishes, from tortillas and cornbread to batters and pastries. Our careful milling process retains the natural sweetness and rich flavor of the corn, providing you with smooth, consistent flour that enhances the texture and taste of your recipes.</p>
            </div>
          </div>
        </div>

        {/* Link to go to all services. */}
        <div className="services-link">
          <Link to={"/services"}>See all services</Link>
        </div>
      </div>

      {/* Show some reviews to users. */}
      <div className="reviews-container">
        <h3 className="title">What our customers say</h3>

        {/* Get first four reviews form the list and show them. */}
        <div className="reviews">
        {reviews?.length > 0 && reviews.slice(0, 4).map(review =>
          <ReviewsCard key={review._id} review={review} />
        )}
        </div>
      </div>
    </>
  );
};

export default Home;