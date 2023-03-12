import Container from '../components/Container';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Container>
    <Component {...pageProps} />
  </Container>
};
