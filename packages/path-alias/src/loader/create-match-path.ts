import {
  matchFromAbsolutePaths,
  type ReadJsonSync,
  type FileExistsSync,
} from 'tsconfig-paths';
import {
  type MappingEntry,
  getAbsoluteMappingEntries,
} from 'tsconfig-paths/lib/mapping-entry.js';

/**
 * Creates a function that can resolve paths according to tsconfig paths property.
 *
 * @param absoluteBaseUrl Absolute version of baseUrl as specified in tsconfig.
 * @param paths The paths as specified in tsconfig.
 * @param mainFields A list of package.json field names to try when resolving module files. Select a nested field using an array of field names.
 * @param addMatchAll Add a match-all "*" rule if none is present
 * @returns a function that can resolve paths.
 */
export function createMatchPath(
  absoluteBaseUrl: string,
  paths: { [key: string]: Array<string> },
  mainFields: (string | string[])[] = ['main'],
  addMatchAll: boolean = true
) {
  const absolutePaths: ReadonlyArray<MappingEntry> = getAbsoluteMappingEntries(
    absoluteBaseUrl,
    paths,
    addMatchAll
  ).map((s) => {
    return {
      ...s,
      // make sure that `paths` are without file extensions, remove `.js` from the end
      // e.g. @armit/logger -> ['../../src/index.js']
      // ==> { pattern:'@armit/logger', paths:['/Users/tianyingchun/Documents/flatjs-next/dev-kits/packages/logger/src/index']}
      paths: s.paths.map((p) => p.replace(/\.js$/gi, '')),
    };
  });

  return (
    requestedModule: string,
    readJson?: ReadJsonSync,
    fileExists?: FileExistsSync,
    extensions?: Array<string>
  ) =>
    matchFromAbsolutePaths(
      absolutePaths,
      requestedModule,
      readJson,
      fileExists,
      extensions,
      mainFields
    );
}
