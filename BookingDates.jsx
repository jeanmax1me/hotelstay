import PropTypes from 'prop-types';

export default function BookingDates({ booking, className }) {
    // Function to format the date in "yyyy-MM-dd" format
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const checkInDateFormatted = formatDate(booking.checkInDate);
    const checkOutDateFormatted = formatDate(booking.checkOutDate);
  
    // Calculate the number of nights between check-in and check-out dates
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return (
      <div className={'flex gap-1 ' + className}>
        {/* Display the number of nights */}
        {nights} nights:
  
        {/* Display the formatted check-in date */}
        <div className="flex gap-1 items-center ml-2">
          {checkInDateFormatted}
        </div>
  
        {/* Arrow symbol */}
        &rarr;
  
        {/* Display the formatted check-out date */}
        <div className="flex gap-1 items-center">
          {checkOutDateFormatted}
        </div>
      </div>
    );
  }

    BookingDates.propTypes = {
        booking: PropTypes.object.isRequired,
        className: PropTypes.string,
      };