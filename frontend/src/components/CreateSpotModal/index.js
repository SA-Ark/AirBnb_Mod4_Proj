import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
// import { createNewSpot} from "../../store/createSpotModal";
import { createNewSpot} from "../../store/spots";
import './CreateSpot.css';
import { useHistory } from "react-router-dom";


function CreateSpotModal() {
  const dispatch = useDispatch();



const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [country, setCountry] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [url, setUrl] = useState("");
const user = useSelector(state=> state.session)
let spots = useSelector(state=> state.spots?.Spots)
let spotId = spots.slice(spots.length-1)[0].id +1
const ownerId = user?.id




const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {address, city, state, country, name, description, price, ownerId}
    await dispatch(createNewSpot(newSpot, url));
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setName("");
    setDescription("");
    setPrice("");
    setUrl("");


    history.push(`/spots/${spotId}`)


  };

return(
    <>
      <h1>Create Spot Form</h1>
      <form onSubmit={handleSubmit}>

        <label>
          address
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          city
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          state
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          country
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          name
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          description
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
         <label>
          price
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          url
          <input
            type="text"
            placeholder="Image url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </>


  )
}

export default CreateSpotModal;
