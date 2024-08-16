import AuthorAvatar from '~/components/avatar/AuthorAvatar';
import ArticleCard from '~/components/cards/article/ArticleCard';
import NanoCard from '~/components/cards/NanoCard';
import ProductCard from '~/components/cards/product/ProductCard';
import ArticleImage from '~/components/common/article/ArticleImage';
import ArticleMeta from '~/components/common/article/ArticleMeta';
import ProductTitle from '~/components/common/product/ProductTitle';
import Section from '~/components/common/section/Section';
import SectionContent from '~/components/common/section/SectionContent';
import SectionDescription from '~/components/common/section/SectionDescription';
import SectionHeader from '~/components/common/section/SectionHeader';
import SectionTitle from '~/components/common/section/SectionTitle';
import PageTitle from '~/components/pages/PageTitle';

export default function Article() {
  const article = {
    title: 'Lorem ipsum dolor sit amet',
    imageSrc: '/images/article/article-1.jpg',
  };
  const productOptions: any[] = []; // TODO
  const articleOptions = null;

  return (
    <>
      <Section className="mx-auto max-w-screen-md gap-x-20 px-6">
        <SectionContent className="flex gap-20">
          <div className="flex flex-col gap-16">
            <div className="flex w-full flex-col gap-8">
              <div className="flex items-center justify-between gap-4">
                {articleOptions && (
                  <>
                    <AuthorAvatar // TODO
                      author={/* articleOptions[0].author[0] */ {} as any}
                    />
                    <ArticleMeta
                      date={/* articleOptions[0].date */ new Date().toString()}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <PageTitle className="text-3xl font-bold tracking-tight">
                  <ProductTitle title={article.title} />
                </PageTitle>
              </div>
            </div>
            <ArticleImage className="aspect-[16/10]" src={article.imageSrc} />
            <div className="flex flex-col gap-8">
              <p className="text-color-tertiary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                itaque ratione autem enim quos obcaecati totam quia at
                voluptatibus nam minima officia consequatur quis iste, tempore
                ipsum deserunt unde amet. Molestiae explicabo autem in totam
                odio delectus rerum voluptas fugit id ex! Sunt obcaecati eos
                reprehenderit, neque amet suscipit inventore. Voluptates ab
                voluptatum consequuntur porro, blanditiis error itaque
                repudiandae quia. Quos, rem ad adipisci delectus magnam quia
                fugit dicta tempora! Earum ullam odio, eaque aliquid odit
                sapiente aspernatur labore voluptatum ex dolores ipsa ea, nobis
                atque alias blanditiis, consequatur accusantium! Quis labore
                quibusdam recusandae saepe ab qui excepturi. Pariatur modi
                blanditiis magnam omnis esse atque earum nam perferendis
                praesentium reiciendis repellendus ipsam laborum labore,
                possimus rem quas architecto neque iste! Rem, hic ex architecto
                quod corrupti veritatis libero, debitis ducimus alias voluptatum
                necessitatibus rerum laudantium adipisci optio reprehenderit
                aliquid ipsa ad sapiente ipsam ut eum unde inventore eos?
                Corrupti, placeat?
              </p>
              <p className="text-color-tertiary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                itaque ratione autem enim quos obcaecati totam quia at
                voluptatibus nam minima officia consequatur quis iste, tempore
                ipsum deserunt unde amet. Molestiae explicabo autem in totam
                odio delectus rerum voluptas fugit id ex! Sunt obcaecati eos
                reprehenderit, neque amet suscipit inventore. Voluptates ab
                voluptatum consequuntur porro, blanditiis error itaque
                repudiandae quia. Quos, rem ad adipisci delectus magnam quia
                fugit dicta tempora! Earum ullam odio, eaque aliquid odit
                sapiente aspernatur labore voluptatum ex dolores ipsa ea, nobis
                atque alias blanditiis, consequatur accusantium! Quis labore
                quibusdam recusandae saepe ab qui excepturi. Pariatur modi
                blanditiis magnam omnis esse atque earum nam perferendis
                praesentium reiciendis repellendus ipsam laborum labore,
                possimus rem quas architecto neque iste! Rem, hic ex architecto
                quod corrupti veritatis libero, debitis ducimus alias voluptatum
                necessitatibus rerum laudantium adipisci optio reprehenderit
                aliquid ipsa ad sapiente ipsam ut eum unde inventore eos?
                Corrupti, placeat?
              </p>
            </div>
          </div>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="Kapcsolódó termékek"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent layoutType="carousel">
          {productOptions.map((option, index) => (
            <ProductCard
              key={index}
              id={option.id}
              title={option.title}
              link={option.link}
              number={option.number}
              priceNormal={option.priceNormal}
              priceNet={option.priceNet}
              priceCrossed={option.priceCrossed}
              imageSrc={option.imageSrc}
              hoverImageSrc={option.hoverImageSrc}
              rating={option.rating}
              reviews={option.reviews}
              manufacturer={option.manufacturer}
            />
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-5xl"
            level="h2"
            title="További bejegyzések"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent layoutType="grid">
          {articleOptions &&
            (articleOptions as Array<any>).map((option, index) => (
              <ArticleCard
                key={index}
                id={option.id}
                title={option.title}
                description={option.description}
                link={option.link}
                imageSrc={option.imageSrc}
                author={option.author}
                category={option.category}
              />
            ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle
            className="text-4xl"
            level="h2"
            title="Kapcsolódó kategóriák"
          />
          <SectionDescription>Leírás</SectionDescription>
        </SectionHeader>
        <SectionContent className="flex flex-wrap gap-6" layoutType="grid">
          {[...Array(7)].map((_, index) => (
            <NanoCard key={index} title="Kategória" />
          ))}
        </SectionContent>
      </Section>
    </>
  );
}
