"use client";
import { useState } from "react";
import { Button } from "../Button/button";



export function TextArea () {
    const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  async function gerarPagina() {
    if (!texto.trim()) return;

    setLoading(true);

    try {
    const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ texto }),
    });

    const data = await res.json();

    setResultado(data.html);
    } catch (error) {
    console.log(error);
    }
    finally {
    setLoading(false);
    }
}

function usarSugestao(valor: string) {
    setTexto(valor);
}

    return (
        <div className="flex flex-col bg-[#141414] border-2 w-full max-w-4xl p-5 rounded-2xl">
        <textarea  value={texto} onChange={(e) => setTexto(e.target.value)} className="bg-slate-800 border border-gray-500 rounded-[0.9em] text-white font-sans p-2.5 text-[1em] resize-y min-h-[10em] w-full transition-colors duration-200 focus:border-purple-500/50 placeholder:text-gray-400 focus:outline-none" placeholder="Descreva sua página..." />

        <div className="flex flex-wrap gap-3 items-center mt-4  ">
            <span className="text-[0.80em] text-slate-300/80 right-4">Sugestões:</span>
            <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Pizzaria artesanal")}>🍕 Pizzaria</Button>
            <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Salão de beleza")}>💆 Salão</Button>
            <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Academia de musculação")}>🏋️ Academia</Button>
            <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Pet shop e veterinário")}>🐾 Pet shop</Button>
            <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Cafeteria e confeitaria")}>☕ Café</Button>
        </div>
        <Button onClick={() => gerarPagina()} disabled={loading} className="mt-10 rounded-lg p-3 bg-purple-600">
        <span>{loading ? "⏳ Gerando..." : "⚡ Gerar página" }</span>
        </Button>
        
        <div className="grid grid-cols-2 gap-7 mb-6">
            
            <div className="flex flex-col bg-[#141414] border border-slate-500/45 mt-8 overflow-hidden ">
            <div className="flex items-center justify-between p-2 border-b-2">
                <span className="text-[0.80em] font-medium text-slate-500">💻 Código HTML</span>
                <div className="flex gap-3">
                    <button>📋 Copiar</button>
                    <button>⬇️ Baixar</button>
                </div>
                </div>
                <pre className=" font-serif p-2 text-[0.80em] text-slate-500 leading-relaxed overflow-y-auto max-h-10 whitespace-pre-wrap break-all flex-1"></pre>
            </div>

        <div className="flex flex-col bg-[#141414] border border-slate-500/45 mt-8 overflow-hidden ">
            <div className="flex items-center justify-between p-2 border-b-2">
                <span className="text-[0.80em] font-medium text-slate-500">👁️ Preview</span>
                <div className="flex gap-3">
                    <button>⛶ Fullscreen</button>
                    <button>🔄 Gerar novo</button>
                </div>
            </div> 

            </div>

            <iframe className="w-full min-h-38 border-none flex-1 bg-amber-50"></iframe>
            
            
                </div>
                <div className="text-center p-4">
                <div className="w-4 h-4 border border-purple-500 border-t-purple-400 rounded-2xl"></div>
                    <p>A IA está criando sua página...</p>
                
            </div>
        </div>


    )
}