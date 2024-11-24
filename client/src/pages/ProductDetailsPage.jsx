import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../scss/product.scss';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNumberField, setShowNumberField] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/products/slug/${slug}`
                );
                if (response.data) {
                    setProduct(response.data);
                } else {
                    navigate('/not-found');
                }
            } catch (err) {
                console.error(err);
                navigate('/not-found'); 
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger mt-5">
                <p>{error}</p>
            </div>
        );
    }

    if (!product) {
        return null; 
    }

    return (
        <div className="container my-5">
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={`http://localhost:5000${product.image}`}
                            alt={product.name}
                            className="img-fluid rounded-start w-100"
                            style={{ mixHeight: "450px", objectFit: "cover" }}
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title">{product.name}</h3>
                            <h4 className="text-muted">R$ {parseFloat(product.price).toFixed(2)}</h4>
                            
                            <div className="mb-3">
                                <label className="form-label">Tamanho:</label>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value="p1">P</option>
                                    <option value="m1">M</option>
                                    <option value="g1">G</option>
                                    <option value="gg1">GG</option>
                                    <option value="xg1">XGG - 2XL +R$10.00</option>
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Nome na Camisa:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Digite o nome" 
                                    onChange={(e) => setShowNumberField(e.target.value.trim() !== '')}
                                />
                                <small className='text-muted'>*AO DIGITAR O NOME, APARECERÁ PARA POR O NÚMERO DESEJADO</small>
                            </div>

                            {showNumberField && (
                                <div className="mb-3">
                                    <label className="form-label">Número na Camisa:</label>
                                    <input type="number" className="form-control" placeholder="Digite o número" />
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">PATCH:</label>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value="patchcopa">PATCH CAMPEÃO DO MUNDO +R$10.00</option>
                                    <option value="patch1">PATCH LIGA NACIONAL +R$10.00</option>
                                    <option value="patch2">PATCH CAMPEÃO NACIONAL +R$10.00</option>
                                    <option value="patch3">PATCH CHAMPIONS +R$10.00</option>
                                    <option value="patch4">PATCH CAMPEÃO LIBERTADORES +R$10.00</option>
                                    <option value="patch5">PATCH CHAMPIONS LIGUE +R$10.00</option>
                                    <option value="patch6">PATCH LIBERTADORES +R$10.00</option>
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Quantidade:</label>
                                <input type="number" className="form-control" min="1" defaultValue="1" />
                            </div>

                            <button className="btn btn-success btn-lg w-100">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Descrição
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`}
                            onClick={() => setActiveTab('additional')}
                        >
                            Informação adicional
                        </button>
                    </li>
                </ul>
                <div className="tab-content p-3">
                    {activeTab === 'description' && (
                        <div className="tab-pane fade show active">
                            <p>{product.description}</p>
                        </div>
                    )}
                    {activeTab === 'additional' && (
                        <div className="tab-pane fade show active">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Peso</th>
                                        <td>1 kg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
