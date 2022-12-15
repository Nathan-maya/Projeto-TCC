import os

import requests
from torch import nn

from PIL import Image

import numpy as np

import matplotlib.pyplot as plt

from torchvision import transforms
import torch
import mtcnn

from resnet50_ft_dag import resnet50_ft_dag


detector = mtcnn.MTCNN()

# model = resnet50_ft_dag()

model = torch.hub.load("pytorch/vision", "resnet152", weights="IMAGENET1K_V2")

model.eval()


# Função para extração de características a partir de uma imagem
def detectar_faces(pixels):
    pixels = np.array(pixels, dtype=np.uint8)

    # Recortando a face com o mtcnn
    faces = detector.detect_faces(pixels)

    # print(faces)

    x, y, width, height = faces[0]['box']

    face = pixels[y:y+height, x:x+width]

    # Plot da imagem e da face recortada

    fig, axs = plt.subplots(1, 2, figsize=(12, 5))

    axs[0].imshow(pixels)

    axs[1].imshow(face)

    # extrai caracteristicas de alto nível

    face = Image.fromarray(face, 'RGB')

    face = transforms.Resize((224, 224))(face)

    face = transforms.ToTensor()(face).unsqueeze(0)

    feature = model(face)

    return feature.detach().cpu().data.squeeze()


missi_path = os.path.join(os.getcwd(), 'missi')

# imagem = Image.open(os.path.join(missi_path, '11933434150Nathan Maia', '1.png'))

# feature = extract_features(imagem)

# print(feature.shape)


metric = nn.L1Loss()


def registra_usuario(usuario):

    miss_path = os.path.join(missi_path, usuario)

    all_features = []

    for img in os.listdir(miss_path):

        if img[-3:] != 'png':
            continue

        print(img)

        pixels = Image.open(os.path.join(miss_path, img))
        feature = detectar_faces(pixels)

        all_features.append(feature)

    all_losses = []

    for k in range(len(all_features)):

        for j, feat in enumerate(all_features):

            if k == j:
                continue

            all_losses.append(metric(all_features[k], feat))

    all_losses = np.asarray(all_losses)

    print(np.mean(all_losses), np.std(all_losses))

    all_features = np.asarray([feat.numpy() for feat in all_features])

    np.savez_compressed(os.path.join(miss_path, 'referencia'), all_feats=all_features,

                        mean=np.mean(all_losses),
                        std=np.std(all_losses))


# Iteração em todos os usuários
for miss in os.listdir(missi_path):
    print(miss)

    print(miss.capitalize())

    registra_usuario(miss)
