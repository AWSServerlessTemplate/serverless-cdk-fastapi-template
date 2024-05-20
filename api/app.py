import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI(
    title="FAST API at API Gateway",
    root_path=os.environ.get("ROOT_PATH"),
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "hello-world"
    }

handler = Mangum(app, lifespan="off", api_gateway_base_path="/prod")
