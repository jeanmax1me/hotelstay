
import PropTypes from "prop-types";

export default function Image({ src, ...rest }) {
  return <img {...rest} src={src} alt="" />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};