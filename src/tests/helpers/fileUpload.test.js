import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dfz2jhlae', 
    api_key: '843213593695811', 
    api_secret: 'E6u2Gx1gC2Bv0xiMP1Taw3u85dY' 
});

describe('Pruebas en fileUpload', () => {

    test('debe cargar un archivo y retornar el URL', async() => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png')
        const url = await fileUpload(file)

        expect(typeof url).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.png','')
        // console.log(segments)

        await cloudinary.v2.api.delete_resources(imageId);

    })

    test('debe retornar un error', async() => {

        const file = new File([], 'foto.png')
        const url = await fileUpload(file)

        expect(url).toBe(null);

    })
    
    
})
