# Avalanche Academy

Avalanche Academy is a comprehensive learning platform designed to educate developers, enthusiasts, and industry professionals about the Avalanche ecosystem. It offers a variety of courses and resources to help users understand and leverage Avalanche's blockchain technology stack.

## Content Types

- **[Courses](/content/course/)**: Long structured learning paths covering different aspects of the Avalanche ecosystem.
- **[Guides](/content/guide/)**: Single-page end-to-end instructions to solve a specific challenge

There may be an overlap of content in courses and guides. Content that is reused multiple times should be places in the [/content/common/](/content/common/) directory. It can be imported in the course or guide like this:

```js
import SetUp from "@/content/common/avalanche-starter-kit/set-up.mdx";

<SetUp />
```

## Getting Started

1. **Clone the Repository:** `git clone https://github.com/ava-labs/avalanche-academy.git`
2. **Install Dependencies:** `yarn install`
3. **Run Locally:** `yarn run dev`

## Contributing

We welcome contributions! Please confirm changes on your local machine before opening a pull request. Raise the PR to the `dev` branch. Once you raise the PR, a team member will review your changes and approve the PR.

For more information, visit [Avalanche Academy](https://academy.avax.network).
