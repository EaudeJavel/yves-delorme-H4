import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Bed from '../components/Bed';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { withRedux } from '../lib/redux';

import styles from './index.module.scss';

const SaveIdLog = () => {
  const idLog = useSelector((state) => state.idLog);
  const parures = useSelector((state) => state.parures);
  const activeParure = useSelector((state) => state.activeParure);
  const initialParureId = useSelector((state) => state.initialParureId);
  const dispatch = useDispatch();
  const saveLog = (idLogLocal) => dispatch({
    type: 'updateLog',
    idLog: idLogLocal,
  });
  return {
    idLog, saveLog, parures, activeParure, initialParureId,
  };
};

const Index = () => {
  useEffect(() => {
     window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  });
  const {
    idLog, saveLog, parures, activeParure, initialParureId,
  } = SaveIdLog();

  let parureId = initialParureId;
  let tempParureId;
  if (activeParure.parureId) {
    parureId = activeParure.parureId;
  } else if (parures.length < 998) {
    if (parures[0]) {
      if (parures[0].parureName) {
        tempParureId = Math.floor(Math.random() * 1000);
        let index = parures.findIndex((e) => e.parureId === tempParureId);
        while (index !== -1) {
          tempParureId = Math.floor(Math.random() * 1000);
          index = parures.findIndex((e) => e.parureId === tempParureId);
        }
        parureId = tempParureId;
      }
    }
  } else {
    alert('Nombre maximal de parure enregistré');
  }
  const [currentParureId, setCurrentParureId] = useState(parureId);

  useEffect(() => {
    setCurrentParureId(parureId);
  }, [activeParure.newParure]);

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
  const [myBg, setMyBg] = useState();
  const [idLogLocal, setIDLogLocal] = useState(idLog);
  const [logged, setLogged] = useState(false);
  const [savedBed, setSavedBed] = useState(false);
  const [needToLog, setNeedToLog] = useState(false);

  useEffect(() => saveId(), [idLogLocal]);

  return (
    <div className={styles.background}>
      {menu ? null
        : <Header toggleMenuLeftDecor={toggleMenuLeftDecor} logIn={logIn} popModal={popModal} needToLog={needToLog} toggleNeedToLog={toggleNeedToLog} popModal={popModal} />}
      <div className={styles.radial} onClick={() => resetMenu()} />
      <Bed menu={menu} addCart={addCart} popModal={popModal} parureContent={parureContent} backgroundContent={backgroundContent} menuLeftDecor={menuLeftDecor} title={titleArticle} typeItem={typeArticle} resetMenu={resetMenu} preview={preview} menuOpen={menuOpen} saveParure={saveParure} currentParureId={currentParureId} />
      {modal ? (<Modal type={typeOfModal} resetModal={resetModal} myParure={myParure} myBg={myBg} logIn={logIn} popModal={popModal} saveParure={saveParure} />) : null}

      <Footer popModal={popModal} toggleMenu={toggleMenu} toggleCart={toggleCart} preview={previewF} parures={parures} logged={logged} isMenuOpen={menu} />
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
    } else if (typeArticle !== type) {
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

  function popModal(typeOfModal, tempLogged) {
    typeOfModal === 'addedToCart' || typeOfModal === 'saved' || typeOfModal === 'returnSite' ? (setTypeOfModal(typeOfModal), setModal(true)) : null;
    typeOfModal === 'save' && (logged == true || tempLogged) ? (setTypeOfModal(typeOfModal), setModal(true)) : null;
    typeOfModal === 'save' && logged == false && !tempLogged ? (setNeedToLog([true, typeOfModal])) : null;
    typeOfModal === 'list' && logged == false ? (setNeedToLog([true, typeOfModal])) : null;
    typeOfModal === 'list' && logged == true && savedBed == false ? (setTypeOfModal('list'), setModal(true)) : null;
  }

  function toggleNeedToLog() {
    setNeedToLog(false);
  }

  function parureContent(myParure) {
    setMyParure(myParure);
  }

  function backgroundContent(myBg) {
    setMyBg(myBg);
  }

  function logIn(log) {
    setIDLogLocal(log);
    log ? setLogged(true) : setLogged(false);
  }

  function saveParure(state) {
    setSavedBed(state);
  }

  function saveId() {
    saveLog(idLogLocal);
    idLogLocal ? setLogged(true) : null;
  }
};

export default withRedux(Index);
