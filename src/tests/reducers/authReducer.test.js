import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas de authReducer', () => {

    test('debe realizar el login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Victor'
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({
            uid: 'abc',
            name: 'Victor'
        })
        
    })

    test('debe realizar el logout', () => {

        const initState = {
            uid: 'abc',
            name: 'Victor'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({});

    })

    test('no debe realizar cambios en el state', () => {

        const initState = {
            uid: 'fasdfasfd123165',
            name: 'Victor'
        };

        const action = {
            type: 'fdasfasd'
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(initState);

    })
    
})
