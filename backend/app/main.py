from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import basins, analytics

app = FastAPI(
    title="Real Rails Intelligence Library - Water Stress API",
    description="Backend for Water Stress Basin Explorer",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(basins.router, prefix="/api/basins", tags=["Basins"])
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])

@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "Water Stress Intelligence API"}
