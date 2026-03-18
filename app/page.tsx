'use client';

import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "¿Cuántas newsletters/posts sobre IA lees a la semana?",
    options: [
      { label: "0-2", score: 0 },
      { label: "3-7", score: 1 },
      { label: "8-15", score: 2 },
      { label: "+15", score: 3 },
    ],
  },
  {
    id: 2,
    text: "¿Con qué frecuencia sientes que tus skills se están quedando obsoletos?",
    options: [
      { label: "Nunca", score: 0 },
      { label: "A veces", score: 1 },
      { label: "Frecuentemente", score: 2 },
      { label: "Constantemente", score: 3 },
    ],
  },
  {
    id: 3,
    text: "¿Cuántas nuevas herramientas de IA has probado en el último mes?",
    options: [
      { label: "0-1", score: 0 },
      { label: "2-4", score: 1 },
      { label: "5-9", score: 2 },
      { label: "+10", score: 3 },
    ],
  },
  {
    id: 4,
    text: "¿Cuántas horas al día piensas en cómo la IA afectará tu trabajo?",
    options: [
      { label: "Casi nada", score: 0 },
      { label: "~1 hora", score: 1 },
      { label: "2-3 horas", score: 2 },
      { label: "+3 horas", score: 3 },
    ],
  },
  {
    id: 5,
    text: "¿Has cambiado tu stack/metodología por presión de IA en el último año?",
    options: [
      { label: "No", score: 0 },
      { label: "Una vez", score: 1 },
      { label: "Varias veces", score: 2 },
      { label: "Continuamente", score: 3 },
    ],
  },
  {
    id: 6,
    text: "¿Cómo afecta el ritmo de cambios de IA a tu sueño o descanso?",
    options: [
      { label: "No me afecta", score: 0 },
      { label: "Pienso en ello antes de dormir", score: 1 },
      { label: "Me quita horas de sueño", score: 2 },
      { label: "Sueño con ello literalmente", score: 3 },
    ],
  },
  {
    id: 7,
    text: "¿Con qué frecuencia comparas tu productividad con la de herramientas IA?",
    options: [
      { label: "Nunca", score: 0 },
      { label: "Ocasionalmente", score: 1 },
      { label: "Frecuentemente", score: 2 },
      { label: "Todo el tiempo", score: 3 },
    ],
  },
  {
    id: 8,
    text: "¿Cuántas personas de tu entorno también están estresadas por la IA?",
    options: [
      { label: "Ninguna", score: 0 },
      { label: "1-2", score: 1 },
      { label: "3-5", score: 2 },
      { label: "Todo mi círculo", score: 3 },
    ],
  },
];

type Stage = 'intro' | 'quiz' | 'loading' | 'result';

interface Result {
  score: number;
  level: string;
  color: string;
  emoji: string;
  headline: string;
  summary: string;
  tips: string[];
}

function getResult(totalScore: number): Result {
  const max = questions.length * 3;
  const pct = Math.round((totalScore / max) * 100);

  if (pct <= 25) {
    return {
      score: pct,
      level: "Zen Master",
      color: "text-emerald-400",
      emoji: "🧘",
      headline: "Eres inmune al caos de la IA",
      summary: "Tienes una relación sana con el cambio tecnológico. Mantienes perspectiva sin dejarte arrastrar por el FOMO.",
      tips: [
        "Mantén ese equilibrio — es raro y valioso",
        "Comparte tu mentalidad con tu equipo",
        "Sigue aprendiendo a tu ritmo, no al de Twitter",
      ],
    };
  } else if (pct <= 50) {
    return {
      score: pct,
      level: "En Tensión",
      color: "text-yellow-400",
      emoji: "⚠️",
      headline: "El ritmo te está costando energía",
      summary: "Estás gestionando bien, pero la presión acumulada empieza a notarse. Un pequeño empujón y podrías caer en burnout AI.",
      tips: [
        "Establece horas de 'AI detox' semanales",
        "Suscríbete solo a 1-2 fuentes de confianza",
        "Distingue entre aprender y acumular ansiedad",
      ],
    };
  } else if (pct <= 75) {
    return {
      score: pct,
      level: "Alto Riesgo",
      color: "text-orange-400",
      emoji: "🔥",
      headline: "Estás en la zona de peligro",
      summary: "El FOMO de IA está dominando tu agenda y tu energía. Si no cambias algo ahora, el burnout es casi inevitable.",
      tips: [
        "Para 1 semana de consumo de noticias AI",
        "Haz una lista de las 3 skills que realmente importan en tu trabajo",
        "Habla con alguien de confianza sobre esta presión",
      ],
    };
  } else {
    return {
      score: pct,
      level: "Burnout Activo",
      color: "text-red-500",
      emoji: "💀",
      headline: "La IA ya te está quemando",
      summary: "Estás en burnout AI activo. La sobreexposición a cambios constantes está afectando tu productividad y bienestar.",
      tips: [
        "Desconéctate de todas las fuentes AI por 2 semanas",
        "Busca apoyo profesional si el estrés afecta tu sueño",
        "Recuerda: no necesitas saber TODO para ser valioso",
      ],
    };
  }
}

