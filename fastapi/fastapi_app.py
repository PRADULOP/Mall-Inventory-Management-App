from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
import faiss
import pymongo
from PIL import Image
import io
import requests
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
import uvicorn

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Enable CORS (Allow Frontend Requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Allow React Frontend
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# ✅ MongoDB Connection
mongo_client = pymongo.MongoClient("mongodb+srv://pradul:Brook1234@cluster1.xnseu.mongodb.net/")
db = mongo_client["test"]
products_collection = db["products"]

# ✅ Load the Saved Model
model = tf.keras.models.load_model("/Users/pradulsmacbookair/Downloads/Mall Inventory App/fastapi/ml_models/saved_resnet50_model.keras")

# ✅ Function to Extract Features from Image
def extract_features(img):
    img = img.convert("RGB").resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return model.predict(img_array).flatten()

# ✅ Load & Index Product Images in FAISS
def index_product_images():
    product_data = list(products_collection.find({}))
    feature_vectors = []
    indexed_products = []

    for product in product_data:
        img_url = product.get("image", "")
        if img_url:
            try:
                response = requests.get(img_url)
                img = Image.open(io.BytesIO(response.content)).convert("RGB")
                features = extract_features(img)
                feature_vectors.append(features)
                indexed_products.append({
                    "id": str(product["_id"]),
                    "title": product["title"],
                    "brand": product["brand"],
                    "category": product["category"],
                    "price": product["price"],
                    "salePrice": product["salePrice"],
                    "image": product["image"]
                })
            except Exception as e:
                print(f"Skipping {img_url}: {e}")

    if not feature_vectors:
        raise ValueError("No valid product images found!")

    feature_vectors = np.array(feature_vectors)
    d = feature_vectors.shape[1]  
    index = faiss.IndexFlatL2(d)
    index.add(feature_vectors)

    return index, indexed_products

# ✅ Initialize FAISS index
faiss_index, indexed_products = index_product_images()

# ✅ Image Searchç API (Fixing `422` Error)
@app.post("/api/shop/image-search")
async def search_similar_products(file: UploadFile = File(...)):
    try:
        if not file:
            return JSONResponse(content={"error": "No image uploaded"}, status_code=400)

        img = Image.open(io.BytesIO(await file.read())).convert("RGB")
        query_vector = extract_features(img).reshape(1, -1)

        # 🔍 Search FAISS index for top 3 matches
        distances, indices = faiss_index.search(query_vector, k=3)
        results = [indexed_products[i] for i in indices[0] if i < len(indexed_products)]

        return JSONResponse(content={"results": results})

    except Exception as e:
        return JSONResponse(content={"error": f"Error processing the image: {str(e)}"}, status_code=500)

# ✅ Run FastAPI Server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050, reload=True)
