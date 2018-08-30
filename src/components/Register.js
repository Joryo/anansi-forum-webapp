import React from 'react'
import { Button, Form, FormGroup, Label, Input, NavLink, FormFeedback } from 'reactstrap';
import RegisterStyle from '../styles/register.js'

// RegistForm component - Display a form for subscribing
let registerForm = ({values, errors, handleSubmit, handleChange, handleBlur}) => {
    return (
        <div>
            <div style={RegisterStyle.form}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="_title">Email</Label>
                        <Input
                            type="text"
                            id="email"
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
                        <Label for="_text">Pseudo</Label>
                        <Input
                            type="text"
                            id="pseudo"
                            value={values.pseudo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.pseudo ? true : false}
                        />
                        {errors.pseudo &&
                            <FormFeedback>{errors.pseudo}</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="_text">Mot de passe</Label>
                        <Input
                            type="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.password ? true : false}
                        />
                        {errors.password &&
                            <FormFeedback>{errors.password}</FormFeedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="_text">Confirmation mot de passe</Label>
                        <Input
                            type="password"
                            id="passwordConfirmation"
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={errors.passwordConfirmation ? true : false}
                        />
                        {errors.passwordConfirmation &&
                            <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
                        }
                    </FormGroup>
                    <Button>S'enregister</Button>
                </Form>
            </div>
            <NavLink href="/" style={RegisterStyle.loginLink}>J'ai déjà un compte</NavLink>
        </div>
    )
}

export default registerForm
