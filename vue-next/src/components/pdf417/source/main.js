import createPDF417 from './pdf417-min'

function drawBarcode(canvas, barcodeMatrix, blockWidth, blockHeight, color = '#000000', background = '#FFFFFF') {
  const ctx = canvas.getContext('2d')
  let positionY = 0
  for (let row = 0; row < barcodeMatrix.num_rows; row += 1) {
    let positionX = 0
    for (let col = 0; col < barcodeMatrix.num_cols; col += 1) {
      if (barcodeMatrix.bcode[row][col] === '1') {
        ctx.fillStyle = color
      } else {
        ctx.fillStyle = background
      }
      ctx.fillRect(positionX, positionY, blockWidth, blockHeight);
      positionX += blockWidth
    }
    positionY += blockHeight
  }
}

export default function generateBarcode(text,  color, background) {
  const canvas = document.createElement('canvas')
  const PDF417 = createPDF417()
  PDF417.init(text)
  const barcodeMatrix = PDF417.getBarcodeArray()
  canvas.width = 5 * barcodeMatrix.num_cols
  canvas.height = 5 * barcodeMatrix.num_rows
  drawBarcode(canvas, barcodeMatrix, 5, 5, color, background)
  const base64 = canvas.toDataURL()
  return base64
}
