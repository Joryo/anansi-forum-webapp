import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import PostFormStyle from '../styles/postForm.js'
import CategoriesSelector from '../containers/CategoriesSelector.js'

// PostForm component - Display the form for make a new post
let postForm = ({
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    update
}) => (
    <div style={PostFormStyle.form}>
        <Form onSubmit={handleSubmit}>
            <Label for="_title">Tags</Label>
            <CategoriesSelector
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                defaultValues = {values.tags}
            />
            <br/>
            <FormGroup>
                <Label for="_title">Titre</Label>
                <Input
                    type="text"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.title ? true : false}
                />
                {errors.title &&
                    <FormFeedback>{errors.title}</FormFeedback>
                }
            </FormGroup>
            <FormGroup>
                <Label for="_text">Texte</Label>
                <Input
                    type="textarea"
                    id="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows = "15"
                    invalid={errors.text ? true : false}
                />
                {errors.text &&
                    <FormFeedback>{errors.text}</FormFeedback>
                }
            </FormGroup>
            { update ? (
                <Button color='primary'>Mettre à jour</Button>
            ) : (
                <Button color='primary'>Poster</Button>
            )}
        </Form>
    </div>
)

export default postForm
