import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
/* import { MemoryRouter } from 'react-router-dom' */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import '@testing-library/jest-dom'
import { /* startLoginEmailPassword, */ startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: '1',
        name: 'Victor'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState)

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
)

describe('Pruebas en <Sidebar />', () => {

    test('debe mostrarse correctamente', () => {
        //snapshot
        expect(wrapper).toMatchSnapshot();

    })

    test('debe llamar el startLogout', () => {
        //debe llamar la accion del logout
        wrapper.find('button').prop('onClick')()

        expect(startLogout).toHaveBeenCalled()
    })

    test('debe llamar el startNewNote', () => {
        //debe llamar la accion startNewNote
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled()
    })




})
