const sharp = require('sharp');

const fs = require('fs');

// remove all thumbnails
const clean = () => {
  try {
    if (!fs.existsSync('_site/images/thumbnails')) {
      fs.mkdirSync('_site/images/thumbnails', { recursive: true, mode: 0744 });
    }

    var files = fs.readdirSync('_site/images/thumbnails');
    files.forEach((fileName) => {
      try {
        fs.unlinkSync(`_site/images/thumbnails/${fileName}`);
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const isImage = (file) => {
  const re = /.*\.((png)|(jpg)|(jpeg)|(gif)|(webp))$/;
  return re.test(file);
};

async function generateThumbnail(filePath, thumbnailFilePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const newWidth = Math.floor((metadata.width * 150) / metadata.height);
    return await sharp(filePath).resize({ width: newWidth }).toFile(thumbnailFilePath);
  } catch (error) {
    return console.log(error);
  }
}

async function createThumbnails() {
  var files = fs.readdirSync('images/uploads');
  files.forEach((fileName) => {
    const filePath = `images/uploads/${fileName}`;
    const thumbnailFilePath = `_site/images/thumbnails/${fileName}`;
    if (isImage(fileName)) {
      generateThumbnail(filePath, thumbnailFilePath);
    }
  });
}

async function run() {
  await createThumbnails();
}

clean();
run();
