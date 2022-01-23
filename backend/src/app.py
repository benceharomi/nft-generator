import glob
import os
import shutil
from flask import Flask,  request,  send_file
from flask_cors import CORS
from PIL import Image
from nft_generator import generate_nft_zip

TMP_FOLDER_PATH = './.tmp'

app = Flask(__name__)
CORS(app)

@app.route('/generate-nfts', methods=['POST'])
def generate_nfts():
  try:
    set1 = request.files.getlist('set1')
    set2 = request.files.getlist('set2')

    set_1_images = []
    set_2_images = []
    for img in set1:
      set_1_images.append(Image.open(img))
    for img in set2:
      set_2_images.append(Image.open(img))

    if(glob.glob(TMP_FOLDER_PATH)):
      shutil.rmtree(TMP_FOLDER_PATH)
    os.mkdir(TMP_FOLDER_PATH)

    generate_nft_zip(set_1_images , set_2_images, TMP_FOLDER_PATH)
    return send_file('{}/nfts.zip'.format(TMP_FOLDER_PATH), as_attachment=True)
  except Exception as e:
    print(e)
    return 'error'
  finally:
    if(glob.glob(TMP_FOLDER_PATH)):
      shutil.rmtree(TMP_FOLDER_PATH)


if __name__ == "__main__":
    app.run(host='localhost', port='3001')