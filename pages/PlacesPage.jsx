import { Link, useParams, Navigate } from "react-router-dom";
import Perks from "../src/Perks";
import { useState, useEffect } from "react";
import axios from 'axios';
import PlacePhotos from "../src/PlacePhotos";


export default function PlacesPage() {

    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);
    const { id } = useParams();
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
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.titles);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);


    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
            if (!photoLink || !isValidURL(photoLink)) {
                console.error('Invalid URL');
                return;
            }
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            setAddedPhotos((prev) => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Error adding photo:', error);
        }
    }

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        }).catch(error => {
            console.error('Error uploading photos:', error);
        });
    }

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places',
            {
                title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price,
            });
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to='/account' />
    }



    function removePhoto(ev, filename) {
        ev.preventDefault();
        setAddedPhotos(prevPhotos => prevPhotos.filter(photo => photo !== filename));
    }

    function selectAsMainPhoto(ev, filename) {
        ev.preventDefault(); 
        if (addedPhotos[0] === filename) {
          return; 
        }
        const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== filename); 
        const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
        setAddedPhotos(newAddedPhotos); 
      }
    

    return (
  
        <div className="font-jakarta">
           
            {action !== 'new' && (
                <>
                    <div className="divNewPlaceBtn">
                        <Link className="newPlaceBtn" to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new place
                        </Link>
                    </div>
                    <div className="mt-4">
                        {places.length > 0 && places.map(place => (
                            <Link to={'/account/places/' + place._id} key={place._id} className="flex cursor-pointer mb-4 bg-gray-600 p-4 rounded-2xl">

                                <div className="rounded-2xl ">
                                   <PlacePhotos place={place} 
                                   />
                                </div>
                                <div className="flex-col ml-5">
                                    <h2 className="text-xl text-softblue font-arima">{place.title}</h2>
                                    <p className="text-sm mt-2 font-jakarta">{place.description}</p>
                                    <h3 className="font-bold mt-2 font-jakarta">€ {place.price} night</h3>
                                    </div>
                            </Link>
                        ))}
                    </div>

                </>
            )}



            {action === 'new' && (
                <div>
                    <form onSubmit={addNewPlace}>
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
                                onChange={ev => setPhotoLink(ev.target.value)} className="newPlaceFormInput" type="text" placeholder={'Add using a link... jpg/png/webp accepted'} />
                            <button onClick={addPhotoByLink} className="newPlaceFormBtnLink">Add photo</button>
                        </div>

                        <div className="newPlaceFormGrid gap-2">
                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div key={index} className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} />
                                    <button onClick={ev => removePhoto(ev, link)} className="absolute mt-1 bg-gray-500 bg-opacity-50 rounded-2xl py-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </button>
                                    <button onClick={ev => selectAsMainPhoto(ev, link)} className="absolute mt-14 bg-gray-500 bg-opacity-50 rounded-2xl py-1">
                                        {link === addedPhotos[0] && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="magenta" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                        )}   {link !== addedPhotos[0] && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        )}


                                    </button>
                                </div>
                            ))}
                            <label className="newPlaceFormBtn flex items-center cursor-pointer">
                                <input type="file" multiple className="hidden" accept=".jpg, .png, .webp"
                                    onChange={uploadPhoto}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload</label>
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
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
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
                                    type="text" placeholder="4" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per Night</h3>
                                <input className="newPlaceFormInput"
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value)}
                                    type="text" placeholder="€ 121" />
                            </div>
                        </div>
                        <div>
                            <button className=" bg-softgreen p-2 w-full rounded-2xl mb-4 mt-6">Save</button>
                        </div>
                    </form>
                </div>
            )}

        </div>

    )
}

