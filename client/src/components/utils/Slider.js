import React, { useState } from "react";
import ImageGallery from "react-image-gallery";

function Slider(props) {
  const [imageIndex, setimageIndex] = useState();

  return (
    <div>
      <ImageGallery
        items={props.images}
        showThumbnails={false}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        autoPlay
        onImageError={() => alert("cannot load")}
        onClick={() => props.redirectTo(imageIndex)}
        onSlide={(e) => setimageIndex(e)}
        showBullets
      />
    </div>
  );
}

export default Slider;
