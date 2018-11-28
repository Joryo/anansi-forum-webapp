import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import AccountStyle from '../styles/account.js'

// Account component - Display the account form for profile edition
let accountForm = ({values, errors, handleSubmit, handleChange, handleBlur, onFormSend}) => (
    <div>
        <div>
            <Form onSubmit={handleSubmit} style={AccountStyle.form}>
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
                    <Label for="_text">Changer le mot de passe</Label>
                    <Input
                        type="password"
                        id="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={errors.newPassword ? true : false}
                    />
                    {errors.newPassword &&
                        <FormFeedback>{errors.newPassword}</FormFeedback>
                    }
                </FormGroup>
                <Button color="primary" onClick={(e) => {onFormSend('update', values, handleSubmit, e)}}>
                    Mettre à jour mes données
                </Button>{'  '}
                <Button color="danger" onClick={(e) => {onFormSend('delete', values, handleSubmit, e)}}>
                    Supprimer mon compte
                </Button>
            </Form>

        </div>
    </div>
)


export default accountForm
