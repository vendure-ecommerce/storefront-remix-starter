import { Link } from '@remix-run/react';
import { Dispatch, SetStateAction } from 'react';
import { ListGroupItemWithChildren } from '~/components/common/list/ListGroupItem';
import { Button } from '~/components/ui-custom/MyButton';

interface CategoryMenuListProps {
  collection: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const CategoryMenuList: React.FC<CategoryMenuListProps> = ({
  collection,
  setOpen,
}) => {
  // const categoryTreeOptions = dummy.categoryTreeOptions;

  return (
    <div className="flex flex-col gap-8">
      <hgroup>
        <h3 className="leading text-2xl font-bold">{collection.name}</h3>
      </hgroup>
      <div>
        <Button
          className="px-0 text-lg font-bold text-secondary-foreground"
          variant={'link'}
        >
          <Link
            to={`/collections/${collection.slug}`}
            prefetch="intent"
            onClick={() => setOpen && setOpen((prev) => !prev)}
          >
            Összes termék a kategóriából
          </Link>
        </Button>
      </div>
      <div className="grid grow grid-cols-2 gap-8 ">
        <menu className="grow">
          {collection?.children &&
            collection.children.map((c: any) => {
              return (
                <li className="flex flex-col justify-items-stretch gap-4">
                  <ListGroupItemWithChildren
                    id={c.id}
                    title={c.name}
                    isLinkActive={true}
                    link={`/collections/${c.slug}`}
                    onClick={() => setOpen && setOpen((prev) => !prev)}
                    imageClassName="h-10 w-10 rounded-full border"
                    showTitle={true}
                    showImage={true}
                    showTrailingIcon={true}
                    imageSrc={c.featuredAsset?.preview}
                    className="px-6"
                    indent={0}
                  />
                  {/* <Link
                    to={`/collections/${c.slug}`}
                    onClick={() => setOpen && setOpen((prev) => !prev)}
                  > */}
                  {/* </Link> */}
                </li>
              );
            })}
          {/* <li className="flex flex-col items-start gap-4">
            <a
              className="text-lg font-bold text-secondary-foreground hover:underline"
              href="#"
            >
              Alkategória 1
            </a>
            <menu>
              <li>
                <a
                  className="text-base font-normal text-secondary-foreground hover:underline"
                  href="#"
                >
                  Al-alkategória 1
                </a>
                <menu>
                  <li>
                    <a
                      className="text-base font-normal text-secondary-foreground before:content-['–_'] hover:underline"
                      href="#"
                    >
                      Al-al-alkategória 1
                    </a>
                  </li>
                </menu>
              </li>
            </menu>
          </li> */}
        </menu>
      </div>
    </div>
  );
};

export default CategoryMenuList;
