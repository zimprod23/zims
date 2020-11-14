import React, { useState, useCallback, useContext } from "react";
import Dropzone from "react-dropzone";
import { AddAPhoto } from "@material-ui/icons";
import { app } from "../../../base";
import { AdminOps } from "../../../components/utils/AdminOptionsProvider";

function FileUpload(props) {
  const [ImagesE, setImagesE] = useState([]);
  const { image } = useContext(AdminOps);
  const [Images, setImages] = image;
  const onDrop = useCallback(
    async (acceptedFile) => {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(acceptedFile[0].name);
      await fileRef.put(acceptedFile[0]);
      setImagesE([...ImagesE, await fileRef.getDownloadURL()]);
      setImages([...Images, await fileRef.getDownloadURL()]);
    },
    [Images]
  );
  console.log(Images);

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    //props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            {/* {console.log("getRootProps", { ...getRootProps() })}
            {console.log("getInputProps", { ...getInputProps() })} */}
            <input {...getInputProps()} />
            <AddAPhoto />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {ImagesE.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={image}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
