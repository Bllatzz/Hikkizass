import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUser, faSearch, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../scss/header.scss';

import { leaguesByCountry, countriesByContinent,times} from '../assets/ligas';

export default function Header() {
    const renderLeaguesOrTeams = (country) => {
        const leagues = leaguesByCountry[country];
        if (!leagues || leagues.length === 0) {
            return <Dropdown.Item disabled>Sem ligas disponíveis</Dropdown.Item>;
        }
    
        return leagues.map((league) => {
            const leagueTeams = times.find((t) => t.liga === league)?.times || [];
    
            if (leagueTeams.length > 0 && leagueTeams.length < 6) {
                return leagueTeams.map((team) => (
                    <Dropdown.Item key={team} href="#">
                        {team}
                    </Dropdown.Item>
                ));
            }
    
            return (
                <Dropdown.Item key={league} href="#">
                    {league}
                </Dropdown.Item>
            );
        });
    };
    
    

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <img id="logo" src="hikki.png" alt="Logo" style={{ height: '85px', marginRight: '10px' }} />
                <Navbar.Brand>Hikkizas</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Início</Nav.Link>

                        <Dropdown as={Nav.Item} className="products-dropdown">
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-produtos" variant="link">
                                Produtos
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="region-dropdown">
                                {Object.keys(countriesByContinent).map((continent) => {
                                    const countries = countriesByContinent[continent];
                                    if (!countries) {
                                        return null;
                                    }

                                    return (
                                        <Dropdown key={continent} as={Nav.Item} drop="end" className="continent-item">
                                            <Dropdown.Toggle variant="light" id={`dropdown-${continent}`} className="continent-dropdown-toggle">
                                                {continent}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align="end" className="country-dropdown">
                                                {countries.map((country) => {
                                                    return (
                                                        <Dropdown key={country} as={Nav.Item} drop="end" className="country-item">
                                                            <Dropdown.Toggle variant="light" id={`dropdown-${country}`} className="country-dropdown-toggle">
                                                                {country}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className="league-dropdown">
                                                                {renderLeaguesOrTeams(country)}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    );
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Nav.Link as={Link} to="/about">Sobre</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contato</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/user"><FontAwesomeIcon icon={faUser} /> Login / Register</Nav.Link>
                        <Nav.Link as={Link} to="/search"><FontAwesomeIcon icon={faSearch} /></Nav.Link>
                        <Nav.Link as={Link} to="/carrinho"><FontAwesomeIcon icon={faCartShopping} /></Nav.Link>
                        <Nav.Link as={Link} to="/favorites"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
