// SECRET tcphPfGyLYeY3dF5mCSWZlezNgE
//KEY tcphPfGyLYeY3dF5mCSWZlezNgE
// Cloud name: dlo2h0nxp

import { v2 as cloudinary } from 'cloudinary';

 cloudinary.config({ 
        cloud_name: 'dlo2h0nxp', 
        api_key: '157843767934159', 
        api_secret: 'tcphPfGyLYeY3dF5mCSWZlezNgE' // Click 'View API Keys' above to copy your API secret
    });

// (async function() {

//     // Configuration
   
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();
export default cloudinary;