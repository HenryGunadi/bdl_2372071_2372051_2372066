import multer from "multer";

const imageUploadPath = "C:/Users/syehan_new/Desktop/bdl/bdl_2372071_2372051_2372066/client/public/assets/db";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function (req, file, cb) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    const filePath = `${file.fieldname}_date_${formattedDate}_${file.originalname}`;

    cb(null, filePath);
  },
});

const imageUpload = multer({ storage: storage });

export default imageUpload;
