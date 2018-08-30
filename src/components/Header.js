import React from 'react'
import { NavLink as routeLink } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import Icon from 'react-icons-kit'
import { pencil, list, userCircle, search } from 'react-icons-kit/fa/'
import HeaderStyle from '../styles/header.js'

// Header component - Display a navigation bar on the top of the page
const Header = ({ onLogoutClick, pseudo, isOpen, toggle }) => (
    <div>
        <Navbar expand="md" dark color="primary">
            <NavbarBrand href="/"><img src='/big-logo-horizontal.png' alt='AnansiForum' style={HeaderStyle.logo}/></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml" navbar >
                    <NavItem>
                        <NavLink tag={routeLink} to='/posts'><Icon icon={list} style={HeaderStyle.icon}/> Derniers sujets</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={routeLink} to='/post/create'><Icon icon={pencil} style={HeaderStyle.icon}/> Nouveau sujet</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar >
                    <Form inline action="/search" method="GET">
                        <InputGroup >
                            <Input name="query" type="search" placeholder="Chercher un post" aria-label="Rechercher"/>
                            <InputGroupAddon addonType="append"><Button type="submit"><Icon icon={search}/></Button></InputGroupAddon>
                        </InputGroup>
                    </Form>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <Icon icon={userCircle} style={HeaderStyle.icon}/> {pseudo}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={routeLink} to='/account'>
                                Mon compte
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={onLogoutClick}>
                                Se déconnecter
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
)

export default Header




