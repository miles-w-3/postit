import Link from "next/link";
import { ParsedPost } from "~/utils/posts";
import postitBase from '~/assets/images/postit.jpg';
import Image from "next/image";


const PostLink = ({ post, spaceName }: { spaceName: string, post: ParsedPost }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg">
      <Link className="flex flex-col h-full" href={`/spaces/${spaceName}/${post.slug}`}>
        <Image width={650} height={340} alt={post.title} src={post.image ? `${post.image}` : postitBase} />
        <h2 className="p-4 mt-auto font-bold">{post.title}</h2>
        {post.excerpt ? <p className="px-4 pb-2 italic">{`“${post.excerpt}”`}</p> : <></>}
      </Link>
    </div>
  );
};

export default PostLink;
