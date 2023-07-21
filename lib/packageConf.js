const routeAntdConf = {
  dependencies: {
    "ahooks": "^3.7.7",
    "antd": "^5.5.2",
    "react-router-dom": "^6.11.2"
  }
}

const eslintConf = {
  "scripts": {
    "prepare": "npx simple-git-hooks"
  },
  devDependencies: {
    "@typescript-eslint/eslint-plugin": "^5.51.0",
    "@typescript-eslint/parser": "^5.51.0",
    "eslint": "^8.33.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^2.8.3",
    "vite-plugin-eslint": "^1.8.1",
  }
}
const preCommitConf = {
  "scripts": {
    "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./",
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged -q"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,tsx,ts}": [
      "eslint",
      "prettier"
    ]
  },
  devDependencies: {
    "lint-staged": "^13.1.0",
    "simple-git-hooks": "^2.8.1",
  }
}

module.exports = {
  routeAntdConf,
  eslintConf,
  preCommitConf
}
