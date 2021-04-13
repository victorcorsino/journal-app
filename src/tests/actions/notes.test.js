/**
 * @jest-environment node
*/

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'
import { fileUpload } from '../../helpers/fileUpload'

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg')
    })

    // __esModule: true,
    // default: jest.fn( () => 'https://hola-mundo.com/cosa.jpg'),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '0RyQFSisyTeflmH1BIsl',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState)

global.scrollTo = jest.fn(); 

describe('Pruebasa con las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore(initState)
    });

    test('debe crear una nueva nota StartNew Note', async () => {

        await store.dispatch(startNewNote())

        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // console.log(actions[0].payload.id)
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    })

    test('startLoadingNotes debe cargar las notas', async () => {

        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        // console.log(actions)

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);

    })

    test('startSaveNote debe actualizar la nota', async() => {
        
        const note = {
            id: '0RyQFSisyTeflmH1BIsl',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        // console.log(actions)

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);
    })

    test('startUploading debe de actualizar el url del entry', async() => {

        const file = new File([], 'foto.jpg');

        await store.dispatch(startUploading(file))

        const docRef = await db.doc(`/TESTING/journal/notes/0RyQFSisyTeflmH1BIsl`)
        
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    })
    
    


})
