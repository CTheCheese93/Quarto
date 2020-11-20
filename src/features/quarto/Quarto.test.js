import React from 'react'
import { render, screen } from '@testing-library/react'
import Quarto from './Quarto'
import store from '../../app/store'
import { Provider } from 'react-redux'


describe('Quarto App', () => {
    it('Renders Quarto component', () => {
        render(
        <Provider store={store}>
            <Quarto />
        </Provider>
        )
    })
})