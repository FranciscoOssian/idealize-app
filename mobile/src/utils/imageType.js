const http = require('http');
const imageType = require('image-type');

const typeImage = (url) => {
    http.get(url, response => {
        response.on('readable', () => {
            const chunk = response.read(imageType.minimumBytes);
            response.destroy();
            console.log(imageType(chunk));
            //=> {ext: 'gif', mime: 'image/gif'}
            return imageType(chunk).ext;
        });
    });
}

export default typeImage;