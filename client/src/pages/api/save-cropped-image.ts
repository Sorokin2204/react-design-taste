import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "../../../public/image/image-cropped",
    filename: (
      req,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ): void => {
      callback(null, file.filename);
    },
  }),
});

export default nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => {
    res.status(405).send(`Method ${req.method} not allowed`);
  },

  onError: (err, req, res) => {
    res.status(404).send(`Error - ${err.message}`);
  },
})
  .use(upload.single("theImage"))
  .post((req, res) => {
    res.status(200).json("Image loaded");
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
