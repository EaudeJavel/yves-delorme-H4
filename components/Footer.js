import Link from 'next/link';
import styles from './Footer.module.scss';
import Button from './Styles/Button'
import React from 'react'
import PropTypes from 'prop-types'


const Footer = props => (
    <div className={styles.footer}>
        <div className={styles.buttons}>
            <div className={styles.button} onClick={() => props.toggleMenu('Taies')}><Button>Taies</Button></div>
            <div className={styles.button} onClick={() => props.toggleMenu('Housse de couette')}><Button>Housse de couette</Button></div>
            <div className={styles.button} onClick={() => props.toggleMenu('Drap plat')}><Button>Drap plat</Button></div>
            <div className={styles.button} onClick={() => props.toggleMenu('Drap housse')}><Button>Drap housse</Button></div>
        </div>

        <div className={styles.buttonsRight}>
        	<button className={styles.buttonRight}>
                <img src="/static/cart.svg" alt="panier" />
                Ajouter au panier
            </button>

            <button className={styles.buttonRight} onClick={() => props.toggleCart()}>
                <img src="/static/cross.png" alt="croix" />
                Enregistrer la parure
            </button>

        </div>
    </div>        
    
);

export default Footer;