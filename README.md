# The Gambler's Paradox

An interactive visualization of the "Just One More" paradox, demonstrating how seemingly favorable betting odds can lead to unexpected outcomes.

## Live Demo
Check out the live demo: [Gambler's Paradox Game]([https://gambler-addict.vercel.app/]))

## About The Project

This project visualizes a counterintuitive mathematical principle in gambling and investment. Players start with $100 and flip a coin:
- Heads: Increase current amount by up to 100% (adjustable)
- Tails: Decrease current amount by up to 40% (adjustable)

Despite having positive expected returns, most players end up losing money due to the multiplicative nature of the betting system.

### Features

- **Interactive Controls**
- **Analytics Panel**
- **Visual Elements**

## Built With

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data Visualization
- [Lucide React](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment

## Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/0xpanatagama/coin-game.git

# Navigate to project directory
cd coin-game

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Theory and Mathematics

This game demonstrates the concept of ergodicity in economics, where the ensemble average (average across many players) differs from the time average (what happens to individual players over time). The game is based on real mathematical principles that apply to various fields including investment, risk management, and decision theory.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues to discuss potential improvements.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

Based on concepts from [ergodicity economics](https://ergodicityeconomics.com/)
