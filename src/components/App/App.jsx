import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Container, ErrorMessage } from './App.styled';
import fetchImages from '../../servises/images-api';

const App = () => {
  const [images, setImages] = useState([]); // Inicializado con un arreglo vacío
  const [searchWord, setSearchWord] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!searchWord) {
        return; // No realiza la solicitud si searchWord está vacío al inicio
      }

      setStatus('LOADING');
      try {
        const data = await fetchImages(searchWord, pageNumber);
        if (data.total === 0) {
          setStatus('ERROR');
        } else {
          const newData = data.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );
          if (pageNumber === 1) {
            setImages(newData);
          } else {
            setImages(prevImages => [...prevImages, ...newData]);
          }
          setStatus('OK');
          setPageTotal(data.totalHits);
        }
      } catch (error) {
        setStatus('ERROR');
      }
    };

    fetchData();
  }, [searchWord, pageNumber]);

  const formSubmitHandler = ({ keyWord }) => {
    if (searchWord !== keyWord) {
      setSearchWord(keyWord);
      setPageNumber(1);
      setImages([]); // Reinicio del arreglo de imágenes al realizar una nueva búsqueda.
    } else {
      setSearchWord(keyWord);
    }
  };

  const handleIncrement = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const lastPageDef = () => {
    let lastPage = Number(pageTotal % 12);
    if (lastPage === 0) {
      return (lastPage = Number(pageTotal / 12));
    } else {
      return (lastPage = Number.parseInt(pageTotal / 12) + 1);
    }
  };

  const lastPage = lastPageDef();

  return (
    <Container>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery data={images} />
      {status === 'ERROR' && (
        <ErrorMessage>No images for keyword "{searchWord}"</ErrorMessage>
      )}
      {status === 'LOADING' && <Loader />}
      {status === 'OK' && images.length > 11 && pageNumber !== lastPage && (
        <Button text={'Load more'} type="button" onClick={handleIncrement} />
      )}
      {pageNumber === lastPage && pageTotal > 0 && (
        <ErrorMessage>You've reached the end of search results.</ErrorMessage>
      )}
    </Container>
  );
};

export default App;
