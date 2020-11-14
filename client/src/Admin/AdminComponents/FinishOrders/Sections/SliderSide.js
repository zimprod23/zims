import React from "react";
import ImageGallery from "react-image-gallery";
function SliderSide(props) {
  const images = [
    props.images &&
      props.images.map((item, index) => {
        return {
          original: item,
          thumbnail: item,
        };
      }),
  ];
  return (
    <div>
      <ImageGallery
        items={images[0]}
        showThumbnails={false}
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

export default SliderSide;
