from fastapi import FastAPI
import base64
from reportlab.pdfgen import canvas

app = FastAPI()

@app.get("/")
def home():
    return {"status": "ok"}

@app.post("/assinatura")
async def salvar_assinatura(signature: str):
    img = base64.b64decode(signature.split(",")[1])

    with open("assinatura.png", "wb") as f:
        f.write(img)

    return {"msg": "assinatura salva"}

def gerar_pdf():
    c = canvas.Canvas("contrato.pdf")

    c.drawString(100, 750, "Contrato de Teste")

    c.drawImage("assinatura.png", 100, 600, width=200, height=100)

    c.save()
    
@app.post("/assinatura")
async def salvar_assinatura(signature: str):
    img = base64.b64decode(signature.split(",")[1])

    with open("assinatura.png", "wb") as f:
        f.write(img)

    gerar_pdf()

    return {"msg": "PDF gerado"}    