import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Toaster } from 'react-hot-toast';
import * as API from 'services/image-api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setUqery] = useState('');
  const [totalImages, setTotalImages] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        const response = await API.getImages(query, page, controller);
        const responseImages = response.hits;
        const responseTotalImages = response.totalHits;

        setLoading(false);
        setImages(prevImages => [...prevImages, ...responseImages]);
        setTotalImages(responseTotalImages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [page, query]);

  const handleFormSubmit = ({ query }) => {
    setUqery(query);
    setImages([]);
    setPage(1);
  };

  const loadingLargeImage = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    setShowModal(true);
    setModalImage(event.target.dataset.src);
  };

  const toggleModal = useCallback(() => {
    setShowModal(prevState => !prevState);
  }, []);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreButton =
    totalImages > 0 && Math.ceil(totalImages / 12) !== page;

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} loadLargeImage={loadingLargeImage} />
      )}
      {loading && <Loader />}
      {showLoadMoreButton && !loading && <Button loadMore={loadMore} />}
      {showModal && <Modal image={modalImage} closeModal={toggleModal} />}
      <Toaster position="top-right" reverseOrder={false} />
    </Wrapper>
  );
};
