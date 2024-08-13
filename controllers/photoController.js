import Photo from '../models/photoModel.js';

const createPhoto = async (req,res) => {
    try {
        const photo = await Photo.create(req.body)
        res.status(201).json({
            succeded:true,
            photo,
        });
        
    } catch (error) {
        res.status(500).json({
            succeded:false,
            error,
        });   
    }
};
const getAllPhotos = async (req, res) => {
    try {
      const photos = res.locals.user
        ? await Photo.find({ user: { $ne: res.locals.user._id } })
        : await Photo.find({});
      res.status(200).render('photos', {
        photos,
        link: 'photos',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };
  
export {createPhoto, getAllPhotos};