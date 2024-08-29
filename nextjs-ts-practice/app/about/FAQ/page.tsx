import localFont from "next/font/local";

const roboto = localFont({
  src: [
    {
      path: "../../../public/fonts/Roboto-Black.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Roboto-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Roboto-light.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const roboto_bold = localFont({
  src: "../../../public/fonts/Roboto-Bold.ttf",
  display: "swap",
});

const faqs = [
  {
    question: "Why do cats always want to get into boxes?",
    answer:
      "Cats love small, cozy spaces where they feel safe. A box is the perfect hideout for them!",
  },
  {
    question: "Why is pizza always cut into triangles?",
    answer:
      "Pizza is round, but cutting it into triangles makes it easier to share and eat. Plus, a pizza slice is perfect for taking a big bite!",
  },
  {
    question: "Why do dogs wag their tails?",
    answer:
      "Dogs wag their tails when they're happy or excited. It's their way of saying, \"I like you!\"",
  },
  {
    question: "Why do rabbits have such long ears?",
    answer:
      "A rabbit's long ears help them hear better and also release heat to keep them cool.",
  },
  {
    question: "Why do we dream?",
    answer:
      "Dreams can help us process what happened during the day or let our imagination run wild. Sometimes, they can be really weird too!",
  },
];

export default function FAQpage() {
  // if (Math.random() > 0.5) throw new Error("Error in blog slug page!");
  return (
    <div>
      <h1 className={`text-xl ${roboto_bold.className}`}>FAQ</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li
            key={index}
            className={`my-3 px-2 py-1 font-light bg-slate-50 bg-opacity-40
            rounded-md ${roboto.className} font-light`}>
            <div>Q: {faq.question}</div>
            A: {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
