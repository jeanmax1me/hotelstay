import PropTypes from 'prop-types';

export default function PlacePhotos({place, index=0}) {
    if (!place.photos || place.photos.length === 0) {
        return null;
    }
    return (
        <img
        key={`photo-${index}`}
        className="aspect-[1.052/1] object-cover max-w-[16rem]"
        src={`${place.photos[0]}`}
        alt=""
      />
)}


PlacePhotos.propTypes = {
    place: PropTypes.shape({
      photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    index: PropTypes.number,
    className: PropTypes.string,
  };
  