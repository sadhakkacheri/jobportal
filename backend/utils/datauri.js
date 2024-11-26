import path from 'path';
import DataURIParser from 'datauri/parser.js';

const parser = new DataURIParser();

export const getDataUri = (file) => {
    if (!file) throw new Error('File is required');
    const extName = path.extname(file.originalname);
    return parser.format(extName, file.buffer);
};


export default getDataUri;