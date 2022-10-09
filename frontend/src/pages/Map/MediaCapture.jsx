import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
// import mui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Container from '@mui/material/Container';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { getUXOBoundingBoxes } from "utils/api";

export default function MediaCapture() {
  const { t } = useTranslation(); // for translation
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doneDetect, setDoneDetect] = useState(false);
  const [predictions, setPredictions] = useState({});
  const [filename, setFilename] = useState("");
  const [open, setOpen] = useState(false);
  const canvas = useRef();
  let ctx = null;


  // let INPUT_DATA_FILE="INPUT-JSON"

  // initialize the canvas context
  useEffect(() => {
    if (doneDetect) {
      // dynamically assign the width and height to canvas
      const canvasEle = canvas.current;
      canvasEle.width = canvasEle.parentElement.clientWidth;
      canvasEle.height = canvasEle.parentElement.clientHeight;
      // get context of the canvas
      ctx = canvasEle.getContext("2d");
      let bboxes = predictions.bboxes;
      for (let i = 0; i < bboxes.length; i++) {
        let box = bboxes[i]
        let displayName = predictions.displayNames[i]
        let confidence = predictions.confidences[i]
        let x0, x1, y0, y1;
        x0 = box[0];
        x1 = box[1];
        y0 = box[2];
        y1 = box[3];
        let r1Info = { x: canvasEle.width * x0, y: canvasEle.height * y0, w: canvasEle.width * x1 - canvasEle.width * x0, h: canvasEle.height * y1 - canvasEle.height * y0, confidence: confidence, displayName: displayName }
        const r1Style = { borderColor: 'red', borderWidth: 2 };
        drawRect(r1Info, r1Style);
      }

    }
  }, [doneDetect])

  // draw rectangle
  const drawRect = (info, style = {}) => {
    const { x, y, w, h, confidence, displayName } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`${displayName}: ${confidence.toFixed(3) * 100}%`, x, y - 5);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async ({ target }) => {
    setDoneDetect(false);
    setImgSrc(null);
    // console.log(target.files)
    const base64 = await convertBase64(target.files[0]);
    setFilename(target.files[0].name);
    setImgSrc(base64);
  }

  const handleDetect = () => {
    setIsLoading(true);
    // console.log("detecting")
    (async () => {
      try {
        console.log("sending api")
        // console.log(imgSrc)
        let res = await getUXOBoundingBoxes(imgSrc.split(",")[1])
        // console.log(res)
        let predictions = JSON.parse(res.data[0]).predictions[0]
        // console.log(JSON.stringify(predictions))
        setPredictions(predictions)
        setIsLoading(false);
        setDoneDetect(true);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        setOpen(true);
      }
    })();
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Box
        sx={{
          background: '#D22108',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          mb: 2,
          pb: 2
        }}>

        <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
          <div className="mt-3">
            <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
              {t('maps.page_title')}
            </Typography>
          </div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <div>
          <Typography variant="subtitle1" color="#D22108" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
            {filename.length !== 0 ?
              t("maps.selected_file") + filename :
              t('maps.select_file')
            }
          </Typography>
          {imgSrc ?
            <div>
              <div style={{ position: "relative", margin: '10px 0' }}>
                <img
                  alt={filename}
                  src={imgSrc}
                  width={"100%"}
                />

                <div style={{ position: "absolute", top: "0", zIndex: "3", width: '100%', height: '100%' }}>
                  <canvas ref={canvas}></canvas>
                </div>
              </div>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                  {t('maps.reupload')}
                  <input hidden accept="image/jpeg, image/png, image/webp" type="file" onChange={handleImage} />
                </Button>
                <Button variant="contained" component="label" startIcon={isLoading ? <CircularProgress color="white" size={20} /> : <FindInPageIcon />} onClick={() => handleDetect()}>
                  {t('maps.detect')}
                </Button>
              </Stack>
            </div>
            :
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                {t('maps.upload')}
                <input hidden accept="image/jpeg, image/png, image/webp" type="file" onChange={handleImage} />
              </Button>
            </div>}
        </div>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          maxWidth: 'xs',
          '& .MuiDialog-paper': { borderRadius: 3, maxHeight: 435 }
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('maps.err_msg')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& .MuiDialogActions-root': { flex: 'none' } }}>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            {t('maps.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}
