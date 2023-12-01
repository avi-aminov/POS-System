export const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export const copyToClipboard = (text, cb, error) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
            cb();
        })
        .catch((err) => {
            console.error('Failed to copy text to clipboard', err);
            error();
        });
};

export const formatFileSize = (sizeInBytes) => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (sizeInBytes < kilobyte) {
        return sizeInBytes + ' B';
    } else if (sizeInBytes < megabyte) {
        return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else {
        return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    }
}