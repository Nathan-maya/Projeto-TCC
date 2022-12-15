import cv2
import os
from train import detectar_faces

import numpy as np

from torch import nn

import torch


def reconhecer():

    metric = nn.L1Loss()

    missi_path = os.path.join(os.getcwd(), 'missi')

    pathImageTemp = './imagemTemp/1.png'

    src = cv2.imread(pathImageTemp)

    pixels = cv2.cvtColor(src, cv2.COLOR_BGR2RGB)

    feature = detectar_faces(pixels)
    reconhecido = False
    for user in os.listdir(missi_path):

        referencia = np.load(os.path.join(missi_path, user, 'referencia.npz'))

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
            return user

    if not reconhecido:

        print('Usuário não identificado')

        return 0


# reconhecer()
