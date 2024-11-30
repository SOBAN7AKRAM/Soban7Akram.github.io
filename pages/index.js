import { getPostData } from '../lib/posts';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticProps() {
  // Fetch and parse Markdown content
  const { data, content } = getPostData();

  // Convert Markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        ...data,
        contentHtml,
      },
    },
  };
}

export default function Home({ postData }) {
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
