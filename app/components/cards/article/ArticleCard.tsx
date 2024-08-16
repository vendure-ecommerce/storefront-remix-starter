

import AuthorAvatar from "~/components/avatar/AuthorAvatar";
import ArticleCategory from "~/components/common/article/ArticleCategory";
import ArticleDescription from "~/components/common/article/ArticleDescription";
import ArticleImage from "~/components/common/article/ArticleImage";
import ArticleTitle from "~/components/common/article/ArticleTitle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui-custom/MyCard";
import Link from "next/link";

interface articleCardProps {
  id: string;
  title: string;
  link: string;
  imageSrc: string;
  description: string;
  category: string;
  author: {
    title: string;
    imageSrc: string;
    link: string;
  }[];
}

const ArticleCard: React.FC<articleCardProps> = ({
  id,
  title,
  link,
  imageSrc,
  description,
  author,
  category,
}) => {
  return (
    <Card
      className='group/card flex h-full flex-col gap-4 hover:border-primary/30 transition shadow-none'
      id={id}
    >
      <CardHeader className='relative p-0'>
        <Link href={link}>
          <ArticleImage src={imageSrc} />
        </Link>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col gap-4 pb-0'>
        <AuthorAvatar author={author[0]} />
        <Link href={link}>
          <CardTitle className='text-base'>
            <ArticleTitle title={title} />
          </CardTitle>
        </Link>
        <ArticleDescription description={description} />
      </CardContent>
      <CardFooter className='pt-0'>
        <ArticleCategory>{category}</ArticleCategory>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
