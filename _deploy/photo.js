const sharp = require('sharp');

const fs = require('fs');

// remove all photo
const clean = () => {
  try {
    if (!fs.existsSync('generatedphotos')) {
      fs.mkdirSync('generatedphotos', { recursive: true, mode: 0744 });
    }

    var files = fs.readdirSync('generatedphotos');
    files.forEach((fileName) => {
      try {
        fs.unlinkSync(`generatedphotos/${fileName}`);
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

async function generatePhoto(filePath, fileName) {
  try {
    const photoName = fileName.replace(/\.([a-z]+)$/, '');
    const photoFilePath = `generatedphotos/${photoName.replace('_', '-')}.json`;
    fs.appendFileSync(
      photoFilePath,
      JSON.stringify({
        name: photoName.replace('_', ' ').toLowerCase(),
        image: '/' + filePath,
        category: photoName.split('_')[0].toLowerCase(),
      })
    );
  } catch (error) {
    return console.log(error);
  }
}

async function createPhotos() {
  var files = fs.readdirSync('images/uploads');
  files.forEach((fileName) => {
    const filePath = `images/uploads/${fileName}`;
    const photoName = fileName.replace(/\.([a-z]+)$/, '');

    if (isImage(fileName)) {
      console.log(`[photo] process ${fileName}`);
      generatePhoto(filePath, fileName);
    }
  });
}

async function run() {
  await createPhotos();
}

clean();
run();
