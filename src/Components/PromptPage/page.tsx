import { TextArea } from "../TextArea/textArea";



export default function PromptPage () {

    return (
            <main className="flex flex-col items-center justify-center mt-11 gap-5 p-5" >
            <p className="max-w-2xl text-[0.60em] lg:text-[0.78em] opacity-95 text-purple-400 transform font-bold text-center border-2 border-purple-600 bg-purple-400/15 rounded-4xl p-1" >⚡ PromptPage AI —  Gerador com inteligência artificial ⚡</p>
            <h1 className="text-md lg:text-4xl lg:mt-10">Crie sua Página <span className="text-purple-400">com um Prompt</span></h1>
            <p className="text-md lg:text-lg text-gray-600 text-center max-w-2xl">
                Descreva seu negócio e nossa IA criará uma página web incrível para você!
            </p>
                <TextArea/>
            </main>
    )
}