import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const SPACES_DIR_BASE = join(process.cwd(), 'src/content');

// Source of truth for the dirs we're currently reading from - used to autogenerate /spaces pages
export const SPACES_DIRS: Record<string, string> = {
  cosima: join(SPACES_DIR_BASE, 'cosima'),
  plume: join(SPACES_DIR_BASE, 'plume'),
  itw: join(SPACES_DIR_BASE, 'itw')
}

const load = async(targetDir: string) => {
  const files = fs.readdirSync(targetDir);
  const posts = files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      return findPostBySlug(slug, targetDir);
    });
  return Promise.all(posts);
};

const findSlugs = (targetDir: string) => {
  const files = fs.readdirSync(targetDir)
    .filter((filename) => filename.endsWith('.md'))
    .map((fileName) => fileName.replace('.md', ''))
  return files
}

// key is dir, value is list of posts in that dir
let _posts: Record<string, ParsedPost[]> = {};

/** */
export const fetchPosts = async () => {
  if (Object.keys(_posts).length === 0) {

    for (const [id, targetDir] of Object.entries(SPACES_DIRS)) {
      const result: (ParsedPost | null)[] = await load(targetDir)
      const nonNullResult = result.filter(post => post !== null)
      _posts[targetDir] = nonNullResult
    }

  }
  (`Providing posts ${JSON.stringify(_posts)[4]}`)
  return _posts;
};

// key is space name, value is list of associated post slugs
let _postSlugs: Record<string, string[]> = {};

export const fetchSlugs = () => {
  if (Object.keys(_postSlugs).length === 0) {
    for (const [spaceName, targetDir] of Object.entries(SPACES_DIRS)) {
      _postSlugs[spaceName] = findSlugs(targetDir)
    }
  }
  return _postSlugs
}



// TODO need one for each, and/or ability to take in multiples
/** */
export const findLatestPosts = async ({ dir, count }: {dir: string, count?: number}) => {
  const _count = count || 4;
  const posts = await fetchPosts();
  if (!posts) return [];
  const byDir = posts[dir]

  if (!byDir) return [];

  return byDir.slice(_count * -1)
};



export interface ParsedPost {
  slug: string,
  dir: string,
  content: string,
  [key: string]: any
}

/** */
export const findPostBySlug = async (slug: string, dir: string): Promise<ParsedPost | null> => {
  if (!slug || !dir) return null;

  try {
    const readFile = fs.readFileSync(join(dir, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      dir,
      slug,
      ...frontmatter,
      content,
    };
  } catch (e) {}

  return null;
};
