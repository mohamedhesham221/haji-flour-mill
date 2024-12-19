import "./styles/ContactUs.css";
import Map from "../../components/Map";
import { useState } from "react";
const ContactUs = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const NAME_regEx = '^[A-Za-z]+';
  const MAIL_regEx = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

  const countries = [
    {
      'name': 'Talera, Bundi',
      'value': 'Talera-Bundi'
    },
    {
      'name': 'Keshoraipatan, Bundi',
      'value': 'keshoraipatan-bundi'
    },
    {
      'name': 'Bundi',
      'value': 'bundi'
    },
    {
      'name': 'Ladpura, Kota',
      'value': 'ladpura-kota'
    },
    {
      'name': 'Kota',
      'value': 'kota'
    }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with input: 
          full name is: ${firstName} ${lastName}
          E-mail : ${email}
          country: ${selectedCountry}
          message: ${userMessage}`);
  };
  return (
    <>
      <div className="contact-page-container">
        <p>Have a question, suggestion, or idea? We’re here to listen and make continuous improvements. Your feedback is valuable in helping us grow and serve you better!.</p>
        <h2>Contact</h2>
        <div className="form-map-container">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Personal Information</legend>
              <label htmlFor="first-name">First Name</label> <span>*</span>
              <input type="text" value={firstName} id="first-name" name="first-name" placeholder="Your First Name . . ."
                onChange={(e) => setFirstName(e.target.value)} required pattern={NAME_regEx} />
              <label htmlFor="last-name">Last Name</label> <span>*</span>
              <input type="text" value={lastName} id="last-name" name={NAME_regEx} placeholder="Your Last Name . . ."
                onChange={(e) => setLastName(e.target.value)} required pattern={NAME_regEx} />
              <label for="email-address">Email Address </label><span>*</span>
              <input type="email" id="email-address" name="email-address" placeholder="You Email . . ." 
                onChange={(e) => setEmail(e.target.value)} pattern={MAIL_regEx} required />
            </fieldset>
            <fieldset>
              <legend>Preferences</legend>
              <label htmlFor="country">Country</label> <span>*</span>
              <select id="country" name="selectedCountry" defaultValue={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)} >
                  <option value='' disabled>Pick your city - - -</option>
                {
                  countries.map((country, index) =>
                    <option value={country.value} key={index} disabled={selectedCountry == '--'}>{country.name}</option>)
                }
              </select>
              <label htmlFor="msg">Message</label> <span>*</span>
              <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} id="msg" required></textarea>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
          <div className="google-map">
            <Map />
          </div>
        </div>
      </div>
    </>
  )
}
export default ContactUs;