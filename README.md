# Conway's Game of Life - GitHub Theme

## Purpose

This repository contains an implementation of Conway's Game of Life with a GitHub-themed color scheme. The project demonstrates the use of HTML5, CSS, and JavaScript to create an interactive, visually appealing simulation of the cellular automaton.

## Current Implementation

The current implementation includes:
- A responsive HTML5 canvas that adjusts to the window size.
- A grid of cells that follow the rules of Conway's Game of Life.
- Cells colored in shades of green based on the number of live neighbors, using specific hex values: `#9be9a8`, `#40c463`, `#30a14e`, `#216e39`.
- A 0.5-second interval between generations for smooth animation.

### File Structure

- `index.html`: The main HTML file that sets up the canvas and includes the CSS and JavaScript files.
- `style.css`: The CSS file that styles the body and canvas.
- `script.js`: The JavaScript file that contains the game logic and animation loop.
- `walkthrough-README.md`: The original README content for reference.

## How to Contribute

We welcome contributions to improve the project. Here are some ways you can contribute:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create a copy of the repository in your GitHub account.
2. **Clone your fork**: Use `git clone` to clone your forked repository to your local machine.
3. **Create a new branch**: Use `git checkout -b branch-name` to create a new branch for your changes.
4. **Make your changes**: Implement your changes and commit them with clear and concise commit messages.
5. **Push to your fork**: Use `git push origin branch-name` to push your changes to your forked repository.
6. **Create a pull request**: Open a pull request from your forked repository to the original repository, describing your changes and why they should be merged.

### Contribution Guidelines

- Follow the coding guidelines provided in the repository.
- Ensure your code is well-documented and adheres to the existing style.
- Test your changes thoroughly before submitting a pull request.
- Be respectful and considerate in your communication with other contributors.

Thank you for your interest in contributing to Conway's Game of Life - GitHub Theme!

## License

This project is licensed under the MIT License - see 
the [LICENSE](LICENSE) file for details.

## Contributing

Found a mistake or want to suggest an improvement? Contributions are welcome!
Submit a Pull Request.

## GitHub Actions Workflow

This project includes a GitHub Actions workflow to deploy the project to GitHub Pages.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

[github-copilot]: https://github.com/features/copilot
[github-signup]: https://github.com/join
[repo-fork]: https://github.com/github-samples/game-of-life-walkthrough/fork
[visual-studio-code]: https://code.visualstudio.com
[visual-studio-code-codespaces]: https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces
[youtube-video]: https://youtu.be/pGV_T6g1hcU