const loadingMessages = [
  "Analizando tu exposición al caos de IA...",
  "Calculando tu nivel de FOMO tecnológico...",
  "Midiendo tu resistencia al burnout...",
  "Procesando tu perfil de estrés digital...",
  "Generando tu diagnóstico personalizado...",
];

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [shareCount] = useState(Math.floor(Math.random() * 3000) + 1200);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStage('loading');
      let msgIdx = 0;
      const interval = setInterval(() => {
        msgIdx++;
        if (msgIdx < loadingMessages.length) {
          setLoadingMsg(msgIdx);
        } else {
          clearInterval(interval);
          const total = newAnswers.reduce((a, b) => a + b, 0);
          setResult(getResult(total));
          setStage('result');
        }
      }, 2500);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  };

  const shareText = result
    ? `Mi AI Burnout Risk Score: ${result.score}% — Nivel: ${result.level} ${result.emoji}\n¿Cuál es el tuyo? 👇`
    : '';
  const shareUrl = 'https://ai-burnout-risk-score.vercel.app';
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {stage === 'intro' && (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-2">🤖💀</div>
            <h1 className="text-3xl font-black leading-tight">
              AI Burnout<br />Risk Score
            </h1>
            <p className="text-gray-400 text-base">
              El ritmo de la IA está destruyendo a los mejores profesionales.<br />
              <span className="text-white font-semibold">¿Eres uno de ellos?</span>
            </p>
            <div className="bg-gray-900 rounded-2xl p-4 text-sm text-gray-300">
              <span className="text-emerald-400 font-bold">{shareCount.toLocaleString()} personas</span> ya conocen su nivel de riesgo
            </div>
            <button
              onClick={() => setStage('quiz')}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-2xl transition-all"
            >
              Descubrir mi riesgo →
            </button>
            <p className="text-gray-600 text-xs">8 preguntas · 2 minutos · 100% anónimo</p>
          </div>
        )}

        {stage === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Pregunta {currentQ + 1} de {questions.length}</span>
              <span>{Math.round(((currentQ) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQ) / questions.length) * 100}%` }}
              />
            </div>
            <h2 className="text-xl font-bold leading-snug mt-4">
              {questions[currentQ].text}
            </h2>
            <div className="space-y-3">
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-red-500 text-white py-4 px-5 rounded-xl transition-all text-base font-medium"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'loading' && (
          <div className="text-center space-y-8">
            <div className="text-5xl">⚙️</div>
            <h2 className="text-xl font-bold text-gray-300">{loadingMessages[loadingMsg]}</h2>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${((loadingMsg + 1) / loadingMessages.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {stage === 'result' && result && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="text-5xl mb-3">{result.emoji}</div>
              <div className={`text-6xl font-black ${result.color}`}>{result.score}%</div>
              <div className={`text-xl font-bold mt-1 ${result.color}`}>{result.level}</div>
              <h2 className="text-2xl font-black mt-2 leading-tight">{result.headline}</h2>
            </div>

            <div className="bg-gray-900 rounded-2xl p-5 text-gray-300 text-sm leading-relaxed">
              {result.summary}
            </div>

            {!emailSubmitted ? (
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-semibold text-white">
                  🔒 Desbloquea tus 3 acciones para reducir tu riesgo
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Ver mis acciones →
                  </button>
                </form>
                <p className="text-gray-600 text-xs text-center">Sin spam. Solo insights.</p>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-bold text-emerald-400">✅ Tus acciones para reducir el riesgo:</p>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-red-500 font-bold mt-0.5">{i + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-center text-sm text-gray-500 font-semibold">¿Cuánto tienen tus amigos?</p>
              <div className="flex gap-3">
                <a href={twitterShare} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-black hover:bg-gray-900 border border-gray-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-all">
                  𝕏 Twitter
                </a>
                <a href={linkedinShare} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-all">
                  LinkedIn
                </a>
                <a href={whatsappShare} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-center text-sm transition-all">
                  WhatsApp
                </a>
              </div>
            </div>

            <button
              onClick={() => { setStage('intro'); setAnswers([]); setCurrentQ(0); setEmail(''); setEmailSubmitted(false); }}
              className="w-full text-center text-gray-600 hover:text-gray-400 text-sm py-2 transition-all"
            >
              Volver a empezar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
