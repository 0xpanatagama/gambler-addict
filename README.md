# The Gambler's Paradox

An interactive visualization of the "Just One More" paradox, demonstrating how seemingly favorable betting odds can lead to unexpected outcomes.

## Live Demo
Check out the live demo: [Gambler's Paradox Game](https://coin-game-7wclkq5op-panataagamas-projects.vercel.app/)

## About The Project

This project visualizes a counterintuitive mathematical principle in gambling and investment. Players start with $100 and flip a coin:
- Heads: Increase current amount by up to 100% (adjustable)
- Tails: Decrease current amount by up to 40% (adjustable)

Despite having positive expected returns, most players end up losing money due to the multiplicative nature of the betting system.

### Features

- **Interactive Controls**
  - Adjustable bet size (0-100% of current amount)
  - Toggle between linear and logarithmic scale
  - Real-time bet percentage updates

- **Analytics Panel**
  - Win rate tracking
  - Longest winning streak
  - Maximum/minimum amounts reached
  - Performance statistics

- **Visual Elements**
  - Real-time wealth chart
  - Color-coded results
  - Detailed flip history
  - Reference lines for context

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

## Contact

Your Name - [@youremail](youremail) - your.email@example.com

Project Link: [https://github.com/0xpanatagama/coin-game](https://github.com/0xpanatagama/coin-game)

## Acknowledgments

- Based on concepts from ergodicity economics
- Inspired by Ole Peters' work on time averaging
- Edward O. Thorp's research on optimal betting strategies
