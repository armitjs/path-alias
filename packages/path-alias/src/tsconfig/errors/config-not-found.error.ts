export class ConfigNotFoundError extends Error {
  constructor() {
    super(
      'No valid "tsconfig.json" found, or `baseUrl`, `rootDir`, `outDir`, `paths` are missing!'
    );
  }
}
