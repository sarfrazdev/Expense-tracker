import multer from "multer";


//configure storage


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

//file filter 

const fileFilter = (req, file, cb) => { 
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed."), false);
    }
}
export const upload = multer({
    storage,fileFilter
})
