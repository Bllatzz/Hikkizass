import React, { useEffect, useState } from 'react';
import { Carousel, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/home.scss';

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProdutos(data);  
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="home">
            <div className="container-fluid p-0">
                <Carousel controls indicators fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="banner1.webp"
                            alt="Primeira imagem"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="banner2.png"
                            alt="Segunda imagem"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <Container className="my-5">
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className="text-over-image large-card">
                            <Card.Img variant="top" src="https://via.placeholder.com/500x500" />
                            <div className="overlay w-30">
                                <Card.Text className="no-border-text ">Masculinas</Card.Text>
                            </div>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="text-over-image small-card">
                            <Card.Img variant="top" src="https://via.placeholder.com/240x500" />
                            <div className="overlay">
                                <Card.Text className="no-border-text">Femininas</Card.Text>
                            </div>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-4">
                        <Card className="text-over-image small-card mb-4 c">
                            <Card.Img variant="top" src="https://via.placeholder.com/240x240" />
                            <div className="overlay">
                                <Card.Text className="no-border-text">Conjuntos</Card.Text>
                            </div>
                        </Card>

                        <Card className="text-over-image small-card">
                            <Card.Img variant="top" src="https://via.placeholder.com/240x240" />
                            <div className="overlay">
                                <Card.Text className="no-border-text">Acessórios</Card.Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="my-5">
                <div className="d-flex flex-column align-items-center">
                    <h4>Camisas mais vendidas</h4>
                    <h3>Confira nossas melhores camisas</h3>
                </div>

                <Row>
                    {produtos.length > 0 ? (
                        produtos.slice(0, 4).map(produto => (
                            <Col md={3} key={produto.id} className="mb-4">
                                <Link to={  `/${produto.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card className="custom-card">
                                        <Card.Img
                                            variant="top"
                                            src={`http://localhost:5000${produto.image}`}
                                            className="custom-card-img"
                                        />
                                    <Card.Body className="custom-card-body">
                                            <div>
                                                <Card.Title>{produto.name}</Card.Title>
                                                <Card.Text>{`R$ ${produto.price.toFixed(2)}`}</Card.Text>
                                            </div>
                                            <Button variant="primary" className='mt-3'>Adicionar ao Carrinho</Button>
                                        </Card.Body>

                                    </Card>
                                </Link>

                            </Col>
                        ))
                    ) : (
                        <p>Carregando produtos...</p>
                    )}
                </Row>

            </Container>
        </div>
    );
}
