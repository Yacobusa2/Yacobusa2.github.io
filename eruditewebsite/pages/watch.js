import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

import styles from '../styles/watch/Watch.module.css';

export default function Watch() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.documentElement.classList.add('erudite-bg');
    return function cleanup() {
      document.documentElement.classList.remove('erudite-bg');
    }
  }, []);

  const collapse = () => setOpen(false);

  const send = (ev) => {
    console.log('Sending message');
    
    const content = ev.target[0].value;

    if (content)
      setMessages([...messages, { content }]);µ

    ev.target[0].value = '';

    ev.preventDefault();
    return false;
  }

  return (
    <>
      <Head>
        <title>NotSoErudite: Watch</title>
        <meta name="description" content="Website stream watching and chat page." />
      </Head>

      <Logo extraClass={styles.chat_logo} />


      <div className={styles.wrapper}>
        <iframe
          className={styles['embed']}
          data-src="https://player.twitch.tv/?channel=notsoerudite&parent=notsoerudite.com&parent=www.notsoerudite.com"
          height="100%"
          title="notsoErudite Twitch stream"
          width="100%"
          frameBorder="0"
          loading="lazy"
          allowFullScreen>
        </iframe>

        <div className={[styles.chat, open ? styles.open : ''].join(' ')}>
          <div className={styles.head}>
            CHAT

            <button onClick={collapse} className={styles['collapse']}>
              &gt; Collapse
            </button>
          </div>

          <div className='message-list'>
            { messages.map((m, mI) => 
              <div key={mI} className='message'>
                { m.content }
              </div>
            )}
          </div>

          <form className={styles['compose-area']} onSubmit={send}>
            <textarea className={styles['message-box']} placeholder='Enter message here...'>
            
            </textarea>
            <button className={styles['submit']}>⏎</button>
          </form>
        </div>
      </div>
    </>
  )
}
