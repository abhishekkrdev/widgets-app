import React, { useState, useEffect } from 'react';
import Axios from 'axios';

let url = 'https://translation.googleapis.com/language/translate/v2';
const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');

  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => clearInterval(timerId);
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await Axios.post(
        url,
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
          }
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);
  return (
    <div>
      <h1 className='ui header'>{translated}</h1>
    </div>
  );
};

export default Convert;
