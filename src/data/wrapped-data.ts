import { WrappedConfig } from "./types";

export const wrappedData: WrappedConfig = {
  meta: {
    recipientName: "Thayla",
    partnerName: "Jota",
    year: 2026,
    title: "Your 2026 with Jota",
    startDate: "2026-05-14",
  },

  emotions: [
    { name: "conforto", percentage: 94, color: "#FF7EB3", icon: "🎀" },
    { name: "saudade", percentage: 87, color: "#DDA0DD", icon: "🌙" },
    { name: "carinho", percentage: 91, color: "#FFB6C1", icon: "🩷" },
    { name: "risadas", percentage: 83, color: "#FF69B4", icon: "✨" },
    { name: "doçura", percentage: 96, color: "#FFC0CB", icon: "🍰" },
  ],

  quotes: [
    // a frase highlight aparece sozinha em tela cheia
    { text: "você chegou sem avisar. e agora faz falta até quando tá aqui.", highlight: true },
  ],

  letter: {
    text: "Tata, pra mim todo dia contigo acaba sendo especial. Você merece cada palavra, cada elogio, cada carinho. Eu queria ter jeito de mostrar isso direito. Infelizmente sou muiiitoo tímido pra isso. Eu amo passar o tempo contigo, isso não é nem 10% do que você realmente merece. Não me arrependo de nada. Se eu pudesse, fazia tudo de novo sem pensar. Obrigado por tudo que tem feito. Eu guardo cada coisa e levo comigo.",
  },

  whatYouAre: [
    "Você é a prova de que algumas coisas não acontecem por acaso. Acontecem por graça.",
    "Você é aquele silêncio depois da oração, quando tudo aquieta e só resta paz.",
    "Você é o tipo de coisa que só existe uma vez em toda a extensão do universo. E de algum jeito parou bem aqui, comigo.",
    "Você é a singularidade do meu universo, o ponto onde todas as leis param de fazer sentido e tudo colapsa em você.",
    "Você é o resultado de um algoritmo que o universo rodou por bilhões de anos.",
    "Você é a prece que virou pessoa, o ponto onde Deus parou de calcular e simplesmente criou.",
    "Você é o jardim que eu não merecia e que o universo me deu mesmo assim.",
  ],

  stats: [
    {
      label: "dias juntos",
      value: 0,
      suffix: "dias",
      prefix: "+",
      computed: "daysSince",
      computeFrom: "2026-05-14",
    },
    {
      label: "dias desde a primeira msg",
      value: 0,
      suffix: "dias",
      prefix: "+",
      computed: "daysSince",
      computeFrom: "2026-04-07",
    },
    {
      label: "horas em call",
      value: 1,
      suffix: "h",
      prefix: "",
    },
    {
      label: "vezes que ela foi fofa",
      value: "∞",
    },
  ],

  confessions: [
    "Eu releio nossas conversas quando você não tá online.",
    "Eu fiquei nervoso demais antes de te pedir em namoro.",
    "Às vezes eu fico sorrindo do nada lembrando de algo que você falou.",
    "Eu penso em você antes de dormir toda noite.",
    "Você foi a primeira pessoa que me fez querer ser melhor.",
  ],

  personalLists: [
    {
      title: "coisas que eu já percebi em vc",
      emoji: "🔍",
      items: [
        "Você comentou que amava doce, até aí tudo bem, mas eu não sabia que era tanto. Amor, diminui os doce pra saúde ficar melhor 😭",
        "Mesmo diante dos problemas, você continua sendo uma pessoa doce e incrível. Responde com carinho até quando tá chorando.",
        "Você se importa demais, aparenta ser frágil — por isso eu cuido muito com o que eu falo.",
      ],
    },
    {
      title: "oq eu quero viver com vc",
      emoji: "🌙",
      items: [
        "Eu não quero viver só um romance qualquer contigo. Eu quero construir, de fato, algo profundo.",
        "Quero te levar pra todos os lugares possíveis, quero cuidar de você e te proteger do mundo.",
        "Quero fazer você se sentir a pessoa mais importante pra alguém — não como se fosse qualquer coisa, mas sim como se fosse algo único. Algo que, se perder, jamais voltará.",
      ],
    },
    {
      title: "razões pra gostar de vc",
      emoji: "♡",
      items: [
        "Sua diversidade de assuntos que conseguem me prender, mesmo que seja o mais bobo — você pode achar ruim, mas eu amo isso em ti. É algo que poucas pessoas conseguem ter. Eu aprecio isso em você, de verdade.",
        "Beleza é algo relativo, mas ficar sem citar o quão linda você é seria um crime — pois você é a mulher mais linda que eu já vi.",
        "Sua delicadeza é algo que me atrai, seu jeito fofo de ver as coisas. Eu amo você por ser simplesmente você.",
      ],
    },
  ],

  song: {
    title: "Nobody New",
    artist: "The Marías",
    coverImage: "/images/song-cover.jpg",
    reason: "Essa música me lembra você, acho que já comentei disso contigo.",
    durationSeconds: 225,
    spotifyUrl: "https://open.spotify.com/track/1gTLJnIFaoCS0VIBeoLn4s",
  },

  finalMessage: {
    text: "Obrigado por existir na minha linha do tempo.",
    signature: "— Jota",
  },
};
