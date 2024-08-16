import { Button } from "~/components/ui-custom/MyButton";

interface CategoryMenuListProps {
  children?: CategoryMenuListProps[];
}

const CategoryMenuList: React.FC<CategoryMenuListProps> = ({}) => {
  // const categoryTreeOptions = dummy.categoryTreeOptions;

  return (
    <div className='flex flex-col gap-8'>
      <hgroup>
        <h3 className='leading text-2xl font-bold'>Kategória 1</h3>
      </hgroup>
      <div>
        <Button
          className='px-0 text-lg font-bold text-secondary-foreground'
          variant={"link"}
        >
          <a href='#'>Összes termék a kategóriából</a>
        </Button>
      </div>
      <div className='grid grow grid-cols-3 gap-8'>
        <menu className='grow'>
          <li className='flex flex-col items-start gap-4'>
            <a
              className='text-lg font-bold text-secondary-foreground hover:underline'
              href='#'
            >
              Alkategória 1
            </a>
            <menu>
              <li>
                <a
                  className='text-base font-normal text-secondary-foreground hover:underline'
                  href='#'
                >
                  Al-alkategória 1
                </a>
                <menu>
                  <li>
                    <a
                      className="text-base font-normal text-secondary-foreground before:content-['–_'] hover:underline"
                      href='#'
                    >
                      Al-al-alkategória 1
                    </a>
                  </li>
                </menu>
              </li>
            </menu>
          </li>
        </menu>
      </div>
    </div>
  );
};

export default CategoryMenuList;
