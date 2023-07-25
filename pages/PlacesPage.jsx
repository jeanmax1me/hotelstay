import { Link, useParams } from "react-router-dom";
import Perks from "../src/Perks";
import { useState } from "react";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);


    return (
        <div>
            {action !== 'new' && (

                <div className="divNewPlaceBtn">
                    <Link className="newPlaceBtn" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="newPlaceFormHeader">Title</h2>
                        <p className="newPlaceFormText">title for your place.</p>
                        <input value={title}
                            onChange={ev => setTitle(ev.target.value)} className="newPlaceFormInput" type="text" placeholder="title, for example: My lovely apt" />
                        <h2 className="newPlaceFormHeader">Address</h2>
                        <p className="newPlaceFormText">address to this place.</p>
                        <input value={address}
                            onChange={ev => setAddress(ev.target.value)} className="newPlaceFormInput" type="text" placeholder="address" />
                        <h2 className="newPlaceFormHeader">Photos</h2>
                        <p className="newPlaceFormText">the best photos you have about the place</p>
                        <div className="newPlaceFormAddLink">
                            <input value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)} className="newPlaceFormInput" type="text" placeholder={'Add using a link ...jpg/png/svg'} />
                            <button className="newPlaceFormBtnLink">Add photo</button>
                        </div>
                        <div className="newPlaceFormGrid">
                            <button className="newPlaceFormBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload</button>
                        </div>
                        <h2 className="newPlaceFormHeader">Description</h2>
                        <p className="newPlaceFormText">description of the place</p>
                        <textarea value={description} 
                        onChange={ev => setDescription(ev.target.value)} className="newPlaceFormTextArea" />
                        <h2 className="newPlaceFormHeader">Perks</h2>
                        <p className="newPlaceFormText">select all the perks of your place</p>

                        <div className="newPlaceFormPerks">
                            <Perks selected={perks}
                                onChange={setPerks} />

                        </div>
                        <h2 className="newPlaceFormHeader">Extra infos</h2>
                        <p className="newPlaceFormText">House rules, etc</p>
                        <textarea value={extraInfo}
                        onChange={ev => setExtraInfo(ev.target.value)} 
                        />
                        <h2 className="newPlaceFormHeader">Check in & Check out times, Max Guests</h2>
                        <p className="newPlaceFormText">Add check in and out times, remember to have some time window for cleaning the room between guests</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input className="newPlaceFormInput" 
                                value={checkIn} 
                                onChange={ev => setCheckIn(ev.target.value)}
                                 type="text" placeholder="14" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input className="newPlaceFormInput"
                                  value={checkOut} 
                                  onChange={ev => setCheckOut(ev.target.value)}
                                type="text" placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input className="newPlaceFormInput" 
                                value={maxGuests}
                                onChange={ev => setMaxGuests(ev.target.value)}
                                type="text" placeholder="number" />
                            </div>
                        </div>
                        <div>
                            <button className=" bg-softgreen p-2 w-full rounded-2xl my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

