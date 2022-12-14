import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { editSpotDetailsBySpotId } from "../../store/editSpotModal";
import { useModal } from "../../context/Modal";

import "./EditSpot.css";

function EditSpotModal() {
  const dispatch = useDispatch();
  let Spot = useSelector(state => state.spotDetails);

  let user = useSelector(state=> state.session.user)

// const [address, setAddress] = useState(Spot.address);
// const [city, setCity] = useState(Spot.city);
// const [state, setState] = useState(Spot.state);
// const [country, setCountry] = useState(Spot.country);
// const [name, setName] = useState(Spot.name);
// const [description, setDescription] = useState(Spot.description);
// const [price, setPrice] = useState(Spot.price);
// const [previewImage, setSpotImage] = useState(Spot.previewImage)
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [country, setCountry] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [previewImage, setSpotImage] = useState("")
const [errors, setErrors] = useState([]);
const { closeModal } = useModal();

const {firstName, lastName} = user;
const {numReviews, avgStarRating} = Spot;


  const handleSubmit = (e) => {
    e.preventDefault();

    const newSpot = {address, city, state, country, name, description, price}

     return dispatch(editSpotDetailsBySpotId(Spot.id, newSpot, previewImage, firstName, lastName, numReviews, avgStarRating )).then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      data.errors = Object.values(data.errors)
      if (data && data.errors) setErrors(data.errors)});

      }

return(
    <>
      <h1>Update Spot Form</h1>
      <div className="update-spot-form">
      <form onSubmit={handleSubmit}>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />


          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="url"
            value={previewImage}
            onChange={(e) => setSpotImage(e.target.value)}
            required
          />

        <button type="submit" className="submit-update-spot">Update</button>
      </form>
      </div>
    </>


  )
}

export default EditSpotModal;
