import fs from 'fs';
import { join } from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { StaticImageData } from 'next/image';
import { ReactElement } from 'react';
import { error } from 'console';

const SPACES_DIR_BASE = join(process.cwd(), 'src/content');
const FILE_EXTENSION = '.mdx';

// Source of truth for the dirs we're currently reading from - used to autogenerate /spaces pages
export const SPACES_DIRS: Record<string, string> = {
  cosima: join(SPACES_DIR_BASE, 'cosima'),
  plume: join(SPACES_DIR_BASE, 'plume'),
  itw: join(SPACES_DIR_BASE, 'itw')
}

const load = async(targetDir: string) => {
  const files = fs.readdirSync(targetDir);
  const posts = files
    .filter((filename) => filename.endsWith(FILE_EXTENSION))
    .map((filename) => {
      const slug = filename.replace(FILE_EXTENSION, '');
      return findPostBySlug(slug, targetDir);
    });
  return Promise.all(posts);
};

const findSlugs = (targetDir: string) => {
  const files = fs.readdirSync(targetDir)
    .filter((filename) => filename.endsWith(FILE_EXTENSION))
    .map((fileName) => fileName.replace(FILE_EXTENSION, ''))
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


export interface PostFrontmatter {
  publishDate: string
  title: string
  excerpt: string
  image: string | StaticImageData;
  description: string
  tags: string[]
}

export interface ParsedPost extends PostFrontmatter {
  slug: string,
  dir: string,
  content: ReactElement,
}

/** */
export const findPostBySlug = async (slug: string, dir: string): Promise<ParsedPost | null> => {
  if (!slug || !dir) return null;

  try {
    const readFile = fs.readFileSync(join(dir, `${slug}${FILE_EXTENSION}`), 'utf-8');

    const { frontmatter, content } = await compileMDX<PostFrontmatter>({
      source: readFile,
      options: {
        parseFrontmatter: true
      }
    });
    return {
      dir,
      slug,
      ...frontmatter,
      content,
    };
  } catch (e) {
    console.error(`Failed to parse page ${dir}/${slug}: ${e}`)
  }

  return null;
};
