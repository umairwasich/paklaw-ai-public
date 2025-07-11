from fastapi import FastAPI
import json
import numpy as np
from sentence_transformers import SentenceTransformer, util

app = FastAPI()

model = SentenceTransformer('all-MiniLM-L6-v2')

@app.get("/")
def read_root():
    return {"message": "PakLaw AI API Running"}

@app.get("/laws")
def get_all_laws():
    with open("backend/laws_with_text.json", "r") as f:
        laws = json.load(f)
    return laws

@app.get("/laws/search")
def search_laws(query: str):
    with open("backend/laws_with_text.json", "r") as f:
        laws = json.load(f)

    results = []
    query_emb = model.encode(query)

    for law in laws:
        law_emb = model.encode(law["text"])
        score = util.cos_sim(query_emb, law_emb).item()
        if score > 0.4:
            results.append({**law, "score": round(score, 2)})
    
    return {"query": query, "results": results}
