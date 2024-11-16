import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import '../scss/footer.scss';


export default function Footer() {
    return (
        <>
        <footer className="bg-primary py-4">
            <Container>
                <Row>     
                    <Col md={4}>
                        <h3>Siga-nos nas redes sociais</h3>
                        <p>Veja quais são as novidades da nossa loja</p>
                        <ul className='list-unstyled d-flex gap-3'>
                            <li><a className='social-media' href="https://twitter.com/hikkibot"><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a className='social-media' href="https://instagram.com/hikkibot"><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a className='social-media' href="https://discord.gg/FUubz3CErj"><FontAwesomeIcon icon={faDiscord} /></a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h3>Nossas informações</h3>
                        <ul className="list-unstyled text-white">
                            <li><a href="/sobre">Sobre nós</a></li>
                            <li><a href="/"></a></li>
                            <li><a href="/contato">Contato</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                    <h3>Minha conta</h3>
                    <ul className="list-unstyled text-white">
                        <li><a href="/">Meus pedidos</a></li>
                        <li><a href="/contato">Contato</a></li>
                    </ul>
                    </Col>
                </Row>
            </Container>
        </footer>

        
        </>
    );
}
