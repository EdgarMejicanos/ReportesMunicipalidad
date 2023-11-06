import { base_url } from "./constants"

export const getImageUrl = (imageObj) => {

    let size = "small";

    if(!imageObj.attributes.formats?.small?.url) {
        size = "thumbnail"
    }
    const url = `${base_url}${imageObj.attributes.formats[size].url}`;

    return {
        src: url,
        height: imageObj.attributes.formats[size].height,
        width: imageObj.attributes.formats[size].width
    };
}