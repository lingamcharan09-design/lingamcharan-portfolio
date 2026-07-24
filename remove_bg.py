import rembg; from PIL import Image; input = Image.open('assets/images/portrait.jpg'); output = rembg.remove(input); output.save('assets/images/portrait.png')
