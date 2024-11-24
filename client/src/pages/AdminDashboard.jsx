import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../scss/admin.scss';
import { countriesByContinent, leaguesByCountry } from "../assets/ligas";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const categories = ["Unisex", "Masculino", "Feminino", "Conjunto", "Acessórios", "Infantis"];

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [availableLeagues, setAvailableLeagues] = useState([]);
  const [availableCountries, setAvailableCountries] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    quantity: "",
    continente: "",
    country: "",
    league: "",
    category: ""
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role !== 'admin') {
          navigate('*');
        }
      } catch (error) {
        navigate('*');
      }
    };

    fetchProfile();
  }, [navigate]);

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
    const formData = new FormData();

    Object.keys(newProduct).forEach((key) => {
      if (key === 'image' && newProduct[key] instanceof File) {
        formData.append(key, newProduct[key]);
      } else if (key !== 'image') {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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

  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;
    setNewProduct({ ...newProduct, continente: selectedContinent, country: "" });
    setAvailableCountries(countriesByContinent[selectedContinent] || []);
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
      image: null, 
      quantity: product.quantity,
      continente: product.continente,
      country: product.country,
      league: product.league,
      category: product.category 
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
      league: "",
      category: ""
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
            <Modal.Header closeButton>
              <Modal.Title>{editMode ? "Editar Produto" : "Adicionar Produto"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={addOrEditProduct}>
                <Form.Group controlId="formProductCategory">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Control
                    as="select"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecione uma Categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductName">
                  <Form.Label>Nome do Produto</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProductImage">
                  <Form.Label>Imagem do Produto</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                  />
                </Form.Group>
                <Form.Group controlId="formProductQuantity">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formProductContinent">
                  <Form.Label>Continente</Form.Label>
                  <Form.Control
                    as="select"
                    value={newProduct.continente}
                    onChange={handleContinentChange}
                    required
                  >
                    <option value="" disabled>Selecione um Continente</option>
                    {Object.keys(countriesByContinent).map((continent) => (
                      <option key={continent} value={continent}>{continent}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductCountry">
                  <Form.Label>País</Form.Label>
                  <Form.Control
                    as="select"
                    value={newProduct.country}
                    onChange={handleCountryChange}
                    required
                    disabled={!newProduct.continente}
                  >
                    <option value="" disabled>Selecione um País</option>
                    {availableCountries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductLeague">
                  <Form.Label>Liga</Form.Label>
                  <Form.Control
                    as="select"
                    value={newProduct.league}
                    onChange={(e) => setNewProduct({ ...newProduct, league: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecione uma Liga</option>
                    {availableLeagues.map((league) => (
                      <option key={league} value={league}>{league}</option>
                    ))}
                  </Form.Control>
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
