"use client";
import { useState } from "react";
import { Button } from "../Button/button";

export function TextArea() {
    const [texto, setTexto] = useState("");
    const [resultado, setResultado] = useState("");
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [tempo, setTempo] = useState("-");

    async function gerarPagina() {
    if (!texto.trim()) return;

    setLoading(true);
    const inicio = Date.now();

    try {
        const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
        });

        const data = await res.json();
        setResultado(data.html);
        setTotal((prev) => prev + 1);
        setTempo(((Date.now() - inicio) / 1000).toFixed(1) + "s");
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    }

    function usarSugestao(valor: string) {
    setTexto(valor);
    }

    function copiarCodigo() {
    navigator.clipboard.writeText(resultado);
    }

    function baixarCodigo() {
    const blob = new Blob([resultado], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minha-pagina.html";
    a.click();
    URL.revokeObjectURL(url);
    }

    function abrirFullscreen() {
    const nova = window.open();
    if (nova) {
    nova.document.write(resultado);
    nova.document.close();
    }
    }

    return (
    <div className="flex flex-col bg-[#141414] border-2 w-full max-w-4xl p-5 rounded-2xl">
        <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="bg-slate-800 border border-gray-500 rounded-[0.9em] text-white font-sans p-2.5 text-[1em] resize-y min-h-[10em] w-full transition-colors duration-200 focus:border-purple-500/50 placeholder:text-gray-400 focus:outline-none"
        placeholder="Descreva sua página..."
        />

        <div className="flex flex-wrap gap-3 items-center mt-4">
        <span className="text-[0.80em] text-slate-300/80">Sugestões:</span>
        <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Pizzaria artesanal")}>🍕 Pizzaria</Button>
        <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Salão de beleza")}>💆 Salão</Button>
        <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Academia de musculação")}>🏋️ Academia</Button>
        <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Pet shop e veterinário")}>🐾 Pet shop</Button>
        <Button className="text-[0.80em] p-2 rounded-2xl" onClick={() => usarSugestao("Cafeteria e confeitaria")}>☕ Café</Button>
        </div>

        <Button
        onClick={() => gerarPagina()}
        disabled={loading}
        className="mt-10 rounded-lg p-3 bg-purple-600"
        >
        <span>{loading ? "⏳ Gerando..." : "⚡ Gerar página"}</span>
        </Button>

        <div className="grid grid-cols-3 gap-3 mb-4 mt-5">
        <div className="w-full bg-slate-800 text-center p-1 border-2 border-amber-100 rounded-2xl">
            <span className="block text-purple-400/80 text-[1.5em] font-medium">{total}</span>
            <span className="block text-[1.1em] text-slate-500 mt-2">Total</span>
        </div>
        <div className="w-full bg-slate-800 text-center p-1 border-2 border-amber-100 rounded-2xl">
            <span className="block text-purple-400/80 text-[1.5em] font-medium">{tempo}</span>
            <span className="block text-[1.1em] text-slate-500 mt-2">Tempo</span>
        </div>
        <div className="w-full bg-slate-800 text-center p-1 border-2 border-amber-100 rounded-2xl">
            <span className="block text-purple-400/80 text-[1.5em] font-medium">100%</span>
            <span className="block text-[1.1em] text-slate-500 mt-2">Gratuito</span>
        </div>
        </div>

        {loading && (
        <div className="text-center p-4 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">A IA está criando sua página...</p>
        </div>
        )}

        {resultado && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6">
          {/* CÓDIGO */}
            <div className="flex flex-col bg-[#141414] border border-slate-500/45 mt-8 overflow-hidden rounded-xl">
            <div className="flex items-center justify-between p-2 border-b border-slate-500/45">
                <span className="text-[0.80em] font-medium text-slate-500">💻 Código HTML</span>
                <div className="flex gap-3">
                <button onClick={copiarCodigo} className="text-xs text-slate-400 cursor-pointer hover:text-white transition-colors">📋 Copiar</button>
                <button onClick={baixarCodigo} className="text-xs text-slate-400 cursor-pointer hover:text-white transition-colors">⬇️ Baixar</button>
                </div>
            </div>
            <pre className="font-mono p-2 text-[0.75em] text-slate-500 leading-relaxed overflow-y-auto max-h-96 whitespace-pre-wrap break-all flex-1">
                {resultado}
            </pre>
            </div>

          {/* PREVIEW */}
            <div className="flex flex-col bg-[#141414] border border-slate-500/45 mt-8 overflow-hidden rounded-xl">
            <div className="flex items-center justify-between p-2 border-b border-slate-500/45">
                <span className="text-[0.80em] font-medium text-slate-500">👁️ Preview</span>
                <div className="flex gap-3">
                <button onClick={abrirFullscreen} className="text-xs cursor-pointer text-slate-400 hover:text-white transition-colors">⛶ Fullscreen</button>
                <button onClick={() => gerarPagina()} className="text-xs cursor-pointer text-slate-400 hover:text-white transition-colors">🔄 Gerar novo</button>
                </div>
            </div>
            <iframe
                srcDoc={resultado}
                className="w-full min-h-96 border-none flex-1 bg-white"
            />
            </div>
        </div>
        )}
    </div>
    );
}