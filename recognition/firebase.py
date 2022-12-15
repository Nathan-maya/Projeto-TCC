
import firebase_admin
from firebase_admin import credentials, storage, initialize_app

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {'storageBucket': 'missing-24d33.appspot.com'})

def uploadFile(path,name):
  # Put your local file path
  fileName = path
  bucket = storage.bucket()
  blob = bucket.blob(name)
  print(name)
  blob.upload_from_filename(fileName)

  # Opt : if you want to make public access from the URL
  blob.make_public()

  return blob.public_url
