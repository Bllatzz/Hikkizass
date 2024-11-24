import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../scss/login.scss"; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isLoginView, setIsLoginView] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [serverMessage, setServerMessage] = useState(""); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim() === "") {
      setFormErrors({ ...formErrors, [name]: "Campo não preenchido" });
    } else {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && (!isLoginView || key !== "name")) {
        errors[key] = "Campo não preenchido";
      }
    });
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const endpoint = isLoginView
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/users/register";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          const errorText = await response.text(); 
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.message || "Erro na requisição");
          } catch {
            throw new Error(errorText || "Erro desconhecido");
          }
        }
  
        const data = await response.json();
  
        if (isLoginView) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setServerMessage("Login realizado com sucesso!");
          navigate("/");
        } else {
          setServerMessage("Registro realizado com sucesso! Faça login.");
          setIsLoginView(true);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        setServerMessage(error.message || "Erro ao conectar ao servidor.");
      }
    }
  };
  
  

  return (
    <Container fluid className="login-wrapper d-flex align-items-center justify-content-center bg-light">
      <Card className="login-card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body>
          <div className="d-flex justify-content-center mb-4">
            <Button
              variant={isLoginView ? "primary" : "outline-primary"}
              className={`me-2 ${isLoginView ? "btn-lg" : "btn-outline-secondary"}`}
              onClick={() => {
                setIsLoginView(true);
                setServerMessage(""); 
              }}
              style={{ borderRadius: "20px" }}
            >
              Login
            </Button>
            <Button
              variant={!isLoginView ? "success" : "outline-success"}
              className={`${!isLoginView ? "btn-lg" : "btn-outline-secondary"}`}
              onClick={() => {
                setIsLoginView(false);
                setServerMessage(""); 
              }}
              style={{ borderRadius: "20px" }}
            >
              Registrar
            </Button>
          </div>

          {serverMessage && (
            <div className={`alert ${serverMessage.includes("sucesso") ? "alert-success" : "alert-danger"} text-center`}>
              {serverMessage}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {!isLoginView && (
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-pill"
                />
                {formErrors.name && (
                  <small className="text-danger">{formErrors.name}</small>
                )}
              </Form.Group>
            )}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-pill"
              />
              {formErrors.email && (
                <small className="text-danger">{formErrors.email}</small>
              )}
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleInputChange}
                className="rounded-pill"
              />
              {formErrors.password && (
                <small className="text-danger">{formErrors.password}</small>
              )}
            </Form.Group>
            <Button
              type="submit"
              variant={isLoginView ? "primary" : "success"}
              className="w-100 py-2 rounded-pill shadow-sm"
            >
              {isLoginView ? "Logar" : "Registrar"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
