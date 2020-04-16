import React, { useState } from 'react';
import Header from '../components/Header';
import Bed from '../components/Bed';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { withRedux } from '../lib/redux';

import styles from './index.module.scss';

const Index = () => {
  const [menu, setMenu] = useState(false);
  const [menuLeftDecor, setMenuLeftDecor] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [typeOfModal, setTypeOfModal] = useState('');
  const [typeArticle, setTypeArticle] = useState('');
  const [titleArticle, setTitleArticle] = useState('');
  const [preview, setPreview] = useState();
  const [modal, setModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [myParure, setMyParure] = useState();

  return (
    <div className={styles.background}>
      <Header toggleMenuLeftDecor={toggleMenuLeftDecor} />
      <Bed menu={menu} addCart={addCart} popModal={popModal} parureContent={parureContent} menuLeftDecor={menuLeftDecor} title={titleArticle} typeItem={typeArticle} resetMenu={resetMenu} preview={preview} menuOpen={menuOpen} />
      {modal ? (<Modal type={typeOfModal} resetModal={resetModal} myParure={myParure} />) : null}
      <Footer popModal={popModal} toggleMenu={toggleMenu} toggleCart={toggleCart} preview={previewF} />
      <div id="trashCanvas" className={styles.trashCanvas}>
        <canvas id="canvas" />
      </div>
    </div>
  );

  function previewF(preview) {
    setPreview(preview);
  }
  function toggleMenu(title, type) {
    if (!menu) {
      setMenu(true);
      setTypeArticle(type);
      setTitleArticle(title);
      setMenuOpen(!menuOpen);
    } else if (typeArticle != type) {
      setTypeArticle(type);
      setTitleArticle(title);
    } else {
      setMenu(false);
      setTypeArticle(type);
      setMenuOpen(false);
    }
  }

  function toggleMenuLeftDecor() {
    if (!menuLeftDecor) {
      setMenuLeftDecor(true);
    } else {
      setMenuLeftDecor(false);
    }
  }

  function toggleCart() {
    if (!addCart) {
      setAddCart(true);
    } else {
      setAddCart(false);
    }
  }

  function resetMenu() {
    setAddCart(false);
    setMenu(false);
    setMenuLeftDecor(false);
    setMenuOpen(false);
  }

  function resetModal() {
    setModal(false);
  }

  function popModal(typeOfModal) {
    typeOfModal === 'addedToCart' || typeOfModal === 'unlogged' ? (setTypeOfModal(typeOfModal), setModal(true)) : null;
  }

  function parureContent(myParure) {
    setMyParure(myParure);
  }
}

export default withRedux(Index);
