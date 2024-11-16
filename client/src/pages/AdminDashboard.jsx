import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import '../scss/admin.scss'

import { leaguesByCountry } from '../assets/ligas';
export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [availableLeagues, setAvailableLeagues] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    continente: "",
    country: "",
    league: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const addOrEditProduct = async (e) => {
    e.preventDefault();


    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, newProduct);
      } else {
        await axios.post("http://localhost:5000/api/products", newProduct);
      }
      fetchProducts();
      resetForm();
      setShowModal(false);
      
    } catch (error) {
      console.error("Erro ao adicionar ou editar produto:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`/api/orders/${orderId}`, { status: selectedStatus });
      fetchOrders();
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };


  const [availableCountries, setAvailableCountries] = useState([]);


  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;
    setNewProduct({ ...newProduct, continente: selectedContinent, country: "" });
    setAvailableCountries(countriesByContinent[selectedContinent] || []);
  };
  const countriesByContinent = {
    Europa: [
        "Alemanha", "Andorra", "Armênia", "Áustria", "Azerbaijão", "Bélgica", 
        "Bósnia e Herzegovina", "Bulgária", "Cazaquistão", "Chipre", "Croácia", 
        "Dinamarca", "Eslováquia", "Eslovênia", "Escócia", "Espanha", "Estônia", 
        "Finlândia", "França", "Geórgia", "Grécia", "Hungria", "Inglaterra", 
        "Irlanda", "Islândia", "Itália", "Moldávia", "Holanda", "Noruega", 
        "Polônia", "Portugal", "República Checa", "Romênia", "Rússia", "Sérvia", 
        "Suécia", "Suíça", "Turquia", "Ucrânia"
    ],
    "Ásia": [
        "Arábia Saudita", "Armênia", "Catar", "China", "Coreia do Sul", 
        "Iraque", "Israel", "Japão", "Malásia"
    ],
    Africa: [
        "África do Sul","Egito"
    ],
    Oceania: [
        "Austrália", "Nova Zelândia"
    ],
    "América do Sul": [
        "Argentina", "Bolívia", "Brasil", "Chile", "Colômbia", "Equador", 
        "Paraguai", "Peru", "Uruguai", "Venezuela"
    ],
    "América do Norte": [
        "Canadá", "Estados Unidos", "México"
    ]
};

  
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setNewProduct({ ...newProduct, country: selectedCountry, league: "" });
    setAvailableLeagues(leaguesByCountry[selectedCountry] || []);
  };
  const handleAddButtonClick = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };
  const handleEditClick = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: product.quantity,
      continente: product.continente,
      country: product.country,
      league: product.league
    });
    setAvailableCountries(countriesByContinent[product.continente] || []);
    setAvailableLeagues(leaguesByCountry[product.country] || []);
    setCurrentProductId(product.id);
    setEditMode(true);
    setShowModal(true);

  };
  
  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      description: "",
      image: "",
      quantity: "",
      continente: "",
      country: "",
      league: ""
    });
  };


  return (
    <>
    <main>
      <Container className="my-5">
        <h1>Painel de Administração</h1>
        <Row>
          <Col md={6}>
            <h3>Pedidos</h3>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>{order.status}</td>
                    <td>
                      <Form.Control
                        as="select"
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                      </Form.Control>
                      <Button
                        onClick={() => handleStatusChange(order.id)}
                        variant="primary"
                        className="mt-2"
                      >
                        Atualizar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <div className="d-flex gap-2 align-items-center">
              <h3>Estoque de Produtos</h3>
              <i className="fas fa-plus-circle" onClick={() => handleAddButtonClick()}></i>
            </div>

            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className="table-cell"  >{product.name}</td>
                    <td>R$ {product.price}</td>
                    <td>{product.quantity} unidades</td>
                    <td>
                      <Button variant="danger mx-3" onClick={() => deleteProduct(product.id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                      <Button variant="secondary mx-3" onClick={() => handleEditClick(product)}>
                      <i className="fas fa-edit"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton >
                <Modal.Title>{editMode ? "Editar Produto" : "Adicionar Produto"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addOrEditProduct} id="form">
                <Form.Group controlId="formProductName">
                    <Form.Label>Nome do Produto</Form.Label>
                    <Form.Control
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    maxLength={50}
                    />
                       <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    max={1000}
                    />
                    <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>

                </Form.Group>
                <Form.Group controlId="formProductDescription">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    maxLength={255}
                    required
                    />
                    <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>
                <Form.Group controlId="formProductImage">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    required
                    />
                    <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>
                <Form.Group controlId="formProductQuantity">
                    <Form.Label>Quantidade em Estoque</Form.Label>
                    <Form.Control
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    required
                    />
                    <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>
                
                <Form.Group controlId="formProductContinent">
                <Form.Label>Continente do Time</Form.Label>
                <Form.Control
                    as="select"
                    value={newProduct.continente}
                    onChange={handleContinentChange}
                    
                >
                    <option value="" disabled>{editMode ? "" : "Selecione um Continente"}</option>
                    {Object.keys(countriesByContinent).map((continente) => (
                    <option key={continente} value={continente}>{continente}</option>
                    ))}
                </Form.Control>
                <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>

                <Form.Group controlId="formProductCountry">
                <Form.Label>País</Form.Label>
                <Form.Control
                    as="select"
                    value={newProduct.country}
                    onChange={handleCountryChange}
                    disabled={!newProduct.continente}
                    required
                >
                    <option value="" disabled>{editMode ? "" : "Selecione um País"}</option>
                    {availableCountries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                    ))}
                </Form.Control>
                <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>

                <Form.Group controlId="formProductLeague">
                <Form.Label>Liga</Form.Label>
                <Form.Control
                    as="select"
                    value={newProduct.league}
                    onChange={(e) => setNewProduct({ ...newProduct, league: e.target.value })}
                    required
                >
                    <option value="" disabled>{editMode ? "" : "Selecione uma Liga"}</option>
                    {availableLeagues.map((league) => (
                    <option key={league} value={league}>{league}</option>
                    ))}
                </Form.Control>
                <Form.Text className="text-danger" hidden>Dado não preenchido</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    {editMode ? "Editar Produto" : "Adicionar Produto"}
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
      </Container>
    </main>
    </>
  );
}
