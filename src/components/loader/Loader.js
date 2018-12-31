import React from 'react';
import Loader from 'react-loader-spinner';
import '../styles/loader.scss';

const Loading = () => {
  return (
    <section className="full-height">
      <div className="spinner">
        <Loader type="Oval" color="#161925" height="100" width="100" />
      </div>
    </section>
  );
};

export default Loading;
