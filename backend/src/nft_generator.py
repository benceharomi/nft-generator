from PIL import Image
import zipfile
import os, os.path
import glob

def merge_images(image_1, image_2):
  if(image_1.size != image_2.size):
    raise Exception('differing size')

  [width, height] = image_1.size

  half_height = int(height/2)

  top = image_1.crop((0, 0, width, half_height))
  bottom = image_2.crop((0, half_height, width, height))

  generated = Image.new('RGB', (width, height))
  generated.paste(top, (0,0))
  generated.paste(bottom, (0,half_height))

  return generated


def merge_set_of_images(set_1, set_2, dir_path):
  index = 0
  for image_1 in set_1:
    for image_2 in set_2:
      image = merge_images(image_1, image_2)
      file_path = '{}/image_{}.jpg'.format(dir_path, index) 
      image.save(file_path)
      index += 1
      

def prepare_zip(dirPath):
  images = [name for name in glob.glob('{}/*.jpg'.format(dirPath)) if os.path.isfile(name)]
  
  zip = zipfile.ZipFile('{}/nfts.zip'.format(dirPath), 'w', zipfile.ZIP_DEFLATED)

  for index, image in enumerate(images):
    zip.write(image, './nfts/nft_{}.jpg'.format(index))
    index += 1

  zip.close()
  print("File Created successfully..")


def generate_nft_zip(set_1, set_2, tmp_folder_path):
    merge_set_of_images(set_1, set_2, tmp_folder_path)
    prepare_zip(tmp_folder_path)
