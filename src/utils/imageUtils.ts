/**
 * Esta função cria uma imagem recortada com base nas coordenadas fornecidas
 * @param imageSrc - URL da imagem original
 * @param pixelCrop - Coordenadas do recorte (x, y, width, height)
 * @returns Promise com a URL da imagem recortada
 */
export const createCroppedImage = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> => {
  const image = new Image();
  image.src = imageSrc;
  
  // Criar um canvas para desenhar a imagem recortada
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Aguardar o carregamento da imagem
  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  // Definir as dimensões do canvas para o tamanho do recorte
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Desenhar a parte recortada da imagem no canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Converter o canvas para uma URL de dados (base64)
  return canvas.toDataURL('image/jpeg');
};
