import jimp from 'jimp';

const resizeImage = async (uriBase, oldName, newName) => {
	const image = await jimp.read(uriBase + oldName);
	await image.resize(150, jimp.AUTO);
    await image.writeAsync(uriBase + newName);
    return uriBase+newName;
}

export default resizeImage;