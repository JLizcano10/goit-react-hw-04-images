function fetchImages(keyWord, page) {
  return fetch(
    `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=39922644-bcfb57c4c3a31264e272bb894&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No images for keyword ${keyWord}`));
  });
}

export default fetchImages;
