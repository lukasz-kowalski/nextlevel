'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './ImagePicker.module.css';

interface Props {
  label: string;
  name: string;
}

export const ImagePicker = ({ label, name }: Props): JSX.Element => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  const handlePickClick = (): void => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    
    if (!event.target.files) {

    return setPickedImage(null);
    }

    const file = event.target.files![0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPickedImage(fileReader.result);
      }
    }; // stores callback for file reader

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
        </div>
        <input className={styles.input} type='file' id={name} accept='image/png, image/jpeg' name={name} ref={imageInput} onChange={handleImageChange} required />
        <button className={styles.button} type='button' onClick={handlePickClick}>Pick an Image</button>
      </div>
    </div>
  )
}
