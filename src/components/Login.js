import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink, FormFeedback } from 'reactstrap';
import LoginStyle from '../styles/login.js'

// Login component - Display a login page for unconnected user
let Login = ({values, errors, handleSubmit, handleChange, handleBlur}) => (
    <div>
        <div style={LoginStyle.form}>
            <img src='/big-logo-vertical.png' alt='AnansiForum' style={LoginStyle.logo}/>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="_email" hidden>Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={errors.email ? true : false}
                    />
                    {errors.email &&
                        <FormFeedback>{errors.email}</FormFeedback>
                    }
                </FormGroup>
                <FormGroup>
                    <Label for="_password" hidden>Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormGroup>
                <Button>Se connecter</Button>
            </Form>
        </div>
        <NavLink href="/register" style={LoginStyle.createLink}>Créer un compte</NavLink>
    </div>
)

export default Login
