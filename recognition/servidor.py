from os import chdir, getcwd, listdir
import asyncio
from firebase import uploadFile
import torch
from torch import nn
import numpy as np
from train import detectar_faces
import cv2
from PIL import Image
import urllib.request
import uuid
from flask import Response
import os
import sys
from flask import *

from flask_cors import CORS

app = Flask(__name__)


app = Flask(__name__)


@app.route('/urlImg', methods=['GET'])
def urlImg():
    res = ''

    img = request.args.get("img")

    pathImg = ""

    try:

        nome = 'imagemTemp'

        if (not os.path.exists(nome)):

            os.makedirs(nome)

        pathImg = urllib.request.urlretrieve(

            img, nome+'/'+'1'+'.png')

        return reconhecer()

        # else:

        #     response = app.make_response(

        #     {"error": "Infelizmente não encontramos uma face correspondente"})

        #     response.status_code = 404

        #     return response

    except:

        erro = sys.exc_info()
        return erro


def reconhecer():

    metric = nn.L1Loss()

    missi_path = os.path.join(os.getcwd(), 'missi')

    pathImageTemp = './imagemTemp/1.png'

    src = cv2.imread(pathImageTemp)

    pixels = cv2.cvtColor(src, cv2.COLOR_BGR2RGB)
    feature = detectar_faces(pixels)

    reconhecido = False

    try:

        for user in os.listdir(missi_path):

            referencia = np.load(os.path.join(
                missi_path, user, 'referencia.npz'))

            all_features = referencia['all_feats']

            mean = referencia['mean']

            std = referencia['std']

            all_dist = []

            for feat in all_features:

                all_dist.append(metric(feature, torch.from_numpy(feat)))

            # Critério de identificação. Para cada usuário:

            #    calcule a média da distância da nova imagem com todas as imagens de referência

            #    compare com a média da diferença das imagens de referência entre si

            #    se a diferença estiver dentro de 1 desvio padrão, é possível que seja a pessoa!

            if abs(np.mean(all_dist) - mean) < std:

                print('Identidade:', user)

                reconhecido = True

                BASE_DIR = os.path.dirname(os.path.abspath(__file__))

                image_dir = os.path.join(BASE_DIR, "missi")

                for root, dirs, files in os.walk(image_dir):

                    if (len(dirs) > 0):

                        for i in range(len(dirs)):

                            if (dirs[i] == user):

                                path = root + '/' + dirs[i]

                                img = listdir(root + '/' + dirs[i])[0]

                imgMatch = uploadFile(path + '/'+img, img)

                # "img": imgMatch

                response = app.make_response(

                    {"nome": user, "img": imgMatch})

                response.status_code = 200
                return response

        if not reconhecido:

            print('Usuário não identificado')

            response = app.make_response(

                {"error": "Infelizmente não encontramos uma face correspondente"})

            response.status_code = 404
            return response

    except:

        erro = sys.exc_info()

        return {"error": "Não encontramos uma face"}


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=True)
