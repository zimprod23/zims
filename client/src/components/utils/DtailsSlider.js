import React from "react";
import ImageGallery from "react-image-gallery";

function Slider(props) {
  //const [imageIndex, setimageIndex] = useState();

  return (
    <div>
      <ImageGallery
        items={props.images}
        showThumbnails={true}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay
        onImageError={() => alert("cannot load")}
        showBullets
      />
    </div>
  );
}

export default Slider;
